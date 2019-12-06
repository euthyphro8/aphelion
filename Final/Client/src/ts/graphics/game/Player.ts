
import IEntity, { EntityConstants } from '@/ts/interfaces/IEntity';

class Player {
    
    public entity: IEntity;

    private upPressed: boolean;
    private downPressed: boolean;
    private leftPressed: boolean;
    private rightPressed: boolean;
    private spacePressed: boolean;


    constructor(name: string) {
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.spacePressed = false;
        this.entity = {
            x: 100,
            y: 100,
            rechargeTime: 0,
            shieldTime: 0,
            name
        };
    }

    public registerEvents(): void {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }
    
    public unRegisterEvents(): void {
        document.removeEventListener('keydown', this.onKeyDown.bind(this));
        document.removeEventListener('keyup', this.onKeyUp.bind(this));
    }

    private onKeyDown(event: KeyboardEvent): void {
        if(event.keyCode === 65 || event.keyCode === 37) {
            this.leftPressed = true;
        }
        else if(event.keyCode === 87 || event.keyCode === 38) {
            this.upPressed = true;
        }
        else if(event.keyCode === 83 || event.keyCode === 40) {
            this.downPressed = true;
        }
        else if(event.keyCode === 68 || event.keyCode === 39) {
            this.rightPressed = true;
        }
        else if(event.keyCode === 32) {
            this.spacePressed = true;
        }
    }

    private onKeyUp(event: KeyboardEvent): void {
        if(event.keyCode === 65 || event.keyCode === 37) {
            this.leftPressed = false;
        }
        else if(event.keyCode === 87 || event.keyCode === 38) {
            this.upPressed = false;
        }
        else if(event.keyCode === 83 || event.keyCode === 40) {
            this.downPressed = false;
        }
        else if(event.keyCode === 68 || event.keyCode === 39) {
            this.rightPressed = false;
        }
        else if(event.keyCode === 32) {
            this.spacePressed = false;
        }
    }

    public update(dt: number): void {
        if(this.leftPressed) this.entity.x += -EntityConstants.speed;
        if(this.rightPressed) this.entity.x += EntityConstants.speed;
        if(this.upPressed) this.entity.y += -EntityConstants.speed;
        if(this.downPressed) this.entity.y += EntityConstants.speed;
        if(this.entity.shieldTime > 0) {
            this.entity.shieldTime -= dt;
        } else if(this.entity.rechargeTime > 0) {
            this.entity.rechargeTime -= dt;
        }else {
            if(this.spacePressed) {
                this.entity.shieldTime = EntityConstants.shieldTime;
                this.entity.rechargeTime = EntityConstants.rechargeTime;
            }
        }

        if(this.entity.x > 1920 - (EntityConstants.size / 2)) this.entity.x = 1920 - (EntityConstants.size / 2);
        else if(this.entity.x < 0 + (EntityConstants.size / 2)) this.entity.x = 0 + (EntityConstants.size / 2);
        if(this.entity.y > 1080 - (EntityConstants.size / 2)) this.entity.y = 1080 - (EntityConstants.size / 2);
        else if(this.entity.y < 0 + (EntityConstants.size / 2)) this.entity.y = 0 + (EntityConstants.size / 2);
    }

}

export default Player;