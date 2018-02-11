<template>
    <Row>
        <Col span="12">
            <DatePicker v-if="showOptions.date" type="date" placement="bottom-end" placeholder="Select date" style="width: 200px" :value="conditions.date" format="yyyy-MM-dd" @on-change="conditions.date=$event"></DatePicker>
        </Col>
    </Row>
</template>

<script>

export default {
  name: 'conditions',
  props:['showOptions'],
  data(){
      return {
        conditions:{date: new Date()}
      }
    }, 
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
