function validColName(colName){
    let regex = /^@/;
    if(regex.test(colName)){
        return colName.substring(1);
    } else {
        return colName
    }
}
function getColData(colName,data){
    let header = data.stringHeaders;
    let tdata = data.data;
    let cid = header.indexOf(colName);
    if(cid < 0){ //所给的列名不存在，返回null值
        return [null];
    }else {
        let re=[];
        for(let i in tdata){
            re.push(tdata[i][cid].displayValue)
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
    option.xAxis.data = getColData(xName,data);
    for(let i = 0; i<yName.length; i++){
        option.series[i].name = yName[i];
        option.series[i].data = getColData(yName[i],data);
    }
}

function analysisCirChart(option,data){
    for(let s in option.series){
        let nameCol = validColName(option.series[s].data[0].name);
        let valueCol = validColName(option.series[s].data[0].value);
        let nameList= getColData(nameCol,data);
        let valueList = getColData(valueCol,data);
        option.series[s].data = [];
        for (let i in nameList){
            option.series[s].data.push({name:nameList[i],value:valueList[i]})
        }
    } 
}
let chartUtil = {

};
chartUtil.analysis = function (option,type,data) {
   if(type == 'Line'){
    analysisGridChart(option,data)
   }
   if(type == 'Bar'){
    analysisGridChart(option,data)
   }
   if(type == 'Pie'){
    analysisCirChart(option,data)
   }
};

export default chartUtil;
