import constant from "../constant";
import Utils from "../utils";

export interface IRoad {
    x:number
    y:number // 道路的坐标为绘制方向中线的起始坐标
    width:number //道路主体的宽度（不包括道路边框的宽度）
    height:number
    direction:'up' | 'right' | 'down' | 'left' //道路方向，以(x,y)作为道路中心线起点
    lane:number //道路车道数量（例如：2表示双向4车道(两个方向，每个方向2个车道)，最小值为1 ）
}

const defaultRoadConfig:IRoad ={
    x:0,
    y:0,
    width:0,
    height:0,
    direction:'right',
    lane:1
}
const theme =constant.Theme
const { getRectStart } =Utils

export default class Road {
    roadConfig:IRoad =defaultRoadConfig
    constructor(config:IRoad) {
        for(let key in defaultRoadConfig){
            const _key =key as keyof IRoad
            //@ts-ignore FIXME:类型报错
            this.roadConfig[_key] = config[_key]
        }
    }
    // 绘制道路轮廓
    drawRoadEdge(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number){
        ctx.fillStyle =theme.color.roadEdge
        ctx.fillRect(x,y,w,h)
    }
    // 绘制道路主体
    drawRoad(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number){
        ctx.fillStyle =theme.color.road
        ctx.fillRect(x,y,w,h)
    }
    drawSolidLine(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number){
        ctx.fillStyle =theme.color.solidLine
        ctx.fillRect(x,y,w,h)
    }
    drawDashLine(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number){
        ctx.beginPath();
        ctx.setLineDash([theme.dashLine.solidPart, theme.dashLine.emptyPart]);
        ctx.moveTo(x, y);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.strokeStyle = theme.color.dashLine;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
    }
    draw(ctx:CanvasRenderingContext2D){
        const { x,y,width:w,height:h,direction,lane } =this.roadConfig
        // 绘制时不是绘制两条窄的边框线，而是绘制一条很宽的线，然后在其上绘制较窄的道路从而达到显示边框的效果
        this.drawRoadEdge(
            ctx,
            getRectStart(x,y,w,h,direction).startX,
            getRectStart(x,y,w,h,direction).startY,
            w,
            h
        )

    }
}