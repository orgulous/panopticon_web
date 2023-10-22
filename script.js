const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const lines = [];
const numLines = 60;

canvas.width = canvas.parentElement.offsetWidth;
canvas.height = canvas.parentElement.offsetHeight;

class Line {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = 300;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() < 0.1 ? -1 : 1) * 0.002; // constant rotation speed
        this.speed = 0.2;
        this.opacity = 0; // Start with an opacity of 0
        this.fadeSpeed = 0.01; // Adjust this value to make the fade faster or slower

    }

    update() {
        this.angle += this.rotationSpeed;

        // Move line based on angle
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        // Update opacity for fade-in effect
        if (this.opacity < 1) {
            this.opacity += this.fadeSpeed;
        }

        // Reset line if out of canvas bounds
        if (this.x > canvas.width + this.length || this.x < -this.length || this.y > canvas.height + this.length || this.y < -this.length) {
            Object.assign(this, new Line());
        }
    }

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + Math.cos(this.angle) * this.length, this.y + Math.sin(this.angle) * this.length);
        ctx.strokeStyle = `rgba(74, 85, 115, ${this.opacity * .7})`; // Use the opacity value
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

for (let i = 0; i < numLines; i++) {
    lines.push(new Line());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const line of lines) {
        line.update();
        line.draw();
    }

    requestAnimationFrame(animate);
}

let lineCreationInterval = 500; // 100ms interval to create a new line
let currentLinesCount = 0;

// Function to add a line to the array
function addLine() {
    if (currentLinesCount < numLines) {
        lines.push(new Line());
        currentLinesCount++;
    } else {
        clearInterval(lineCreationTimer); // Stop the interval when we reach the desired number of lines
    }
}

let lineCreationTimer = setInterval(addLine, lineCreationInterval);

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const line of lines) {
        line.update();
        line.draw();
    }

    requestAnimationFrame(animate);
}

animate();