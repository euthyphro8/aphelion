

class LogoRenderer {
    private color = '#FFFFFF';

    private scale = 0.00001;
    private increasing = true;
    private context: CanvasRenderingContext2D;
    private requestId: number;

    constructor(ctx: CanvasRenderingContext2D) {
        this.context = ctx;
        this.requestId = -1;

        this.onResized();
        this.registerEvents();
    }

    public start(): void {
        this.requestId = requestAnimationFrame(this.render.bind(this));
    }

    private registerEvents(): void {
        window.addEventListener('resize', this.onResized.bind(this));
    }

    private unRegisterEvents(): void {
        window.removeEventListener('resize', this.onResized.bind(this));
    }

    private onResized(): void {
        this.context.canvas.width = this.context.canvas.clientWidth * 2;
        this.context.canvas.height = this.context.canvas.clientHeight * 2;
    }

    private cubicEaseInOut(t: number, b: number, c: number, d: number): number {
        t /= (d / 2.0);
        if (t < 1) {
            return c / 2 * t * t * t + b;
        }
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    private render(time: number): void {
        // Draws all stars
        console.log(`time ${time}`);
        this.scale = Math.abs(this.cubicEaseInOut(time % 3000, -1.0, 1.0, 3000));
        console.log(`scale ${this.scale}`);

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        const width = this.context.canvas.width / 2;
        const height = this.context.canvas.height / 2;
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.color;
        this.context.lineWidth = 20 * (Math.log((this.scale) * 60 + 10));
        this.context.beginPath();
        this.context.ellipse(width, height,
            (height * 0.4) * this.scale, height * 0.8,// * (this.scale / 2.0 + 0.5),
            0, Math.PI * (1 / 4), Math.PI * (3 / 4), true);
        this.context.stroke();

        this.context.beginPath();
        this.context.ellipse(width, (height - (height * 0.2)),
            height * 0.1, height * 0.1, 0, 0, 2 * Math.PI, true);
        this.context.fill();
        requestAnimationFrame(this.render.bind(this));
    }

}

export default LogoRenderer;
