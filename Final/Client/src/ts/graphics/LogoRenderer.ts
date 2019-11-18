

class LogoRenderer {
    private color = '#FFFFFF';

    private scale = 0.001;
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

    private render(time: number): void {
        // Draws all stars
        console.log(this.scale);
        if (this.increasing) {
            this.scale += 0.01;
            if (this.scale >= 1.0) {
                this.increasing = false;
            }
        } else {
            this.scale -= 0.01;
            if (this.scale <= -1.0) {
                this.increasing = true;
            }
        }

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        const width = this.context.canvas.width / 2;
        const height = this.context.canvas.height / 2;
        this.context.fillStyle = this.color;
        this.context.strokeStyle = this.color;
        this.context.lineWidth = 80 * this.scale;
        this.context.beginPath();
        this.context.ellipse(width, height,
            (height * 0.4) * this.scale, height * 0.8, 0, Math.PI * (1 / 4), Math.PI * (3 / 4), true);
        this.context.stroke();

        this.context.beginPath();
        this.context.ellipse(width, (height - (height * 0.2)),
            height * 0.1, height * 0.1, 0, 0, 2 * Math.PI, true);
        this.context.fill();
        requestAnimationFrame(this.render.bind(this));
    }

}

export default LogoRenderer;
