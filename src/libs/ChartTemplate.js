let  ChartTemplate= {

};
ChartTemplate.TYPE = [  {type:'Bar',src:require('./../views/chartcomponents/ChartIcon/Bar.png'),desc:'柱状图'},
                        {type:'HBar',src:require('./../views/chartcomponents/ChartIcon/HBar.png'),desc:'条形图'},
                        {type:'Line',src:require('./../views/chartcomponents/ChartIcon/Line.png'),desc:'折线图'},
                        {type:'Pie',src:require('./../views/chartcomponents/ChartIcon/Pie.png'),desc:'饼图'},
                        {type:'Card',src:require('./../views/chartcomponents/ChartIcon/Card.png'),desc:'统计卡'},];

ChartTemplate.COLORS =[ {color:['#63c5d0','#ff9b4f','#4ac6ff','#58b0e8','#b39ddb','#ffc400','#8dc93f','#8294e3','#e089be'],
                        src:require('./../views/chartcomponents/ChartColors/color1.png')},
                        {color:['#0293d6','#ff9000','#01c98e','#f6cd4b','#466e9d','#e16b96','#bbb0ab','#887875','#94cceb'],
                        src:require('./../views/chartcomponents/ChartColors/color2.png')},
                        {color:['#fcdb00','#99d166','#feac97','#e4664f','#ee9b35','#ffea43','#cf6490','#e779b8','#fa9078'],
                        src:require('./../views/chartcomponents/ChartColors/color3.png')},
                        {color:['#0039b3','#1857de','#0476d9','#3b68b2','#5d89d3','#5475e0','#6298ed','#97b7fc','#bed0f7'],
                        src:require('./../views/chartcomponents/ChartColors/color4.png')},
                        {color:['#019354','#81c347','#01a371','#029d9f','#0183b7','#61bba1','#5dbbc5','#4aa5dc','#4cb034'],
                        src:require('./../views/chartcomponents/ChartColors/color5.png')}
                      ]

ChartTemplate.ICONS = ['person-add','stats-bars','pie-graph','arrow-graph-up-right','clock',
                        'paper-airplane'];
ChartTemplate.Card = `{
    data:"@colName",
    iconType:"android-person-add",
    color:"#2d8cf0",
    introText:"今日新增用户",
    countSize: '30px',
    countWeight: 700,
    iconSize: 40,
    introColor: '#C8C8C8',
    introSize: '12px',
    introWeight: 500
}`;
                        
ChartTemplate.Line = `{
    title: {
        text: '折线图',
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        show:true,
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: '@colName1'
    },
    yAxis: [{
        type: 'value'
    }],
    series: [
        {
            name:'@colName2',
            type:'line',
        },
        {
            name:'@colName3',
            type:'line',
        },
    ]
}`;
ChartTemplate.Bar = {
    color:[],
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        show:true
    },
    toolbox: {
        show : true,
        feature : {
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : {
            type : 'category',
            data : '',
        },
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
    ]
},
ChartTemplate.Pie = `{
    title : {
        text: '饼图',
        subtext: '',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        show: true,
        orient: 'vertical',
        left: 'left',
    },
    series : [
        {
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {name:'@name',value:'@value'},
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}`,
ChartTemplate.HBar = `{
    title: {
        text: '条形图',
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        show:true,
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: '@colName1'
    },
    series: [
        {
            name:'@colName2',
            type:'bar',
        },
    ]
}`;
export default ChartTemplate;
