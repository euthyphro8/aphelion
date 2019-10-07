
import Star from './Star';

export class ParallaxRenderer {

    stars: Star[];
    bkgColor: string;
    starColor: string;
    scale: number;

    constructor(bkgColor: string, starColor: string) {
        this.bkgColor = bkgColor;
        this.starColor = starColor;
        this.scale = 1;
    }

    setScale(scale: number) {
        this.scale = scale;
    }

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.bkgColor;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        context.beginPath();
        for(var star of this.stars) {

        }
        context.fill();
    }

}