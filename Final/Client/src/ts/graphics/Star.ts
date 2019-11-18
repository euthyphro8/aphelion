
class Star {
    private x: number;
    private y: number;
    private speed: number;

    constructor() {
        this.x = Math.random();
        this.y = Math.random();
        this.speed = (Math.random() * 0.003) + 0.0001;
    }

    public offset(dx: number, dy: number) {
        this.x = (this.x + (this.speed * dx)) % 1;
        this.y = (this.y + (this.speed * dy)) % 1;
        if (this.x < 0)  {
            this.x += 1;
        }
        if (this.y < 0) {
            this.y += 1;
        }
    }

    public render(context: CanvasRenderingContext2D, scale: number) {
        context.moveTo(this.x * scale, this.y * scale);
        context.arc(this.x * scale, this.y * scale, 0.6 + (this.speed / 0.2), 0, 2 * Math.PI);
    }
}

export default Star;
