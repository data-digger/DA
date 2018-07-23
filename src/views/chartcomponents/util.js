import ChartTemplate from './../../libs/ChartTemplate.js'
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

}
util.analysisNothemeGridChart = function(option,data){
    let xName = option.xAxis.data;
    let series = [];
    option.xAxis.data = util.getColData(xName,data);
    for(let i = 0; i<option.series.length; i++){
        let sName = option.series[i].data;
        let sDate = util.getColData(sName,data);
        option.series[i].data = sDate;
    }
    option.color = util.getColors(option.color);
},

util.analysisNothemeCirChart = function(option,data){
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
    option.color = util.getColors(option.color);
},
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
},
util.getColors = function(selectedColor){
    return ChartTemplate.COLORS[selectedColor].color
}
util.analysisNothemeOption = function(eoption,data,type){
    switch (type){
        case 'Bar':
            util.analysisNothemeGridChart(eoption,data);
            break;
        case 'Pie':
            util.analysisNothemeCirChart(eoption,data);
            break;
    }
},

util.analysisCMBthemeOption = function(eoption,data,type){
    switch (type){
        case 'Bar':
            util.analysisCMBBar(eoption,data);
            break;
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
