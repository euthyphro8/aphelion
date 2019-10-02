
class Star {
    x: number;
    y: number;
    speed: number;
    scale: number;

    constructor(x: number, y: number, speed: number) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.scale = 1;
    }

    setScale(scale: number) {
        this.scale = scale;
    }

    offset(dx: number, dy: number) {
        this.x = (this.x + (this.speed * dx)) % 1;
        this.y = (this.y + (this.speed * dy)) % 1;
    }

    draw(context: CanvasRenderingContext2D) {
        context.moveTo(this.x, this.y);
        context.arc(this.x, this.y, 0.5 + (this.speed / 0.2), 0, 2 * Math.PI);
    }
}

export default Star;