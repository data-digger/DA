<template>
  <div>
    <Row style='background-color:red;'>
        <Col span="12" style='background-color:yellow'>col-12</Col>
        <Col span="12" style='background-color:yellow'>col-12</Col>
    </Row>
    <Row>
        <Col span="8" style='background-color:yellow'>col-8</Col>
        <Col span="8" style='background-color:yellow'>col-8</Col>
        <Col span="8" style='background-color:yellow'>col-8</Col>
    </Row>
  </div>

</template>

<script>
    export default {
        data(){
            return{
                id:3
            }
        }
    }
</script>

<style scoped>
</style>
