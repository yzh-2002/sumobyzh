import MyCanvas from "./MyCanvas";
import Road, {IRoad} from "./trafficComponent/IRoad";

function App() {
  const render =(ctx:CanvasRenderingContext2D)=>{
    if (ctx === null){
      return ;
    }
    // 清除画布
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // 底图
    ctx.fillStyle = '#4DBB4C';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    // 道路配置后面要抽离到config文件
    const roadConfig:IRoad[] = [
      {
        x: 0,
        y: window.innerHeight / 2 - 40,
        width: window.innerWidth,
        height: 80,
        direction: 'horizontal',
        lane: 3
      },
      {
        x: window.innerWidth / 2 - 40,
        y: 0,
        width: 80,
        height: window.innerHeight,
        direction: 'vertical',
        lane: 2
      }
    ];
    const roads = roadConfig.map(config=> new Road(config))
    roads.forEach(road=>{
      road.draw(ctx)
    })
  }

  return (
    <MyCanvas  externalRender={render} />
  )
}

export default App
