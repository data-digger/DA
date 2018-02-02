let  ChartTemplate= {

};
ChartTemplate.line = {
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
ChartTemplate.bar = {
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
}
export default ChartTemplate;
