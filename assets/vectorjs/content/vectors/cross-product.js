/**
* @title Area Between Two Vectors
* @description This interactive demonstrates the area formed between two vectors.
* @tags [math]
*/

import { Interactive } from 'https://vectorjs.org/index.js';

// Initialize the interactive
let interactive = new Interactive('interactive');
interactive.border = true;
interactive.originX = interactive.width / 2;
interactive.originY = interactive.height / 2;

// Create a control
let c0 = interactive.control(-180, 50);
let c1 = interactive.control(-20, -60);
let c2 = interactive.control(50, 80);

// Constrain each of the control points to stay within the interactive boundaries
c0.constrainWithinBox(-interactive.width / 2, -interactive.height / 2, interactive.width, interactive.height);
c1.constrainWithinBox(-interactive.width / 2, -interactive.height / 2, interactive.width, interactive.height);
c2.constrainWithinBox(-interactive.width / 2, -interactive.height / 2, interactive.width, interactive.height);

// Line from c0 to c1
let line1 = interactive.line(0, 0, 0, 0);
line1.addDependency(c0, c1);
line1.update = function () {
    this.x1 = c0.x;
    this.y1 = c0.y;
    this.x2 = c1.x;
    this.y2 = c1.y;
};
line1.update();

// Line from c0 to c2
let line2 = interactive.line(0, 0, 0, 0);
line2.addDependency(c0, c2);
line2.update = function () {
    this.x1 = c0.x;
    this.y1 = c0.y;
    this.x2 = c2.x;
    this.y2 = c2.y;
};
line2.update();

// Line from c1 to c2
let line3 = interactive.line(0, 0, 0, 0);
line3.style.stroke = '#333333';
line3.style.strokeOpacity = '.7';
line3.addDependency(c1, c2);
line3.update = function () {
    this.x1 = c1.x;
    this.y1 = c1.y;
    this.x2 = c2.x;
    this.y2 = c2.y;
};
line3.update();

// Create a path
let path = interactive.path('');
path.addDependency(c0, c1, c2);
path.root.style.fill = 'rgb(236,236,236)';
path.update = function () {
    path.d = `M ${c0.x} ${c0.y}
            L ${c1.x} ${c1.y}
            L ${c2.x} ${c2.y}
            Z`;
};
path.update();
let outline = interactive.path('');
outline.addDependency(c0, c1, c2);
outline.update = function () {
    outline.d = `M ${c1.x} ${c1.y}
                L ${c2.x - c0.x + c1.x} ${c2.y - c0.y + c1.y}
                L ${c2.x} ${c2.y}`;
};
outline.update();
outline.style.strokeDasharray = '6 6';
outline.style.stroke = '#333333';
outline.style.fill = 'none';
let arrow1 = interactive.path('');
arrow1.addDependency(c0);
arrow1.addDependency(c1);
arrow1.update = function () {
    let r = 8;
    let angle = Math.atan2(c1.y - c0.y, c1.x - c0.x);
    this.d = `M ${c1.x + 1.3 * r * Math.cos(angle)} ${c1.y + 1.3 * r * Math.sin(angle)}
  L ${c1.x + r * Math.cos(angle - 2 * Math.PI / 3)} ${c1.y + r * Math.sin(angle - 2 * Math.PI / 3)}
  L ${c1.x + r * Math.cos(angle + 2 * Math.PI / 3)} ${c1.y + r * Math.sin(angle + 2 * Math.PI / 3)}
            Z`;
};
arrow1.root.style.fill = '#0366EE';
arrow1.root.style.stroke = 'none';
arrow1.update();
let arrow2 = interactive.path('');
arrow2.addDependency(c0);
arrow2.addDependency(c2);
arrow2.update = function () {
    let r = 8;
    let angle = Math.atan2(c2.y - c0.y, c2.x - c0.x);
    this.d = `M ${c2.x + 1.3 * r * Math.cos(angle)} ${c2.y + 1.3 * r * Math.sin(angle)}
  L ${c2.x + r * Math.cos(angle - 2 * Math.PI / 3)} ${c2.y + r * Math.sin(angle - 2 * Math.PI / 3)}
  L ${c2.x + r * Math.cos(angle + 2 * Math.PI / 3)} ${c2.y + r * Math.sin(angle + 2 * Math.PI / 3)}
            Z`;
};
arrow2.root.style.fill = '#0366EE';
arrow2.root.style.stroke = 'none';
arrow2.update();
c1.addDependency(c0);
c1.update = function () {
    this.x += c0.dx;
    this.y += c0.dy;
};
c2.addDependency(c0);
c2.update = function () {
    this.x += c0.dx;
    this.y += c0.dy;
};
