/* Update Apr 14, 2025 12:13pm */
export class Track {
    constructor(canvas, lanes, carWidth) {
        this.startLine = {
            x: 0,
            yTop: 0,
            yBottom: 0
        };
        this.centerX = canvas.width / 2;
        this.centerY = canvas.height / 2;
        // old version
        this.semiMajorAxis = canvas.width / 2 - 20; // 6.28
        this.semiMinorAxis = canvas.height / 2 - 20;
        this.lanes = lanes;
        this.carWidth = carWidth;
        // Initialize start line position
        this.startLine.x = this.centerX;
        this.startLine.yTop = this.centerY - this.semiMinorAxis;
        this.startLine.yBottom = this.centerY - (this.semiMinorAxis - lanes * carWidth);
    }
    draw(context) {
        // Draw the outer and inner ovals
        context.beginPath();
        context.ellipse(this.centerX, this.centerY, this.semiMajorAxis, this.semiMinorAxis, 0, 0, 2 * Math.PI);
        context.ellipse(this.centerX, this.centerY, this.semiMajorAxis - this.lanes * this.carWidth, this.semiMinorAxis - this.lanes * this.carWidth, 0, 0, 2 * Math.PI, true);
        context.fillStyle = 'gray';
        context.fill();
        // Draw lane dividers
        for (let i = 1; i < this.lanes; i++) {
            const laneSemiMajorAxis = this.semiMajorAxis - i * this.carWidth;
            const laneSemiMinorAxis = this.semiMinorAxis - i * this.carWidth;
            context.beginPath();
            context.ellipse(this.centerX, this.centerY, laneSemiMajorAxis, laneSemiMinorAxis, 0, 0, 2 * Math.PI);
            context.strokeStyle = 'white';
            context.lineWidth = 1;
            context.stroke();
        }
        // Draw the start line
        /*
         const startLineX = this.centerX;
         const startLineYStart = this.centerY - this.semiMinorAxis;
         const startLineYEnd = this.centerY - (this.semiMinorAxis - this.lanes * this.carWidth);
         context.beginPath();
         context.moveTo(startLineX, startLineYStart);
         context.lineTo(startLineX, startLineYEnd);
         context.strokeStyle = 'white';
         context.lineWidth = 3;
         context.stroke();
         */
        // new version Apr 22 - Draw the start line
        context.beginPath();
        context.moveTo(this.startLine.x, this.startLine.yTop);
        context.lineTo(this.startLine.x, this.startLine.yBottom);
        context.strokeStyle = 'white';
        context.lineWidth = 3;
        context.stroke();
    }
}
