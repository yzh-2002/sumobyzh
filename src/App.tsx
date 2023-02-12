import MyCanvas from "./MyCanvas";

function App() {
  const render =(ctx:CanvasRenderingContext2D)=>{
    if (ctx === null){
      return ;
    }
    ctx.fillRect(0,0,100,100)
  }

  return (
    <MyCanvas  externalRender={render} />
  )
}

export default App
