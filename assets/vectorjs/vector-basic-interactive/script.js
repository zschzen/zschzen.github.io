import { Interactive } from "https://vectorjs.org/index.js";

// Initialize the interactive
let margin = 32;
let interactive = new Interactive("interactive");
interactive.border = false;

let PorM = 1;

let radio = interactive.radioControl(-250, -100, ["a+b", "a-b"]);
radio.onchange = () => {
    PorM = radio.index == 0 ? 1 : -1;

    console.log(lineDLabel);

    lineDLabel.contents = PorM == 1 ? `+b` : `-b`;

    updateResultingLinePos();
}

interactive.originX = interactive.width / 2 + margin;
interactive.originY = interactive.height / 2 + margin;
interactive.width += 2 * margin;
interactive.height += 2 * margin;
interactive.style.overflow = 'hidden';

// Create three control points
let point = interactive.control(0, 0);
let pointB = interactive.control(0, 0);

let xAxis = interactive.line(-interactive.width / 2 + margin, 0, interactive.width / 2 - margin, 0);
let yAxis = interactive.line(0, -interactive.height / 2 + margin, 0, interactive.height / 2 - margin);

xAxis.style.stroke = 'red';
yAxis.style.stroke = 'green';

let rectangle = interactive.rectangle(xAxis.x1, yAxis.y1, xAxis.x2 - xAxis.x1, yAxis.y2 - yAxis.y1);
rectangle.classList.add('default');
point.constrainWithinBox(xAxis.x1, yAxis.y1, xAxis.x2, yAxis.y2);
pointB.constrainWithinBox(xAxis.x1, yAxis.y1, xAxis.x2, yAxis.y2);

let line = interactive.line(0, 0, 0, 0);
let lineB = interactive.line(0, 0, 0, 0);
let lineC = interactive.line(0, 0, 0, 0);
let lineD = interactive.line(0, 0, 0, 0);

let lineLabel = interactive.text(0, 0, 'a');
let lineBLabel = interactive.text(0, 0, 'b');
let lineCLabel = interactive.text(0, 0, 'c');
let lineDLabel = interactive.text(0, 0, '+b'); // its a lineBLabel clone

lineB.style.stroke = `#434982`;
lineC.style.stroke = `#730068`;
lineD.style.stroke = lineB.style.stroke;
lineD.style.strokeOpacity = '.6';

lineCLabel.style.stroke = lineC.style.stroke;
lineDLabel.style.stroke = lineB.style.stroke;
lineDLabel.style.strokeWidth = .25;
lineCLabel.style.strokeWidth = .25;

const updateResultingLinePos = () => {
    lineC.x2 = line.x2 + (lineB.x2 * PorM);
    lineC.y2 = line.y2 + (lineB.y2 * PorM);

    lineD.x1 = line.x2;
    lineD.y1 = line.y2;
    lineD.x2 = lineC.x2;
    lineD.y2 = lineC.y2;

    lineCLabel.x = (lineC.x2 / 2) - 5;
    lineCLabel.y = (lineC.y2 / 2) - 5;

    lineDLabel.x = ((lineC.x2 + line.x2 * PorM * PorM) / 2) + 5;
    lineDLabel.y = ((lineC.y2 + line.y2 * PorM * PorM) / 2) + 5;
}

let boxConstraint = point.constrain;
const updatePointXY = (n) => {
    let x = 50 * Math.round(n.x / 50);
    let y = 50 * Math.round(n.y / 50);

    return [x, y]
}
point.constrain = (o, n) => {
    // first snap to grid
    let [x, y] = updatePointXY(n);

    // then constrain within box
    let p = boxConstraint({ x: x, y: y }, { x: x, y: y });

    // update line
    line.x2 = x;
    line.y2 = y;

    lineLabel.x = (x / 2) - 5;
    lineLabel.y = (y / 2) - 5;

    updateResultingLinePos();

    return { x: p.x, y: p.y };
};

pointB.constrain = (o, n) => {
    let [x, y] = updatePointXY(n);

    let p = boxConstraint({ x: x, y: y }, { x: x, y: y });

    lineB.x2 = x;
    lineB.y2 = y;

    lineBLabel.x = (x / 2) - 5;
    lineBLabel.y = (y / 2) - 5;

    updateResultingLinePos();

    return { x: p.x, y: p.y };
};

let marker = interactive.marker(10, 5, 10, 10);
marker.path('M 0 0 L 10 5 L 0 10 z').style.fill = '#404040';
marker.setAttribute('orient', 'auto-start-reverse');

line.setAttribute('marker-end', `url(#${marker.id})`);
lineB.setAttribute('marker-end', `url(#${marker.id})`);
lineC.setAttribute('marker-end', `url(#${marker.id})`);

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

let w = 50;
let h = 50;

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

point.translate(100, -50);
pointB.translate(-50, -50);

interactive.circle(0, 0, 3).style.fill = '#404040';

//# sourceMappingURL=cartesian-coordinate-system.js.map