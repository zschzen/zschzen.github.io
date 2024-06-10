import { Interactive, BaseElement } from "https://vectorjs.org/index.js";

class NumberWrapper extends BaseElement {
    constructor(value) {
        super();
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.updateDependents();
    }
}
class UnitCircle {
    constructor(id, angle, func = Math.cos) {
    }
    set angle(value) {
    }
    get angle() {
        return this._angle;
    }
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function GenerateArcPath(x, y, radius, startAngle, endAngle) {
    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);
    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    let d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "L", x, y,
        "Z"
    ].join(" ");

    return d;
}

function GetArcData(override_radius) {
    let opts = {
        cx: 0,
        cy: 0,
        radius: (override_radius) ? override_radius : radius,
        start_angle: (point.x >= 0) ? 0 : 360 - (getAngle() * 180 / Math.PI) + 90,
        end_angle: (point.x >= 0) ? 90 - (getAngle() * 180 / Math.PI) : 360
    };

    return opts;
}

function getAngle() {
    if (point.y <= 0) {
        return Math.abs(Math.atan2(point.y, point.x));
    }
    else {
        return Math.PI * 2 - Math.atan2(point.y, point.x);
    }
}

let radius = 125;
let angle = new NumberWrapper(0);
let requestID = 0;
let animating = false;

// Initialize the interactive
let margin = 4;
let interactive = new Interactive("interactive");
interactive.border = false;
interactive.originX = interactive.width / 2 + margin;
interactive.originY = interactive.height / 2 + margin;
interactive.width += 2 * margin;
interactive.height += 2 * margin;
interactive.style.overflow = "hidden";

// Create the unit circle
let circle = interactive.circle(0, 0, radius);
circle.style.fill = "none";
circle.style.stroke = "#121212";
circle.style.strokeWidth = 1;

// Add the circle to the interactive
interactive.appendChild(circle);

// Add a control point to the movable line
let point = interactive.control(0, 0);
point.constrainTo(circle);
point.addDependency(angle);
point.update = function () {
    this.x = circle.r * Math.cos(angle.value);
    this.y = -circle.r * Math.sin(angle.value);
};
point.handle.root.addEventListener('mousedown', function (e) {
    animating = false;
    window.cancelAnimationFrame(requestID);
});
point.onchange = function () {
    angle.value = getAngle();
};
point.update();

// Draw a Circular Sector using svg path
let angleSector = interactive.path('');
angleSector.root.style.fill = "#e5c07b";
angleSector.root.style.fillOpacity = "0.5";
angleSector.root.style.stroke = "#e5c07b";
angleSector.root.style.strokeOpacity = "0.75";
angleSector.root.style.strokeWidth = "1px";
angleSector.addDependency(angle);
angleSector.update = function () {
    let opts = GetArcData(20);
    angleSector.d = GenerateArcPath(opts.cx, opts.cy, opts.radius, opts.start_angle, opts.end_angle);
}
angleSector.update();

// Create the line with 90-degree angle
let line = interactive.line(0, 0, 0, -radius);
line.style.stroke = "#30475E";
line.style.strokeWidth = 1;
line.addDependency(circle);

// Create a movable line
let lineMovable = interactive.line(0, 0, Math.cos(angle.value) * radius, Math.sin(angle.value) * radius);
lineMovable.style.stroke = "#30475E";
lineMovable.style.strokeWidth = 1;
lineMovable.addDependency(point);
lineMovable.update = function () {
    lineMovable.x2 = point.x;
    lineMovable.y2 = point.y;
}

// Dot result line
let dotResult = interactive.line(0, 0, 0, 0);
dotResult.style.stroke = "#e06c75";
dotResult.style.strokeWidth = 2;
dotResult.addDependency(lineMovable);
dotResult.update = function () {
    let x = lineMovable.x2;
    let y = lineMovable.y2;
    let dot = x * 0 + y * -1;
    dotResult.y2 = dot * -1;
}

// transparent line from lineMovable to dotResult line
let lineMovableToDotResult = interactive.line(0, 0, 0, 0);
lineMovableToDotResult.style.stroke = "#30475E";
lineMovableToDotResult.style.strokeDasharray = "5";
lineMovableToDotResult.style.strokeOpacity = "0.5";
lineMovableToDotResult.style.strokeWidth = 1;
lineMovableToDotResult.addDependency(lineMovable);
lineMovableToDotResult.update = function () {
    lineMovableToDotResult.x1 = lineMovable.x2;
    lineMovableToDotResult.y1 = lineMovable.y2;
    lineMovableToDotResult.x2 = dotResult.x2;
    lineMovableToDotResult.y2 = dotResult.y2;
}

// Create a marker
let marker = interactive.marker(10, 5, 10, 10);
marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#30475E';
marker.setAttribute('orient', 'auto-start-reverse');
line.setAttribute('marker-end', `url(#${marker.id})`);
lineMovable.setAttribute('marker-end', `url(#${marker.id})`);

// Add a small filled circle at the origin
let origin = interactive.circle(0, 0, 3);
origin.style.fill = "#121212";

// Add multiple dot result texts across the circle circumference to show the dot result on quadrants
let dotResultText = [];
for (let i = 0; i < 16; i++) {
    let angle = Math.PI / 8 * i;
    let x = Math.cos(angle) * (radius + 20);
    let y = Math.sin(angle) * (radius + 20);
    let dot = -Math.sin(angle);

    dotResultText[i] = interactive.text(x, y, (Math.abs(dot) < 0.01) ? "0" : Number.parseFloat(dot).toFixed(2));
    dotResultText[i].style.fontSize = "12px";
    dotResultText[i].style.fontWeight = "bold";
    dotResultText[i].style.fill = "#e06c75";
    dotResultText[i].style.textAnchor = "middle";
    dotResultText[i].style.alignmentBaseline = "middle";

    // add small circle from the circle circumference to the dot result text
    let dotResultTextCircle = interactive.circle(Math.cos(angle) * radius, Math.sin(angle) * radius, 3);
    dotResultTextCircle.style.fill = "#e06c75";
    dotResultTextCircle.style.stroke = "white";
    dotResultTextCircle.style.strokeWidth = "1px";
}

// Add a small red circle to end of the dot result line
let dotResultEnd = interactive.circle(0, 0, 3);
dotResultEnd.style.fill = "#e06c75";
dotResultEnd.addDependency(dotResult);
dotResultEnd.update = function () {
    dotResultEnd.cx = dotResult.x2;
    dotResultEnd.cy = dotResult.y2;
}

// Create a text element to display the dot result
let dotResultTextElement = interactive.text(0, 0, "0");
dotResultTextElement.style.fontSize = "24px";
dotResultTextElement.style.fontWeight = "bold";
dotResultTextElement.style.fill = "#e06c75";
dotResultTextElement.style.stroke = "white";
dotResultTextElement.style.textAnchor = "middle";
dotResultTextElement.style.alignmentBaseline = "middle";
dotResultTextElement.addDependency(dotResult);
dotResultTextElement.update = function () {
    dotResultTextElement.x = dotResult.x2 + 40;
    dotResultTextElement.y = dotResult.y2 / 2;
    dotResultTextElement.contents = Number.parseFloat(-(dotResult.y2 / radius)).toFixed(2);
}

// Add the line to the interactive
//interactive.appendChild(line);
interactive.appendChild(lineMovable);
interactive.appendChild(dotResult);
interactive.appendChild(origin);
interactive.appendChild(dotResultTextElement);

interactive.root.style.border = "1px solid grey";
let animate = interactive.button(interactive.originX - 100, interactive.originY - 25, "Animate");
animate.onclick = function () {
    let step = function (timestamp) {
        angle.value -= .01;
        angle.value %= 2 * Math.PI;
        requestID = window.requestAnimationFrame(step);
    };
    if (animating) {
        window.cancelAnimationFrame(requestID);
        animating = false;
    }
    else {
        animating = true;
        requestID = window.requestAnimationFrame(step);
    }
};

// Adjust the view to fit the frame
interactive.setViewBox(-interactive.width / 2, -interactive.height / 2, interactive.width, interactive.height);
dotResult.update();
dotResultTextElement.update();
