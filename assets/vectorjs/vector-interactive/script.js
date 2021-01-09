import { Interactive } from "https://vectorjs.org/index.js";

// Initialize the interactive
let margin = 32;
let interactive = new Interactive("interactive");
interactive.border = false;
interactive.originX = interactive.width / 2 + margin;
interactive.originY = interactive.height / 2 + margin;
interactive.width += 2 * margin;
interactive.height += 2 * margin;
interactive.style.overflow = 'hidden';

// Create three control points
let point = interactive.control(0, 0);
//let pointB = interactive.control(0, 0);

let xAxis = interactive.line(-interactive.width / 2 + margin, 0, interactive.width / 2 - margin, 0);
let yAxis = interactive.line(0, -interactive.height / 2 + margin, 0, interactive.height / 2 - margin);

xAxis.style.stroke = 'red';
yAxis.style.stroke = 'green';

let rectangle = interactive.rectangle(xAxis.x1, yAxis.y1, xAxis.x2 - xAxis.x1, yAxis.y2 - yAxis.y1);
rectangle.classList.add('default');
point.constrainWithinBox(xAxis.x1, yAxis.y1, xAxis.x2, yAxis.y2);
//pointB.constrainWithinBox(xAxis.x1, yAxis.y1, xAxis.x2, yAxis.y2);

let line = interactive.line(0, 0, 0, 0);
let lineDIR = interactive.line(0, 0, 0, 0);

let boxConstraint = point.constrain;
point.constrain = (o, n) => {
    // first snap to grid
    let x = 50 * Math.round(n.x / 50);
    let y = 50 * Math.round(n.y / 50);
    // then constrain within box
    let p = boxConstraint({ x: x, y: y }, { x: x, y: y });

    // update line
    line.x2 = x;
    line.y2 = y;

    lineDIR.x1 = x;
    lineDIR.y1 = y;
    lineDIR.x2 = x + 50;
    lineDIR.y2 = y;

    updateSqrRoot(x, y);

    return { x: p.x, y: p.y };
};

// pointB.constrain = (o, n) => {
//     // first snap to grid
//     let x = 50 * Math.round(n.x / 50);
//     let y = 50 * Math.round(n.y / 50);
//     // then constrain within box
//     let p = boxConstraint({ x: x, y: y }, { x: x, y: y });

//     // update line
//     lineB.x2 = x;
//     lineB.y2 = y;

//     return { x: p.x, y: p.y };
// };

let text = interactive.text(150, 150, "myText");
text.addDependency(point);
text.style.fill = 'black';
text.update = function () {
    this.x = point.x - 15;
    this.y = point.y - 15;
    this.contents = `(${point.x / 50}, ${-point.y / 50})`;
};
text.update();

let marker = interactive.marker(10, 5, 10, 10);
marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#404040';
marker.setAttribute('orient', 'auto-start-reverse');

line.setAttribute('marker-end', `url(#${marker.id})`);
lineDIR.setAttribute('marker-end', `url(#${marker.id})`);

xAxis.setAttribute('marker-end', `url(#${marker.id})`);
xAxis.setAttribute('marker-start', `url(#${marker.id})`);

yAxis.setAttribute('marker-end', `url(#${marker.id})`);
yAxis.setAttribute('marker-start', `url(#${marker.id})`);

let xAxisLabel = interactive.text(xAxis.x2 + 16, xAxis.y2, 'X');
xAxisLabel.setAttribute('alignment-baseline', 'middle');
xAxisLabel.style.stroke = 'red';

let yAxisLabel = interactive.text(yAxis.x1, yAxis.y1 - 16, 'Y');
yAxisLabel.setAttribute('text-anchor', 'middle');
yAxisLabel.style.stroke = 'green';

let maginitudeLabel = interactive.text(point.y / 2, xAxis.y2, '');
maginitudeLabel.setAttribute('alignment-baseline', 'middle');

//line.style.stroke = 'red';
maginitudeLabel.style.fill = 'blue';

let updateSqrRoot = function (x, y) {
    let xSqr = x / 50;
    xSqr *= xSqr;

    let ySqr = y / 50;
    ySqr *= ySqr;

    maginitudeLabel.x = (x / 2) - 15;
    maginitudeLabel.contents = "~" + Math.sqrt(xSqr + ySqr).toFixed(2);
}

let angleRectangle = interactive.rectangle(0, 0, 10, 10);
angleRectangle.classList.add('default');

let xPosition = interactive.line(0, 0, 0, 0);
xPosition.style.stroke = 'red';
xPosition.style.strokeDasharray = "7,7";
xPosition.addDependency(point);
xPosition.update = function () {
    this.x1 = point.x;
    this.x2 = point.x;
    this.y2 = point.y;

    angleRectangle.x = point.x - (point.x < 0 ? 0 : angleRectangle.width);
    
    angleRectangle.root.setAttribute('visibility', point.x == 0 || point.y == 0 ? `hidden` : `visible`);

    if (point.x == 0 && point.y == 0) {
        line.root.setAttribute('visibility', 'hidden');
        maginitudeLabel.root.setAttribute('visibility', 'hidden');
    } else {
        line.root.setAttribute('visibility', 'visible');
        maginitudeLabel.root.setAttribute('visibility', 'visible');
    }
};
let yPosition = interactive.line(0, 0, 0, 0);
yPosition.style.stroke = 'green';
yPosition.style.strokeDasharray = "7,7";
yPosition.addDependency(point);
yPosition.update = function () {
    this.y1 = point.y;
    this.x2 = point.x;
    this.y2 = point.y;

    maginitudeLabel.y = (point.y / 2) - 15;
    angleRectangle.y = angleRectangle.height * (point.y > 0 ? 0 : -1);
};

let w = 50;
let h = 50;
for (let i = -6; i <= 6; i++) {
    for (let j = -3; j <= 3; j++) {
        let x = i * w;
        let y = j * h;
        let circle = interactive.circle(x, y, 5);
        circle.style.opacity = '.02';
        circle.style.fill = 'blue';
    }
}
for (let i = -6; i <= 6; i++) {
    let x = i * w;
    let label = interactive.text(x, 150 + (margin / 2), i.toString());
    label.style.textAnchor = 'middle';
    label.style.alignmentBaseline = 'middle';

    let vertical = interactive.line(x, -150, x, 150);
    vertical.style.stroke = 'red';
    vertical.style.strokeOpacity = '.2';
}
for (let i = -3; i <= 3; i++) {
    let y = i * h;
    let label = interactive.text(-300 - 15, y, (-i).toString());
    label.style.textAnchor = 'middle';
    label.style.alignmentBaseline = 'middle';

    let horizontal = interactive.line(-300, y, 300, y);
    horizontal.style.stroke = 'green';
    horizontal.style.strokeOpacity = '.2';
}

point.translate(150, -100);

interactive.circle(0, 0, 3).style.fill = '#404040';

//# sourceMappingURL=cartesian-coordinate-system.js.map