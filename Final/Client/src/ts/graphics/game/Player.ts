
import EntityRenderer from '@/ts/graphics/game/EntityRenderer';
import IEntity from '@/ts/interfaces/IEntity';

class Player {

    public speed: number;

    private upPressed: boolean;
    private downPressed: boolean;
    private leftPressed: boolean;
    private rightPressed: boolean;

    public entity: IEntity;

    constructor() {
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.speed = 10;
        this.entity = {
            x: 0,
            y: 0,
            hp: 100
        };
    }

    public registerEvents(): void {
        document.addEventListener('keypress', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }
    
    public unRegisterEvents(): void {
        document.removeEventListener('keypress', this.onKeyDown.bind(this));
        document.removeEventListener('keyup', this.onKeyUp.bind(this));
    }

    private onKeyDown(event: KeyboardEvent): void {
        if(event.key === 'a' || event.key === 'ArrowLeft') {
            this.leftPressed = true;
        }
        else if(event.key === 'w' || event.key === 'ArrowUp') {
            this.upPressed = true;
        }
        else if(event.key === 's' || event.key === 'ArrowDown') {
            this.downPressed = true;
        }
        else if(event.key === 'd' || event.key === 'ArrowRight') {
            this.rightPressed = true;
        }
    }

    private onKeyUp(event: KeyboardEvent): void {
        if(event.key === 'a' || event.key === 'ArrowLeft') {
            this.leftPressed = false;
        }
        else if(event.key === 'w' || event.key === 'ArrowUp') {
            this.upPressed = false;
        }
        else if(event.key === 's' || event.key === 'ArrowDown') {
            this.downPressed = false;
        }
        else if(event.key === 'd' || event.key === 'ArrowRight') {
            this.rightPressed = false;
        }
    }

    public update(): void {
        if(this.leftPressed) this.entity.x += -this.speed;
        if(this.rightPressed) this.entity.x += this.speed;
        if(this.upPressed) this.entity.y += -this.speed;
        if(this.downPressed) this.entity.y += this.speed;
    }

    public render(context: CanvasRenderingContext2D): void {
        EntityRenderer.render(context, this.entity);
    }
    

    public renderUi(context: CanvasRenderingContext2D): void {
        EntityRenderer.renderUi(context, this.entity);
    }
}

export default Player;