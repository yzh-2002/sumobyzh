const Theme = {
    // 配色
    color:{
        roadEdge:'#A09383', //道路边缘配色
        road:'#605A4C', //道路主题道路配色
        dashLine:'#A09383',
        solidLine:'#A68B44',
        traffic:{ //红绿灯配色
            red:'#f80808',
            green:'#1ee30a'
        }
    },
    // 虚线配置
    dashLine: {
        solidPart:2, //虚线实线部分长度
        emptyPart:5, //虚线空白间隔部分长度
        dashWidth:1 //虚线宽度
    },
    // 道路配置
    road:{
        edgeWidth:10, //道路边界宽度
        splitWidth:2, //道路双向道分界线宽度
        laneSplitWidth:1 //
    }

}

export default Theme