import constant from "../constant";

export interface IRoad {
    x:number
    y:number // 道路的坐标为绘制道路主体矩形的左上角（故绘制道路边缘时记得）
    width:number //道路主体的宽度（不包括道路边框的宽度）
    height:number
    direction:'horizontal' | 'vertical' //道路方向，以(x,y)作为道路中心线起点
    lane:number //道路车道数量（例如：2表示双向4车道(两个方向，每个方向2个车道)，最小值为1 ）
}

const defaultRoadConfig:IRoad ={
    x:0,
    y:0,
    width:0,
    height:0,
    direction:'horizontal',
    lane:1
}
const theme =constant.Theme

export default class Road {
    constructor(config:IRoad) {
        for(let key in defaultRoadConfig){
            const _key =key as keyof IRoad
            //@ts-ignore FIXME:类型报错
            this[_key] = config[_key]
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
    // 实线可看作宽度很小的矩形
    drawSolidLine(ctx:CanvasRenderingContext2D,x:number,y:number,w:number,h:number){
        ctx.fillStyle =theme.color.solidLine
        ctx.fillRect(x,y,w,h)
    }
    // 虚线参数需要注意
    drawDashLine(ctx:CanvasRenderingContext2D,x1:number,y1:number,x2:number,y2:number){
        ctx.beginPath();
        ctx.setLineDash([theme.dashLine.solidPart, theme.dashLine.emptyPart]);
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.closePath();
        ctx.strokeStyle = theme.color.dashLine;
        ctx.lineWidth = theme.dashLine.dashWidth;
        ctx.fill();
        ctx.stroke();
    }
    draw(ctx:CanvasRenderingContext2D){
        // 绘制的时候注意先后顺序十分重要
        const { x,y,width:w,height:h,direction,lane } =this as unknown as IRoad
        if (direction==='horizontal'){
            // 绘制时不是绘制两条窄的边框线，而是绘制一条很宽的线，然后在其上绘制较窄的道路从而达到显示边框的效果
            this.drawRoadEdge(ctx,x,y-theme.road.edgeWidth,w,h+2*theme.road.edgeWidth);
        }else if(direction==='vertical'){
            this.drawRoadEdge(ctx,x-theme.road.edgeWidth,y,w+2*theme.road.edgeWidth,h)
        }
        // 绘制道路主体
        this.drawRoad(ctx,x,y,w,h);
        // 计算车道宽度
        if (lane>1){
            // 车道宽度
            const space =Math.min(w,h) / lane / 2; //canvas中宽度指x轴方向的长度，但不代表道路实际宽度
            for (let i=1;i<lane;i++) {
                let s1 = space * i - theme.dashLine.dashWidth, s2 = space * (lane * 2 - i) - theme.dashLine.dashWidth;
                if (direction==='horizontal'){
                    this.drawDashLine(ctx,x,y+s1,w,y+s1)
                    this.drawDashLine(ctx,x,y+s2,w,y+s2)
                }else if(direction==='vertical'){
                    this.drawDashLine(ctx,x+s1,y,x+s1,h)
                    this.drawDashLine(ctx,x+s2,y,x+s2,h)
                }
            }
        }
        if (direction==='horizontal'){
            // 道路双向道分界实线
            this.drawSolidLine(ctx,x,y+h/2-theme.road.splitWidth/2,w,theme.road.splitWidth);
        }else if(direction==='vertical'){
            this.drawSolidLine(ctx,x+w/2-theme.road.splitWidth/2,y,theme.road.splitWidth,h)
        }
    }
}