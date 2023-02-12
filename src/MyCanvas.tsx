import {useEffect, useRef, useState} from "react";
import constant from "./constant"

const MyCanvas =({externalRender}:{
    externalRender:(ctx:CanvasRenderingContext2D)=>void
})=>{
    const canvasRef =useRef<HTMLCanvasElement | null>(null)
    const [canvasCtx,setCanvasCtx] =useState<CanvasRenderingContext2D | null>(null)

    // 获取画布
    useEffect(()=>{
        const ctx =canvasRef.current!.getContext('2d');
        canvasRef.current!.width =constant.canvasWidth
        canvasRef.current!.height =constant.canvasHeight
        setCanvasCtx(ctx);
    },[])

    const render =()=>{
        externalRender(canvasCtx!);
        requestAnimationFrame(render);
    }

    useEffect(()=>{
        requestAnimationFrame(render);
    },[canvasCtx])

    return (
        <canvas ref={canvasRef} />
    )
}

export  default MyCanvas;