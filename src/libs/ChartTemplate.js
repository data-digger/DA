let  ChartTemplate= {

};
ChartTemplate.TYPE = ['Line','Bar','HBar','Pie','Card'];


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
