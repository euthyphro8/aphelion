
import IEntity, { EntityConstants } from '@/ts/interfaces/IEntity';
import IHazard from '@/ts/interfaces/IHazard';

class Renderer {

    public static render(context: CanvasRenderingContext2D, entity: IEntity) {
        if(entity.shieldTime <= 0) {
            context.fillStyle = '#ee2';
            context.moveTo(entity.x - 25, entity.y - 25);
            context.rect(entity.x - 25, entity.y - 25, 50, 50);
        }
    }
    
    public static renderShield(context: CanvasRenderingContext2D, entity: IEntity) {
        if(entity.shieldTime > 0) {
            context.fillStyle = '#48d';
            context.moveTo(entity.x, entity.y);
            context.ellipse(entity.x, entity.y, 50, 50, 0, 0, 2 * Math.PI);
        }
    }

    public static renderName(context: CanvasRenderingContext2D, entity: IEntity) {
        context.fillStyle = '#ccc';
        context.textAlign = 'center';
        context.font = '16px Montserrat';
        context.fillText(entity.name, entity.x, entity.y + EntityConstants.size);
    }

    public static renderRecharge(context: CanvasRenderingContext2D, entity: IEntity) {
        if(entity.rechargeTime > 0 && entity.shieldTime <= 0) {
            context.beginPath();
            context.strokeStyle = '#cccccc';
            context.lineWidth = 5;
            context.arc(entity.x, entity.y, 40, 0, 2 * Math.PI * (entity.rechargeTime / EntityConstants.rechargeTime));
            context.stroke();
        }
    }

    public static renderHazard(context: CanvasRenderingContext2D, hazard: IHazard) {
        context.fillStyle = '#d48';
        context.moveTo(hazard.x, hazard.y);
        context.ellipse(hazard.x, hazard.y, hazard.size, hazard.size, 0, 0, 2 * Math.PI);
    }

    public static renderInfo(context: CanvasRenderingContext2D, roomId:string, score: number) {
        context.fillStyle = '#ccc';
        context.textAlign = 'center';
        context.font = '48px Montserrat';
        context.fillText(`Room ${roomId}`, 1920 / 2, 64);
        context.font = '24px Montserrat';
        context.fillText(`Score ${score}`, 1920 / 2, 96);
    }
}

export default Renderer;
