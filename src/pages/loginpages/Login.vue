<template>
  <div id='login'>
      <!-- <div class='logo'>BI.OFFICE</div> -->
      <div class='content'>
           <div class="form-title">
              <span class="form-title">欢迎.</span>
              <span class="form-subtitle">请登录...</span>
          </div>
          <div class="form-group" prop="name">
            <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
            <input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="Username" name="username" v-model="ruleForm.name"/>
          </div>
          <div class="form-group" prop="pass">
            <input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="Password" name="password" v-model="ruleForm.pass"/>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-block uppercase" @click="submitForm('ruleForm')">登录</button>
          </div>
          <div class="form-actions">
            <div class="pull-left">
              <label class="rememberme check">
              <input type="checkbox" name="remember" value="1"/>是否保存用户信息 </label>
            </div>
          </div>
        </form>
      </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
        ruleForm: {
        name: "", //账户
        pass: "", //密码
      },
    }
  },
  methods:{
    submitForm: function(){
      if(this.ruleForm.name == "caianqi" && this.ruleForm.pass =="123"){
        this.$router.push({ 
          path: "/Home/Create" ,
          name: "Create"
        });
      }else{
        this.toastr.info("www");
      }  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login{
  background-color: #5c97bd;
  padding-top: 3%;
  width: 100%;
  height: 100%;
  background:url(./../../assets/img/logo-background.png) no-repeat;
  background-size:cover
}
.logo {
  color: white;
  font-size: 25px;
  opacity: 0.8;
}
.content {
  width: 400px;
  margin: 0 35%;
}
.content div{
  margin-top: 30px;
}
.content .pull-left{
  margin-top: -10px;
}
#login .content .form-control {
  border: none;
  opacity: 0.8;
  height: 43px;
}
#login .btn-primary {
  background-color: #5995bb;
  border: 1px solid #72a9cc;
  color: #8fc4e5;
  font-weight: 600;
  padding: 10px 25px !important;
}
#login .content .check {
  color: #fff !important;
  font-size: 13px;
}
.form-title {
  text-align: left;
  font-size: 18px;
  color: white;
  opacity: 0.8;
}
</style>
