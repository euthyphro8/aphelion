
class Star {
    x: number;
    y: number;
    speed: number;

    constructor(x: number, y: number, speed: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    offset(dx: number, dy: number) {
        this.x = (this.x + (this.speed * dx)) % 1;
        this.y = (this.y + (this.speed * dy)) % 1;
        if(this.x < 0) this.x += 1;
        if(this.y < 0) this.y += 1;
    }

    render(context: CanvasRenderingContext2D, scale: number) {
        context.moveTo(this.x * scale, this.y * scale);
        context.arc(this.x * scale, this.y * scale, 0.5 + (this.speed / 0.2), 0, 2 * Math.PI);
    }
}

export default Star;