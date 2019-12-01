import IEntity from '@/ts/interfaces/IEntity';

class EntityRenderer {

    public static render(context: CanvasRenderingContext2D, entity: IEntity) {
        context.fillStyle = '#ee2';
        context.moveTo(entity.x, entity.y);
        context.rect(entity.x, entity.y, 100, 100);
    }
    
    public static renderUi(context: CanvasRenderingContext2D, entity: IEntity) {
        context.fillStyle = '#d22';
        context.moveTo(entity.x, entity.y + 100);
        context.rect(entity.x, entity.y + 100, entity.hp, 10);
    }
}

export default EntityRenderer;
