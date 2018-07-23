import echarts from 'echarts'
let CMBBar = {
    option:{
        backgroundColor: "#141f56",
        tooltip: {
            show: false,
        },
        legend: {
            show:false,
        },
        grid: {
            borderWidth: 0,
            left: '5%',
            right: '5%',
            bottom: '15%',
            top:'10%',
            textStyle: {
                color: "#fff"
            }
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                inside: false,
                textStyle: {
                    color: '#ffffff',
                    fontWeight: 'normal',
                    fontSize: '12',
                    textAlign:'left',
                },
                formatter:function(params){
                    var newParamsName = "";
                    var provideNumber = 2; //一行显示几个字
                    var paramsNameNumber = params && params.length;
                    var rowNumber = Math.ceil(paramsNameNumber / provideNumber) || 0;
                    if (paramsNameNumber > provideNumber) {
                        for (var p = 0; p < rowNumber; p++) {
                            var tempStr = "";
                            var start = p * provideNumber;
                            var end = start + provideNumber;
                            if (p == rowNumber - 1) {
                                tempStr = params.substring(start, paramsNameNumber);
                            } else {
                                tempStr = params.substring(start, end) + "\n";
                            }
                            newParamsName += tempStr;
                        }

                    } else {
                        newParamsName = params;
                    }
                    return newParamsName;
                }
            },
            data: '',
        }, {
            type: 'category',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitArea: {
                show: false
            },
            splitLine: {
                show: false
            },
            data:'',
        }],
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
        },
        series: [{
                type: 'bar',
                itemStyle: {
                    normal: {
                        show: true,
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#00c0e9'
                        }, {
                            offset: 1,
                            color: '#3b73cf'
                        }]),
                        barBorderRadius: [50,50,0,0],
                        borderWidth: 0,
                    },
                    emphasis: {
                        shadowBlur: 15,
                        shadowColor: 'rgba(105,123, 214, 0.7)'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#ffffff',
                            fontStyle: 'normal',
                            fontFamily: '微软雅黑',
                            textAlign: 'left',
                            fontSize: 12,
                        },
                    },
                },
                zlevel: 2,
                barWidth: '30%',
                data: '',
            },
            {
                name: '',
                type: 'bar',
                xAxisIndex: 1,
                zlevel: 1,
                itemStyle: {
                    normal: {
                        color: '#121847',
                        borderWidth: 0,
                        barBorderRadius: [50,50,0,0],
                        shadowBlur: {
                            shadowColor: 'rgba(255,255,255,0.31)',
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 2,
                        },
                    }
                },
                barWidth: '30%',
                data: '',
            }]
    }
};
CMBBar.getOption = function (){
    return CMBBar.option;
};
CMBBar.setOption = function(option){
    CMBBar.option = option;
};
CMBBar.buildOption = function (xName,xAlias,seriesName,selectdOption) {
    selectdOption.xAxis[0].data = xName;
    selectdOption.xAxis[1].data = xName;
    selectdOption.series[0].name = seriesName[0].alias;
    selectdOption.series[0].data = seriesName[0].name;

};

CMBBar.attachData = function(option,data,getColData){
    let xName = option.xAxis[0].data;
    let yName = option.series[0].data;
    let xData = getColData(xName,data);
    let yData = getColData(yName,data);
    let maxData = Math.max(...yData);
    let totalRowsCount = data.rowsCount;
    let maxList = [];
    for(let i=0; i<totalRowsCount; i++){
        maxList.push(maxData);
    }
    option.xAxis[0].data = xData;
    option.xAxis[1].data = xData;
    option.series[0].data = yData;
    option.series[1].data = maxList;
    option.xAxis[0].axisLabel.formatter = function(params){
        var newParamsName = "";
        var provideNumber = 2; //一行显示几个字
        var paramsNameNumber = params && params.length;
        var rowNumber = Math.ceil(paramsNameNumber / provideNumber) || 0;
        if (paramsNameNumber > provideNumber) {
            for (var p = 0; p < rowNumber; p++) {
                var tempStr = "";
                var start = p * provideNumber;
                var end = start + provideNumber;
                if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                } else {
                    tempStr = params.substring(start, end) + "\n";
                }
                newParamsName += tempStr;
            }

        } else {
            newParamsName = params;
        }
        return newParamsName;
    }

}

export default CMBBar;


