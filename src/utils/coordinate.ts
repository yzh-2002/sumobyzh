/*
* 实际绘制矩形时，目前可以向四个方向绘制（上下左右）
* 但是canvas绘制矩形只能从起始点向右，向下绘制
* 并且绘制时，我们习惯给出矩形绘制方向的中线的起始点坐标，而不是矩形左上角坐标
* 故需要进行转换，得到相应的起始点
* */
const getRectStart =(x:number,y:number,w:number,h:number,d:'up' | 'right' | 'down' | 'left'):{
    startX:number,
    startY:number
}=>{
    const result ={startX:0,startY:0}
    switch (d){
        case "up":
            result.startX =x-w/2;
            result.startY =y-h;
            return result
        case "right":
            result.startX =x;
            result.startY =y-w/2;
            return result;
        case "down":
            result.startX =x-w/2;
            result.startY =y;
            return result
        case "left":
            result.startX =x-h;
            result.startY =y-w/2;
            return result;
    }
    return result;
}

export default { getRectStart }