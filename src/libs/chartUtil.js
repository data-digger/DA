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
function getColData(colName,data){
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
function analysisGridChart(option,data){
    let xName = option.xAxis.data;
    let series = [];
    option.xAxis.data = getColData(xName,data);
    for(let i = 0; i<option.series.length; i++){
        let sName = option.series[i].data;
        let sDate = getColData(sName,data);
        option.series[i].data = sDate;
    }
}
function analysisHbarChart(option,data){
    let yName = option.yAxis.data;
    option.yAxis.data = getColData(yName,data);
    for(let i = 0; i<option.series.length; i++){
        let sName = option.series[i].data;
        let sDate = getColData(sName,data);
        option.series[i].data = sDate;
    }
}

function analysisCirChart(option,data){
    for(let s in option.series){
        let nameCol = option.series[s].data.name;
        let valueCol = option.series[s].data.value;
        let nameList= getColData(nameCol,data);
        let valueList = getColData(valueCol,data);
        option.series[s].data = [];
        for (let i in nameList){
            option.series[s].data.push({name:nameList[i],value:valueList[i]})
        }
    } 
}

function analysisCardChart(option,data){
    let colName = validColName(option.data);
    let cntData = getColData(colName,data);
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
