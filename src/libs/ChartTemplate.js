let  ChartTemplate= {

};
ChartTemplate.TYPE = ['Line','Bar','Pie','Table'];

ChartTemplate.Line = {
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
};
ChartTemplate.Bar = {
    title : {
        text: '柱状图',
    },
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
            data : '@colName1'
        },
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'@colName2',
            type:'bar',
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        },
        {
            name:'@colName2',
            type:'bar',
            markPoint : {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        }
    ]
},
ChartTemplate.Pie = {
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
}
export default ChartTemplate;
