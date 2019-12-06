
import Player from '@/ts/graphics/game/Player';
import Client from '@/ts/coms/Client';
import IEntity from '@/ts/interfaces/IEntity';
import EntityRenderer from '@/ts/graphics/game/EntityRenderer';
import IHazard from '@/ts/interfaces/IHazard';

class GameRenderer {

    private context: CanvasRenderingContext2D;
    private entities: Map<string, IEntity>;
    private client: Client;
    private player: Player;
    private hazard: IHazard;

    private requestId: number;
    private accumTime: number;
    private lastTime: number;
    private stepTime: number;

    constructor(ctx: CanvasRenderingContext2D, client: Client) {
        this.context = ctx;
        this.client = client;
        this.player = new Player('Name');
        this.entities = new Map<string, IEntity>();
        this.hazard = {
            x: 1920 / 2,
            y: 1080 / 2,
            size: 70
        };
        
        this.requestId = -1;
        this.lastTime = 0.0;
        this.accumTime = 0.0;
        this.stepTime = (1000.0 / 60.0);
    }

    public start(): void {
        this.context.canvas.width = 1920;
        this.context.canvas.height = 1080;
        this.registerEvents();
    }
    
    public close() {
        this.unRegisterEvents();
    }

    private registerEvents(): void {
        this.player.registerEvents();
        this.requestId = requestAnimationFrame(this.tick.bind(this));
        this.client.subscribeToRoom(this.onServerTick.bind(this));
    }

    private unRegisterEvents(): void {
        this.client.unSubscribeToRoom(this.onServerTick.bind(this));
        cancelAnimationFrame(this.requestId);
        this.player.unRegisterEvents();
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
                this.update(this.stepTime);
                this.accumTime -= this.stepTime;
            }
            this.client.sendClientTick(this.player.entity);
        }
        // Render always
        this.render();
        this.requestId = requestAnimationFrame(this.tick.bind(this));
    }

    private update(dt: number): void {
        this.player.update(dt);
    }
    
    private render(): void {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        
        // Draw all bodies
        this.context.beginPath();
        this.entities.forEach((entity, id) => EntityRenderer.render(this.context, entity));
        this.context.fill();

        // Draw all Shields
        this.context.beginPath();
        this.entities.forEach((entity, id) => EntityRenderer.renderShield(this.context, entity));
        this.context.fill();

        // Draw all Recharges
        this.context.beginPath();
        this.entities.forEach((entity, id) => EntityRenderer.renderRecharge(this.context, entity));
        this.context.stroke();

        // Draw all Recharges
        this.context.beginPath();
        EntityRenderer.renderHazard(this.context, this.hazard);
        this.context.fill();

        // Draw all Usernames
        this.entities.forEach((entity, id) => EntityRenderer.renderName(this.context, entity));

    }

}

export default GameRenderer;
