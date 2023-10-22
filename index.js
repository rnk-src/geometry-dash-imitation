let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d");

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;

canvas.style.background = "#000000"

class Square {
    constructor(xPosition, yPosition, length, color, dx, dy) {
        this._xPosition = xPosition;
        this._yPosition = yPosition;
        this._length = length;
        this._color = color;
        this._dx = dx;
        this._dy = dy;
    }

    draw (context) {
        context.beginPath();
        context.strokeStyle = this._color;
        context.fillStyle = this._color;
        context.fillRect(this._xPosition, this._yPosition, this._length, this._length);
        context.closePath();
    }

    update () {
        let doGravity = true
        context.clearRect(0, 0, windowWidth, windowHeight);

        this.draw(context);

        let sides = {leftMost: this._xPosition - this._length, rightMost: this._xPosition + this._length,
            bottomMost: this._yPosition + this._length, topMost: this._yPosition - this._length};

        if (sides.rightMost >= windowWidth || sides.leftMost < 0) {
            this._dx = -this._dx;
            if (sides.rightMost >= windowWidth) {
                this._xPosition = windowWidth - this._length;
            } else {
                this._xPosition = this._length;
            }
        }

        if (sides.bottomMost >= windowHeight || sides.topMost < 0) {
            if (sides.bottomMost >= windowHeight) {
                this._yPosition = windowHeight - this._length - 15;
                doGravity = false
            } else {
                this._dy = -this._dy
                this._yPosition = this._length;
            }
        }

        if (doGravity) {
            this._dy += 0.4;
        }

        this._xPosition += this._dx;
        this._yPosition += this._dy;
    }

    get xPosition() {
        return this._xPosition;
    }

    set xPosition(value) {
        this._xPosition = value;
    }

    get yPosition() {
        return this._yPosition;
    }

    set yPosition(value) {
        this._yPosition = value;
    }

    get length() {
        return this._length;
    }

    set length(value) {
        this._length = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get dx() {
        return this._dx;
    }

    set dx(value) {
        this._dx = value;
    }

    get dy() {
        return this._dy;
    }

    set dy(value) {
        this._dy = value;
    }
}

square = new Square(0, windowHeight - 30, 50, "red", 5, 0);

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.code) {
        case "Space":
            square.dy = -15;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }

    event.preventDefault();
}, true);

square.draw(context);

let updateSquare = function () {
    requestAnimationFrame(updateSquare);
    square.update();
}

updateSquare();