function validColName(colName){
    let regex = /^@/;
    if(regex.test(colName)){
        return colName.substring(1);
    } else {
        return colName
    }
}
function getdisplayColData(colName,data){
    let header = data.stringHeaders;
    let tdata = data.data;
    let cid = header.indexOf(colName);
    if(cid < 0){ //所给的列名不存在，返回null值
        return [];
    }else {
        let re=[];
        for(let i in tdata){
            re.push(tdata[i][cid].displayValue)
        }
        return re;
    }

}
function getIntColData(colName,data){
    let header = data.stringHeaders;
    let tdata = data.data;
    let cid = header.indexOf(colName);
    if(cid < 0){ //所给的列名不存在，返回null值
        return [];
    }else {
        let re=[];
        for(let i in tdata){
            re.push(tdata[i][cid].intValue)
        }
        return re;
    }

}
function analysisGridChart(option,data){
    let xName = validColName(option.xAxis.data);
    let yName = [];
    for(let s in option.series){
        yName.push(validColName(option.series[s].name))
    }
    option.legend.data = yName;
    option.xAxis.data = getdisplayColData(xName,data);
    for(let i = 0; i<yName.length; i++){
        option.series[i].name = yName[i];
        option.series[i].data = getdisplayColData(yName[i],data);
    }
}
function analysisHbarChart(option,data){
    let yName = validColName(option.yAxis.data);
    let xName = [];
    for(let s in option.series){
        xName.push(validColName(option.series[s].name))
    }
    option.legend.data = xName;
    option.yAxis.data = getdisplayColData(yName,data);
    for(let i = 0; i<xName.length; i++){
        option.series[i].name = xName[i];
        option.series[i].data = getdisplayColData(xName[i],data);
    }
}

function analysisCirChart(option,data){
    for(let s in option.series){
        let nameCol = validColName(option.series[s].data[0].name);
        let valueCol = validColName(option.series[s].data[0].value);
        let nameList= getdisplayColData(nameCol,data);
        let valueList = getdisplayColData(valueCol,data);
        option.series[s].data = [];
        for (let i in nameList){
            option.series[s].data.push({name:nameList[i],value:valueList[i]})
        }
    } 
}

function analysisCardChart(option,data){
    let colName = validColName(option.data);
    let cntData = getIntColData(colName,data);
    if(cntData.length>0){
        option.data = parseInt(cntData[0]);
    } else {
        option.data = 0;
    }
}

let chartUtil = {

};
chartUtil.analysis = function (option,type,data) {
    if(type == 'Card'){
    analysisCardChart(option,data)
    }
   if(type == 'Line'){
    analysisGridChart(option,data)
   }
   if(type == 'Bar'){
    analysisGridChart(option,data)
   }
   if(type == 'Pie'){
    analysisCirChart(option,data)
   }
   if(type == 'HBar'){
    analysisHbarChart(option,data)
   }
};

export default chartUtil;
