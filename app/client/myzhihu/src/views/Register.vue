<template><!-- 注册页面·-->
  <div class="LoginWrap">
    <a-card :bordered="true" >
      <div class="LoginLeft">
        <div class="Logo">
        </div>
        <div class="Picture">
        </div>
      </div>
      <div class="LoginRight">
        <div class="LoginTitle">个人账号注册</div>
        <div class="LoginForm">
            <a-form
              id="components-form-demo-normal-login"
              :form="form"
              class="login-form"
              @submit="handleSubmit">
              <a-form-item>
                <span>姓名或昵称</span>
                  <a-input
                    v-decorator="[
                    'username',
                    { rules: [{ required: true, message: '请输入您的姓名!' }] },
                    ]"
                    placeholder="请输入姓名或昵称">
                  </a-input>
              </a-form-item>
                <a-form-item>
                  <span>设置密码</span>
                  <a-input
                    v-decorator="[
                    'password',
                    { rules: [{ required: true, message: '请输入密码!' }] },
                    ]"
                    type="password"
                    placeholder="请输入密码">
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <span>重复密码</span>
                  <a-input
                    v-decorator="[
                    'repassword',
                    { rules: [{ required: true, message: '请再次输入密码!' }] },
                    ]"
                    type="password"
                    placeholder="请输入密码">
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit" class="login-form-button">
                      注册
                  </a-button>
                </a-form-item>
              </a-form>
        </div>
        <div class="LoginBottom">
          <span>我已有账号，</span>
          <a @click="ToLogin">直接登录</a>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
// import Api from '@/api/Register.js'
import axios from 'axios'
export default {
    data () {
        return {
           form: this.$form.createForm(this),
           btnTitle: '获取验证码'
        }
    },
    methods: {
      checkphone (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入手机号'))
        }
        else {
          var reg = /(?:^1[3456789]|^9[28])\d{9}$/
          if (reg.test(value)) {
            callback()
            return true
          }
          else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      },
     checkcode (rule, value, callback) {
        if (!value) {
          return callback(new Error('请输入验证码'))
        }
        else {
          var reg = /^\d{6}$/
          if (reg.test(value)) {
            callback()
          }
          else {
            return callback(new Error('请输入6位数字验证码'))
          }
        }
      },
      validateBtn (){
        // 倒计时
        this.$refs.Btn.disabled = true
        let time = 60
        const timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.$refs.Btn.disabled = false
          this.btnTitle = '获取验证码'
        } else {
          this.btnTitle = time + '秒后重试'
          time--
        }
      }, 1000)
     },
 /*     getCaptcha (){
         this.form.validateFields(['phone'], { force: true }, async (err, values) => {
           console.log(values)
            if (!err) {
              const res = await Api.getCaptcha(values)
              console.log(res)
              if (res.status === 200)
              {
                this.validateBtn() // 展示倒计时
              }
              else {
                console.log(res.msg)
              }
            }
            else {
              console.log(err)
            }
          })
      }, */
      ToLogin (){
      this.$router.push('./login')
      },
      LoginMoedChange (){
      },
      handleSubmit (e){
       e.preventDefault()
          this.form.validateFields(async (err, values) => {
            console.log(values)
            if (!err) {
            const { data: res } = await axios.post('/register', values
            )
            console.log(res.data)
               if (res.code === 0)
              {
                this.$message.success('注册成功！')
                this.$router.push('./home')
              }
              else {
                 this.$message.error('注册失败！')
              }
            }
        })
      }
   }

}
</script>
<style lang="less" scoped>
.LoginWrap{
    height: 542px;
    width: 790px;
    position:absolute;
    top:50%;
    left:50%;
    margin-top: -271px;
    margin-left: -395px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(221, 221, 221, 1);
}
.LoginLeft{
    float: left;
    height: 540px;
    background-color: rgba(247, 252, 252, 1);
    border-right: 1px solid rgba(221, 221, 221, 1);
     .Logo{
     width: 178px;
     height: 67px;
     margin:0 auto;
     margin-bottom:20px;
     margin-top:50px;
      img{
     width: 100%;
     }
    }
    .Picture{
      width: 338px;
      height: 343px;
      width: 100%;
    }
}
.LoginRight{
    height: 540px;
    width: 440px;
    float: right;
    position: relative;
}
.LoginTitle{
    margin-top: 20px;
   // margin-bottom: 25px;
    text-align: center;
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
    font-weight: 650;
    font-style: normal;
    font-size: 24px;
    color: #1890FF;
}
.login-form {
  width: 350px;
  margin: 0 auto;
  span{
    float: left;
  }
}
.ant-form-item-control{
  margin-top: -20px;
}
.LoginBottom{
    margin-top: 0px;
    margin-bottom: 0px;
    position: absolute;
    left: 34%;
}
.ant-form-item{
    margin-bottom: 8px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
