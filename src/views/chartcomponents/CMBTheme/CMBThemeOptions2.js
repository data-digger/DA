/*************暗色版 *************/
//柱状图1
var barOption={
    //backgroundColor: "#141f56",
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
    },
    xAxis: [{
        type: 'category',
        interval:0, //x轴强制显示所有标签
        axisTick: {
            show: false
        },
        axisLine: {
            show: false,
        },
        axisLabel: {
            textStyle: {
                color: function(value){
                    if(value == '招商银行'){
                        return '#ffffff'
                    } else {
                        return '#c1c1c1'
                    }
                },
                fontWeight: 'bolder',
                fontSize: '12',
                textAlign:'left',
            },
            formatter :function(params){
                var newParamsName = "";
                var provideNumber = 2; //一行显示2个字
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
        data: ['招商银行','中信银行','工商银行','中国银行','平安银行','建设银行','广发银行','浦发银行','民生银行','交通银行'],
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
        data:['招商银行','中信银行','工商银行','中国银行','平安银行','建设银行','广发银行','浦发银行','民生银行','交通银行'],
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
                    color: function(params){
                        if(params.name == '招商银行'){
                            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#68cbff'
                    }, {
                        offset: 1,
                        color: '#1d74f7'
                    }])
                        } else {
                            return '#1b467e'
                        }
                    },
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
                    formatter: function(params) {
                                    if(params.name == "招商银行"){
                                        return '{a|' + params.value + '}';
                                    } else {
                                        return '{b|' + params.value + '}';
                                    }
                                },
                    rich: {
                        a: {
                            color: '#ffffff', 

                        },
                        b: {
                            color: '#c1c1c1',
                        }
                    },
                    textStyle: {
                        fontStyle: 'normal',
                        fontWeight: 'bolder',
                        fontFamily: '微软雅黑',
                        textAlign: 'left',
                        fontSize: 15,
                    },
                },
            },
            zlevel: 2,
            barWidth: '30%',
            data: [51,48,28,27,25,21,14,13,0,0],
        },
        {//背景柱图配置
            name: '',
            type: 'bar',
            xAxisIndex: 1,
            zlevel: 1,
            itemStyle: {
                normal: {
                    color: 'rgba(28,55,91,0.2)',
                    borderWidth: 0,
                    barBorderRadius: [50,50,0,0],
                }
            },
            barWidth: '30%',
            data: [50,50,50,50,50,50,50,50,50,50],
        }]
};

//堆叠图

var stackOption = {
    //backgroundColor: "#141f56",
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        show : true,
        textStyle: {
                    color: '#ffffff',
                    fontWeight: 'bolder',
                    fontSize: '12',
                    textAlign:'left',
        },
    },
    grid: {
        left: '3%',
        right: '10%',
        top: '10%',
        bottom: '10%',
        containLabel: true
    },
    xAxis: {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    inside: false,
                    interval:0, //x轴强制显示所有标签
                    textStyle: {
                        color: '#ffffff',
                        fontWeight: 'bolder',
                        fontSize: '12',
                        textAlign:'left',
                    },
                },
                data: ['1月','2月','3月','4月','5月']
            },

    yAxis: [
                {
                type: 'value',
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
                                    fontWeight: 'bolder',
                                    fontSize: '12',
                                    textAlign:'left',
                                },
                            },
                            splitLine: {
                                show: false,
                            },
                            splitArea: {
                                show: false
                            },
                        }
            ],
    series: [{
        name: '贬损者',
        data: [11,12,13,15,20],
        type: 'bar',
        barWidth: '70%',
        stack: 'group1', 
        color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#d85843'
                    }, 
                    {
                        offset: 0.5,
                        color: '#fb837f'
                    },
                    {
                        offset: 1,
                        color: '#d85843'
                    }]),
        label: {
            normal: {
            show: true,
            position: 'inside',
            fontWeight: 'bolder',
            color:'#ffffff',
            fontSize:'15',
            formatter:function(params){
                return params.value+'%'
            },
            
            }
        },
        itemStyle :{
            normal: {
                show: true,
                barBorderRadius: [0,0,10,10],
                borderWidth: 0,
            },
        }
    },
    {
        name: '中立者',
        data: [27,30,29,25,20],
        type: 'bar',
        barWidth: '70%',
        stack: 'group1',  
        color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#f7d816'
                    }, 
                    {
                        offset: 0.5,
                        color: '#f7ed6e'
                    },
                    {
                        offset: 1,
                        color: '#f7d816'
                    }]),
        label: {
            normal: {
            show: true,
            position: 'inside',
            fontWeight: 'bolder',
            color:'#bb7b00',
            fontSize:'15',
            formatter:function(params){
                return params.value+'%'
            },
            
            }
        }
    },
    {
        name: '推荐者',
        data: [62,58,58,60,60],
        type: 'bar',
        barWidth: '70%',
        stack: 'group1',
        color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#2fc08b'
                    }, 
                    {
                        offset: 0.5,
                        color: '#54cfa8'
                    },{
                        offset: 1,
                        color: '#2fc08b'
                    }]),
        label: {
            normal: {
            show: true,
            color:'#ffffff',
            fontSize:'15',
            position: 'inside',
            fontWeight: 'bolder',
            formatter:function(params){
                return params.value+'%'
            },
            
            }
        },
        itemStyle :{
            normal: {
                show: true,
                barBorderRadius: [10,10,0,0],
                borderWidth: 0,
            },
        }
    }]
};

//仪表盘2
var option = {
    backgroundColor: "#141f56",
    series: [
        {
            name: 'NPS',
            title: {
                color: "#ffffff",
                fontSize: 25,
                fontWeight:'bolder',
                offsetCenter: [0, '-55%']
            },
            type: 'gauge',
            radius: '60%',
            min: -100,
            max: 100,
            splitNumber: 1, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
                show: false,
                lineStyle: {
                    color: [
                    [0.6, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#f64545'
                    }, {
                        offset: 1,
                        color: '#fc837b'
                    }])],
                    [0.8, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#ffb501'
                    }, {
                        offset: 1,
                        color: '#ffff00'
                    }])],
                    [1, new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                        offset: 0,
                        color: '#33d0a5'
                    }, {
                        offset: 1,
                        color: '#60e7b8'
                    }])],
                ],
                    width: 30
                }
            },
             pointer: {
                show: true,
                length: '75%',
            },
            itemStyle:{
                    color:'#ffffff'
            },
            detail: {
                offsetCenter: [0, '60%'],
                fontSize: 70,
                fontWeight: 'bolder',
                color: "#ffffff",
            },
            splitLine: {
                show: false,
            },
            axisTick: {
            show: false,
            splitNumber: 0

             },
            axisLabel: {
                show: true,
                distance:'-60',
                textStyle: {
                fontWeight: 'bolder',
                fontSize: 15,
                color:'#ffffff'
                },
                formatter: function (value) {
                    if(value === -100 || value === 100){
                        return value
                    } else {
                        return ''
                    }
                }
            },
            data: [{
                name: "NPS",
                value: 52
            }]
        }
    ]
};

//条形图
var option = {
    //backgroundColor: "#141f56",
    tooltip: {
        show: false,
    },
    legend: {
        show:false,
    },
    grid: {
        borderWidth: 0,
        left: '10%',
        right: '5%',
        bottom: '15%',
        top:'10%',
        textStyle: {
            color: "#fff"
        }
    },
    yAxis: [{
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
                color: function(value){
                    if(value == "招商银行"){
                        return '#ffffff'
                    } else {
                        return "#666871"
                    }
                },
                fontWeight: 'bolder',
                fontSize: '12',
                textAlign:'left',
            },
        },
        data: ['招商银行','中信银行','工商银行','中国银行','平安银行','建设银行','广发银行','浦发银行','民生银行','交通银行'],
    }],
    xAxis: {
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
                    color: function(params){
                        if(params.name == '招商银行'){
                            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#ff403b' // 绿色：'#33d0a5'; 黄色'#ffbc01'
                            }, {
                                offset: 1,
                                color: '#fba485' // 绿色: '#85fbc8'；黄色'#fffe6c'
                            }])
                        } else {
                            return 'rgba(253,105,101,0.3)' //绿色'rgba(51,208,165,0.3)'；黄色'rgba(221,193,44,0.4)'
                        }
                    },
                    
                    barBorderRadius: 50,
                    borderWidth: 0,
                },
                emphasis: {
                    shadowBlur: 15,
                    shadowColor: 'rgba(253,105,101,0.7)' //绿色'rgba(51,208,165,0.7)'；黄色'rgba(221,193,44,0.7)'
                }
            },
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    formatter: function(params) {
                                    if(params.name == "招商银行"){
                                        return '{a|' + params.value + '%}';
                                    } else {
                                        return '{b|' + params.value + '%}';
                                    }
                                },
                    rich: {
                        a: {
                            color: '#ffffff', 

                        },
                        b: {
                            color: "#666871",
                        }
                    },
                    textStyle: {
                        fontStyle: 'normal',
                        fontWeight: 'bolder',
                        fontFamily: '微软雅黑',
                        textAlign: 'left',
                        fontSize: 15,
                    },
                },
            },
            barWidth: '40%',
            data: [25,22,19,17,14,13,10,9,7,5],
        }]
};

//四象限散点图
var option = {
    backgroundColor: "#141f56",
    color:['#fa524b','#58e6b2','#ffe032','#11b3ff'], //四象限散点图颜色(红、绿、黄、蓝)
    legend:{
        show:true,
        itemHeight:10,
        textStyle:{
                color:'#8489a2'
            },
    },
    grid:{
        show:true,
        borderWidth:0.8,
        left: '10%',
        right: '5%',
        bottom: '15%',
        top:'10%',
    },
    tooltip: {
        trigger: 'item',
        formatter:function(params){
            if(params.name){
                return params.name+'<br/>'+'满意度评价 : '
              + params.value[0]+'<br/> 重要性 : '+params.value[1]
            }
        },
        axisPointer: {
            show: false,
            // type: 'cross',
            // lineStyle: {
            //     type: 'dashed',
            //     width: 0
            // },
        label:{
            backgroundColor:'rgba(0,0,0,.5)'
        }
        },
    },
    xAxis: {
        name: '满意度评价',
        nameLocation:'middle',
        nameGap:30,
        nameTextStyle:{
                color:'#8489a2'
        },
        type: 'value',
        axisLabel: {
            formatter: '{value}',
            color:'#8489a2'
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(27,27,27,0.3)'
            }
        }
    },
    yAxis: {
        name: '重要性',
        type: 'value',
        nameLocation:'middle',
        //splitNumber:10,
        nameGap:40,
        nameTextStyle:{
                color:'#8489a2'
        },
        axisLabel: {
            formatter: function (value, index) {
                return value.toFixed(2);
            },
            color:'#8489a2'
        },
        splitLine: {
            show: false
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(27,27,27,0.3)'
            }
        }
    },
    series: [{ //第一象限
        name:'重要性高满意度低',
        type: 'effectScatter',
        data: [{name:'营销引流满意度',value:[36,0.35,8]},  //value包括3个值，依次为满意度评价、重要性和评价人数，圆点的大小跟评价人数进行判断
               {name:'财富产品查询',value:[50,0.42,10]}],
        symbolSize: function(value){
            return value[2]   //圆点size根据展示情况进行调整
        },
        label: {
            show: true,
            position: 'bottom',
            textStyle:{
                fontSize:10,
                color:'#8489a2'
            },
            distance : 10,
            formatter: function(params) {
                return params.name
            },
        },
        markLine: { 
            symbol: ['none', 'none'],//x轴和y轴阈值线
            label:{
                show:false
            },
            lineStyle: {
                color: 'rgba(125,125,125,0.5)',
                type: 'solid',
                width: 0.7,
            },
            data: [{
                xAxis: 70, //x轴阈值
            }, {
                yAxis: 0.3, //y轴阈值
            }]
        },
    },
    {
        name:'重要性高满意度高',
        type: 'effectScatter', //第二象限
        data: [{name:'营销引流满意度',value:[75,0.35,6]},
                {name:'财富产品查询',value:[81,0.4,8]}],
        symbolSize: function(value){
            return value[2]
        },
        label: {
            show: true,
            position: 'bottom',
            distance : 10,
            textStyle:{
                fontSize:10,
                color:'#8489a2'
            },
            formatter: function(params) {
                return params.name
            },
        },
    },
    {
        type: 'effectScatter',
        name:'重要性低满意度低',
        data: [{name:'营销引流满意度',value:[63,0.25,8]},
                {name:'财富产品查询',value:[24,0.22,8]}],
        symbolSize: function(value){
            return value[2]
        },
        label: {
            show: true,
            position: 'bottom',
            distance : 10,
            textStyle:{
                fontSize:10,
                color:'#8489a2'
            },
            formatter: function(params) {
                return params.name
            },
        },
    },
    {
        type: 'effectScatter',
        name:'重要性低满意度高',
        data: [{name:'营销引流满意度',value:[93,0.25,12]},
                {name:'财富产品查询',value:[87,0.22,8]}],
        symbolSize: function(value){
            return value[2]
        },
        label: {
            show: true,
            textStyle:{
                fontSize:10,
                color:'#8489a2'
            },
            position: 'bottom',
            distance : 10,
            formatter: function(params) {
                return params.name
            },
        },
    }
]
};

//柱状图2
var xAxisName = ['厦门','郑州','昆明','其他','沈阳',
                '厦门','郑州','昆明','其他','沈阳',
                '厦门','郑州','昆明','其他','沈阳',
                '厦门','哈尔滨','昆明','其他','沈阳',
                '厦门','郑州','昆明','其他','沈阳']
var xAxisData = []; //xAxisData为xAxisName的index
var data = [];
for (var i = 0; i < 26; i++) {
    xAxisData.push(i);
}

option = {
    backgroundColor: "#141f56",
    tooltip: {
        show:true,
        trigger: 'item',
        formatter:function(params){
            return xAxisName[params.dataIndex]+' : '+params.value
        },
    },
    grid:{
        left: '8%',
        right: '3%',
        top: '10%',
        bottom: '10%',
    },
    xAxis: [{
        axisLine: {
            show: false
        },
        axisLabel: {
                formatter: function (value, index) {
                    return xAxisName[value]
            },
            interval:0,
            textStyle: {
                fontSize:'12',
                color: '#8489a2'
            }  
        },
        splitLine: {
            show: false,
        },
        axisTick: {
            show: false
        },
        data: xAxisData  //[0,1,2,3...]
    }],
    visualMap: {
        show: false,
        min: 0,
        max: 26,  //xAxisData.length
        dimension: 0,  //visualMap映射到x轴维度
        inRange: {
            color: ['#5f64f4','#74d2ff','#5f64f4']
        }
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisLabel: {
            formatter: function (value, index) {
                return value.toFixed(1);
            },
            textStyle: {
                color: '#8489a2'
            }  
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#08263f'
            }
        },
        axisTick: {
            show: false
        }
    },
    series: [{
        name: '客户NPS分布',
        type: 'bar',
        data: [6,7,8,9,10,
            12,14,15,14,13,
            11,12,14,15,16,
            14,13,12,11,12,
            13,14,15,14,13],
        barCategoryGap:'60%',
        barWidth: '30%', //柱状图柱状大小
        itemStyle: {
            normal: {
                opacity: 1,
                barBorderRadius: 5,
                shadowBlur: 3,
                shadowColor: '#111'
            },
            emphasis: {
                    shadowBlur: 15,
                    //shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowColor: 'rgba(105,123, 214, 0.7)'
                }
        }
    },],
};

/*******************白色版 **********************/

//仪表盘1

var color = [
    [0.6, '#f20e02'],
    [0.75, '#fbe360'],
    [1, '#69d728'],
];
var option = {
    series: [{
            name: 'NPS',
            type: 'gauge',
            radius: '60%',
            min: -100,
            max: 100,
            splitNumber: 10, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
                lineStyle: {
                    color: color,
                    width: 30
                }
            },
            splitLine: {
                show: false,
            },
            axisTick: {
                show: false
            },
            pointer: {
                show: false,
                length: '68%',
            },
            itemStyle:{
                    color:'#444'
                },
            title: {
                show: false
            },
            axisLabel: {
                show: true,
                fontSize: 14,
                distance:'5',
            },
            detail: {
                show:false,
            },
            data: [{
                value: 52
            }]
        },
        {
            name: 'NPS',
            title: {
                color: "#444",
                fontSize: 30,
                fontWeight:700,
                offsetCenter: [0, '-55%']
            },
            type: 'gauge',
            radius: '40%',
            min: -100,
            max: 100,
            splitNumber: 0, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
                show: false,
                lineStyle: {
                    color: color,
                    width: 6
                }
            },
             pointer: {
                show: true,
                length: '100%',
            },
            itemStyle:{
                    color:'#444'
            },
            detail: {
                offsetCenter: [0, '80%'],
                fontSize: 70,
                fontWeight: 700,
                 color: "#444",
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false
            },
            data: [{
                name: "NPS",
                value: 52
            }]
        }
    ]
};

//仪表盘2

var option = {
    //backgroundColor: '#031845',
    title: [ {
        x: 'center',
        top: '59%',
        text: 'T2B',   //指针
        textStyle: {
            fontWeight: 'bolder',
            fontSize: 20,
            color: "#444"
        },
    }],
    tooltip: {
        show: true,


    },
    series: [{
        name: '',
        type: 'gauge',
        startAngle: 180, //调整仪表盘角度
        endAngle: 0, //调整仪表盘角度
        min:0,      //调整仪表盘最大值
        max:100,    //调整仪表盘最小值
        radius: '45%',
        center: ['50%', '55%'], 
        axisLine: {
            show: false,
            lineStyle: {
                width: 40,
                shadowBlur: 0,
                color: [
                    [0.5, '#91c7ae'],
                    [0.8, '#EFC631'],
                    [1, '#c23531'],
                ]
            }
        },
        axisTick: {
            show: false,
            splitNumber: 0

        },
        splitLine: {
            show: false,
            length: 20,

        },

        axisLabel: {
            show: true,
            distance:'-47',
            textStyle: {
            fontWeight: 700,
            fontSize: 15,
            color:'#444',
            },
            formatter: function (value) {
                if(value === 0 || value === 100){
                    return value
                } else {
                    return ''
                }
            }
        },
        pointer: {
            show: true,
            length: '58%',
        },
        detail: {
            show: true,
            offsetCenter: ['100%', '-120%'],
            textStyle: {
                fontSize: 25,
                fontWeight:'bolder',
                color:'#444'
            },
            formatter:'{value}%'
        },
        itemStyle: {
            normal: {
                color: "#444",

            }
        },
        data: [{
            value: 50
        }]
    },  ]
};

//仪表盘3

var color = [
    [0.6, '#f20e02'],
    [0.75, '#fbe360'],
    [1, '#69d728'],
];
var option = {
    series: [
        {
            name: 'NPS',
            title: {
                color: "#444",
                fontSize: 30,
                fontWeight:700,
                offsetCenter: [0, '-55%']
            },
            type: 'gauge',
            radius: '45%',
            min: -100,
            max: 100,
            splitNumber: 1, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
                show: false,
                lineStyle: {
                    color: color,
                    width: 30
                }
            },
             pointer: {
                show: true,
                length: '75%',
            },
            itemStyle:{
                    color:'#444'
            },
            detail: {
                offsetCenter: [0, '65%'],
                fontSize: 70,
                fontWeight: 700,
                 color: "#444",
            },
            splitLine: {
                show: false,
            },
            axisTick: {
            show: false,
            splitNumber: 0

             },
            axisLabel: {
                show: true,
                distance:'-55',
                textStyle: {
                fontWeight: 400,
                fontSize: 15,
                },
                formatter: function (value) {
                    if(value === -100 || value === 100){
                        return value
                    } else {
                        return ''
                    }
                }
            },
            data: [{
                name: "NPS",
                value: 52
            }]
        }
    ]
};

//柱状图1
var barOption={
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
                color: '#444',
                fontWeight: 'bolder',
                fontSize: '12',
                textAlign:'left',
            },
            formatter :function(params){
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
        data: ['招商银行','中信银行','工商银行','中国银行','平安银行','建设银行','广发银行','浦发银行','民生银行','交通银行'],
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
                        color: '#444',
                        fontStyle: 'normal',
                        fontWeight: 'bolder',
                        fontFamily: '微软雅黑',
                        textAlign: 'left',
                        fontSize: 12,
                    },
                },
            },
            zlevel: 2,
            barWidth: '30%',
            data: [51,48,28,27,25,21,14,13,0,0],
        }]
};


