
class GameRenderer {

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
        cancelAnimationFrame(this.requestId);
    }

    private onResized(): void {
        this.context.canvas.width = this.context.canvas.clientWidth * 2;
        this.context.canvas.height = this.context.canvas.clientHeight * 2;
    }


    private render(time: number): void {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.fillStyle = '#fff';
        this.context.fillRect(0, 0, 100, 100);
        this.requestId = requestAnimationFrame(this.render.bind(this));
    }

}

export default GameRenderer;
