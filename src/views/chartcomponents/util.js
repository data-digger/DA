import ChartTemplate from './../../libs/ChartTemplate.js'
import echarts from 'echarts'
let util = {

};
util.findIndex = function(list,name){
    var re = -1;
    for(let i=0; i<list.length; i++){
        if(list[i].columnName == name){
            re = i;
            break;
        }
    }
    return re;
};
util.getColData = function(colName,data){
    let header = data.stringHeaders;
    let tdata = data.data;
    let cid = header.indexOf(colName);
    if(cid < 0){ //所给的列名不存在，返回空数组
        return [];
    }else {
        let re=[];
        for(let i in tdata){
            let ndata = tdata[i][cid];
            switch(ndata.type){
                case 'STRING':
                    re.push(ndata.null ? '':ndata.stringValue);
                    break;
                case 'INTEGER':
                    re.push(ndata.null ? 0:ndata.intValue);
                    break;
                case 'DOUBLE':
                    re.push(ndata.null ? 0:ndata.doubleValue);
                    break;
                default:
                    re.push(ndata.null ? 0:ndata.displayValue);
                    break;

            }
        }
        return re;
    }

};

util.analysisGridChart = function(option,data){
    let xName = option.xAxis.data;
    option.xAxis.data = util.getColData(xName,data);
    for(let i = 0; i<option.series.length; i++){
        let sName = option.series[i].data;
        let sDate = util.getColData(sName,data);
        option.series[i].data = sDate;
    }
};
util.analysisHbarChart = function(option,data){
    let yName = option.yAxis[0].data;
    option.yAxis[0].data = util.getColData(yName,data);
    for(let i = 0; i<option.series.length; i++){
        let sName = option.series[i].data;
        let sDate = util.getColData(sName,data);
        option.series[i].data = sDate;
    }
}
util.analysisCirChart = function(option,data){
    for(let s in option.series){
        let nameCol = option.series[s].data.name;
        let valueCol = option.series[s].data.value;
        let nameList= util.getColData(nameCol,data);
        let valueList = util.getColData(valueCol,data);
        option.series[s].data = [];
        for (let i in nameList){
            option.series[s].data.push({name:nameList[i],value:valueList[i]})
        }
    } 
}

util.analysisNothemeGridChart = function(option,data){
    util.analysisGridChart(option,data);
    option.color = util.getColors(option.color);
};

util.analysisNothemeCirChart = function(option,data){
    util.analysisCirChart(option,data);
    option.color = util.getColors(option.color);
};
util.analysisNothemeHBarChart = function(option,data){
    util.analysisHbarChart(option,data);
    option.color = util.getColors(option.color);
};
util.analysisCMBBar = function(option,data){
    let xName = option.xAxis[0].data;
    let yName = option.series[0].data;
    let xData = util.getColData(xName,data);
    let yData = util.getColData(yName,data);
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
};

util.analysisCMBFourQuadrant = function(eoption,data){
    let name = eoption.series[0].data.name;
    let valueName1 = eoption.series[0].data.value[0];
    let valueName2 = eoption.series[0].data.value[1];
    let xThreshold = Number(eoption.series[0].markLine.data[0].xAxis);
    let yThreshold = Number(eoption.series[0].markLine.data[1].yAxis);
    let seriesData1 = [];   //第一象限
    let seriesData2 = [];   //第二象限
    let seriesData3 = [];   //第三象限
    let seriesData4 = [];   //第四象限
    let nameData = util.getColData(name,data);
    let value1 = util.getColData(valueName1,data);
    let value2 = util.getColData(valueName2,data);
    for (let i=0; i<nameData.length; i++){
        if (value1[i] <= xThreshold) {
            if(value2[i] > yThreshold){
                seriesData1.push({name:nameData[i],value:[value1[i],value2[i]]});
            } else {
                seriesData3.push({name:nameData[i],value:[value1[i],value2[i]]});
            }
        } else {
            if(value2[i] > yThreshold){
                seriesData2.push({name:nameData[i],value:[value1[i],value2[i]]});
            } else {
                seriesData4.push({name:nameData[i],value:[value1[i],value2[i]]});
            }
        }
    }
    eoption.series[0].data = seriesData1;
    eoption.series[1].data = seriesData2;
    eoption.series[2].data = seriesData3;
    eoption.series[3].data = seriesData4;

    let seriesLabel = {
        show: true,
        position: 'bottom',
        distance : 10,
        color : '#ccc',
        formatter: function(params) {
            return params.name
        },
    };

    for(let j=0; j<4; j++){
        eoption.series[j].label = seriesLabel;
    };
    eoption.tooltip.formatter = function(params){
        return params.name+': '+params.value[0]+' , '+params.value[1]
    }
};

util.analysisCMBHBar = function(option,data){
    let yName = option.yAxis[0].data;
    option.yAxis[0].data = util.getColData(yName,data);
    let xName = option.series[0].data;
    let xDate = util.getColData(xName,data);
    option.series[0].data = xDate;
    let selectedColor = option.series[0].itemStyle.normal.color;
    option.series[0].itemStyle.normal.color = util.getCMBHbarColor(selectedColor);
};

util.analysisCMBGuage = function(option,data){
    let dataName = option.series[0].data[0].value;
    let value = util.getColData(dataName,data);
    if(value && value.length >0){
        option.series[0].data[0].value = value;
    }
    let max = option.series[0].max;
    let min = option.series[0].min;
    option.series[0].axisLabel.formatter = function (value) {
        if(value == min || value == max){
            return value
        } else {
            return ''
        }
    }
}
util.getColors = function(selectedColor){
    return ChartTemplate.COLORS[selectedColor].color
}
util.getCMBHbarColor = function(selectedColor){
    switch(selectedColor){
        case 'red':
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#e12945'
            }, {
                offset: 1,
                color: '#f7734e'
            }]);
        case 'green':
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#01babc'
            }, {
                offset: 1,
                color: '#96d668'
            }]);
        case 'blue':
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: '#7049f0'
            }, {
                offset: 1,
                color: '#1a98f8'
            }]);
    }
}
util.analysisNothemeOption = function(eoption,data,type){
    switch (type){
        case 'Bar':
            util.analysisNothemeGridChart(eoption,data);
            break;
        case 'Pie':
            util.analysisNothemeCirChart(eoption,data);
            break;
        case 'Stack':
            util.analysisNothemeGridChart(eoption,data);
            break;
        case 'HBar':
            util.analysisNothemeHBarChart(eoption,data)
    }
},

util.analysisCMBthemeOption = function(eoption,data,type){
    switch (type){
        case 'Bar':
            util.analysisCMBBar(eoption,data);
            break;
        case 'Stack':
            util.analysisGridChart(eoption,data);
            break;
        case 'Guage':
            util.analysisCMBGuage(eoption,data);
        case 'FourQuadrant':
            util.analysisCMBFourQuadrant(eoption,data);
        case 'HBar':
            util.analysisCMBHBar(eoption,data);
    }
},

util.attachData = function(eoption,data,type,theme){
    switch(theme){
        case 0 :
            util.analysisNothemeOption(eoption,data,type);
            break;
        case 1:
            util.analysisCMBthemeOption(eoption,data,type);
    }
}
export default util;
