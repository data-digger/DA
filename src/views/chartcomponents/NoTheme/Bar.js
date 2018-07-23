import ChartTemplate from './../../../libs/ChartTemplate.js'
let Bar = {
    option:{
        color:ChartTemplate.COLORS[0].color,
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
        grid: {
            left: '3%',
            right: '10%',
            bottom: '3%',
            top:'10%',
            containLabel: true
        },
        calculable : true,
        xAxis : {
                type : 'category',
                axisLabel: {  
                    interval:0,  
                    rotate:40  
                },
                name:'',
                data : '',
            },
        yAxis : [
            {
                type : 'value',
            }
        ],                    
        series : [
        ]
    },
};
Bar.getOption = function (){
    return Bar.option;
};
Bar.setOption = function(option){
    Bar.option = option;
};
Bar.buildOption = function (xName,xAlias,seriesName,colorSelected,selectdOption) {
    selectdOption.xAxis.name = xAlias;
    selectdOption.xAxis.data = xName;
    selectdOption.color = ChartTemplate.COLORS[colorSelected].color;
    selectdOption.series = [];
    for(let i in seriesName){
        selectdOption.series.push({name:seriesName[i].alias,data:seriesName[i].name,type: 'bar'});
    }

};

Bar.attachData = function(option,data,getColData){
    let xName = option.xAxis.data;
    let series = [];
    option.xAxis.data = getColData(xName,data);
    for(let i = 0; i<option.series.length; i++){
        let sName = option.series[i].data;
        let sDate = getColData(sName,data);
        option.series[i].data = sDate;
    }

}

export default Bar;
