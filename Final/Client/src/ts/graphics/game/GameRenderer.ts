
import Player from '@/ts/graphics/game/Player';
import Client from '@/ts/coms/Client';
import IEntity from '@/ts/interfaces/IEntity';
import EntityRenderer from '@/ts/graphics/game/EntityRenderer';

class GameRenderer {

    private context: CanvasRenderingContext2D;
    private entities: Map<string, IEntity>;
    private client: Client;
    private player: Player;

    private requestId: number;
    private accumTime: number;
    private lastTime: number;
    private stepTime: number;

    constructor(ctx: CanvasRenderingContext2D, client: Client) {
        this.context = ctx;
        this.client = client;
        this.player = new Player();
        this.entities = new Map<string, IEntity>();
        
        this.requestId = -1;
        this.lastTime = 0.0;
        this.accumTime = 0.0;
        this.stepTime = (1000.0 / 60.0);
    }

    public start(): void {
        this.onResized();
        this.registerEvents();
    }
    
    public close() {
        this.unRegisterEvents();
    }

    private registerEvents(): void {
        window.addEventListener('resize', this.onResized.bind(this));
        this.player.registerEvents();
        this.requestId = requestAnimationFrame(this.tick.bind(this));
        this.client.subscribeToRoom(this.onServerTick.bind(this));
    }

    private unRegisterEvents(): void {
        this.client.unSubscribeToRoom(this.onServerTick.bind(this));
        cancelAnimationFrame(this.requestId);
        this.player.unRegisterEvents();
        window.removeEventListener('resize', this.onResized.bind(this));
    }

    private onResized(): void {
        this.context.canvas.width = this.context.canvas.clientWidth * 2;
        this.context.canvas.height = this.context.canvas.clientHeight * 2;
    }

    private onServerTick(entities: [string, IEntity][]): void {
        this.entities = new Map<string, IEntity>(entities);
    }

    private tick(time: number) {
        let delta = time - this.lastTime;
        this.lastTime = time;
        // Update if the target time has elapsed
        this.accumTime += delta;
        if(this.accumTime > this.stepTime) {
            while(this.accumTime > this.stepTime) {
                this.update();
                this.accumTime -= this.stepTime;
            }
            this.client.sendClientTick(this.player.entity);
        }
        // Render always
        this.render();
        this.requestId = requestAnimationFrame(this.tick.bind(this));
    }

    private update(): void {
        this.player.update();
    }
    
    private render(): void {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        
        // Draw all bodies
        this.context.beginPath();
        this.player.render(this.context);
        this.entities.forEach((entity, id) => {
            if(id !== this.client.id) {
                EntityRenderer.render(this.context, entity);
            }
        });
        this.context.fill();

        // Draw all UI
        this.context.beginPath();
        this.player.renderUi(this.context);
        this.entities.forEach((entity, id) => {
            if(id !== this.client.id) {
                EntityRenderer.renderUi(this.context, entity);
            }
        });
        this.context.fill();
    }

}

export default GameRenderer;
