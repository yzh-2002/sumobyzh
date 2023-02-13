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