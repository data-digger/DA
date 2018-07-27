<template>
    <div class="card-item">
        <Row type="flex" align="middle" justify="center">
            <Col span='4'>
               <div class="circle" 
               :style="{width : circleSize, 
                        height : circleSize,
                        fontSize: circleTextSize, 
                        backgroundColor: circleColor,
                        lineHeight: circleSize}">{{circleText}}</div>
            </Col>
            <Col span='20'>
                <Row type="flex" align="middle">
                    <Col span='18'>
                        <p class='':style="{fontSize: textSize}">
                            <Strong><big class="title-text">{{title}} </big></Strong>
                            <small class="sub-title-text">{{subTitle}}</small>
                        </p>
                    </Col>
                    <Col span='6' style="text-align:right"><small class="day-text">{{dayTime}}</small></Col>
                </Row>
                <Row type="flex" align="middle">
                   <p class="detail-text" :style="{fontSize: textSize}">{{detail}}</p>
                </Row>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
        circleText :{
            type:[String,Number],
            default: 10
        },
        title:{
            type:String,
            default:'深圳'
        },
        subTitle:{
            type:String,
            default:'普通职员',
        },
        detail:{
            type:String,
            default:'需更详细的分类'
        },
        dayTime:{
            type:String,
            defaule:'1 day ago'
        },
        circleSize: {
            type: String,
            default: '40px'
        },
        circleTextSize: {
            type: String,
            default: '20px'
        },
        textSize:{
            type: String,
            default: '12px'
        }
    },
    computed: {
      circleColor:function(){
          if(Number(this.circleText) >= 10){
              return "crimson"
          } else {
              return "rgb(3, 247, 174)"
          }
      }
    },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card-item{
      padding: 5px;
      width: 100%;
      border-bottom: 0.5px solid #1783e7;
      background-color:transparent;
  }
  .circle{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: rgb(3, 247, 174);
    text-align:center;
    line-height:35px;
    font-size:20px;
    font-weight: 400;
    color: #ffffff;
    margin: 3px;
  }
  .detail-text{
      color: #ffffff;
      font-size: 90%;
      font-weight: bold;
      margin-top: 3px
  }
  .title-text{
      color: #ffffff;
  }
  .sub-title-text{
      color: #cccccc
  }
  .day-text{
      color: #1783e7;
  }
  </style>