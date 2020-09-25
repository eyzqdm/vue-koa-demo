<template><!-- 登录页面·-->
  <div class="LoginWrap">
    <a-card :bordered="true" >
      <div class="LoginRight">
        <div class="LoginTitle">知否 个人账号登陆</div>
        <div class="LoginForm">
                <a-form
                  id="components-form-demo-normal-login"
                  :form="form1"
                  class="login-form">
                    <a-form-item>
                      <span>用户名</span>
                      <a-input
                        ref="input"
                        v-decorator="['username']"
                        placeholder="请输入用户名">
                      </a-input>
                    </a-form-item>
                    <a-form-item >
                      <span>密码</span>
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
                      <a-button type="primary" html-type="submit" class="login-form-button" @click="PasswordLogin">
                          登陆
                      </a-button>
                    </a-form-item>
                  </a-form>
        </div>
        <div class="LoginBottom">
          <span>还没有账号？</span>
          <a @click="ToRegister">立即注册</a>
        </div>
      </div>
    </a-card>
    <div>
        <a-modal v-model="visible" title="">
        {{msg}}
        </a-modal>
    </div>
  </div>
</template>

<script>
// import Api from '@/api/login.js'
import axios from 'axios'
export default {
    data () {
        return {
           form1: this.$form.createForm(this, { name: 'form1' }), // 区分表单避免互相干扰
           form2: this.$form.createForm(this, { name: 'form2' }),
           formItemLayout: '',
           btnTitle: '获取验证码',
           msg: '',
           visible: false,
           isRemember: false,
           phone: '',
           password: ''
        }
    },
    beforeCreate (){
      sessionStorage.clear()
    },
    mounted (){
      this.$store.commit('upDateLoading', false)
      const phone = localStorage.getItem('phone')
      if (phone !== null)
      {
       this.isRemember = true
       const password = localStorage.getItem(`${phone}`)
       this.form1.setFieldsValue({
           phone: phone,
           password: password
         })
      }
      else {
       this.isRemember = false
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
        this.$refs.Btn.disabled = true // 禁用按钮
        let time = 60
        const timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.$refs.Btn.disabled = false // 解除按钮禁用
          this.btnTitle = '获取验证码'
        } else {
          this.btnTitle = time + '秒后重试'
          time--
        }
      }, 1000)
     },
  PasswordLogin (e){
      e.preventDefault()
       this.form1.validateFields(async (err, values) => {
        values.captcha = ''
          if (!err) {
          const { data: res } = await axios.post('/login', values)
            if (res.code === 0)
            {
              this.$message.success('登陆成功！')
              sessionStorage.setItem('isLogin', 'true')
              sessionStorage.setItem('uid', res.data.id)
              sessionStorage.setItem('token', res.data.token)
              console.log(res.data.token)
              this.$router.push('/home')
            }
            else {
              this.$message.error('登陆失败！')
            }
          }
          else {
            console.log(err)
          }
        })
      },
    ToRegister (){ // 跳转到注册页面
        this.$router.push('/register')
        },
/*     getCaptcha (){
        this.form2.validateFields(['phone'], { force: true }, async (err, values) => {
            if (!err) {
              const { data: res } = await Api.getCaptcha(values)
              if (res.code === 200)
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
   /*  CaptchaLogin (e){
        e.preventDefault()
          this.form2.validateFields(async (err, values) => {
             values.password = ''
            if (!err) {
              const { data: res } = await Api.login(values)
              if (res.code === 200)
              {
                this.$message.success('登陆成功！')
                sessionStorage.setItem('token', res.data.access_token)
                sessionStorage.setItem('avatarUrl', res.data.userInfo.avatarUrl)
                sessionStorage.setItem('name', res.data.userInfo.nickName)
                this.$router.push('/home')
              }
              else {
                this.$error({
                message: '错误',
                description:
                  res.msg
                })
              }
            }
          })
        }, */
    onSearch (){
        }
      }
}
</script>

<style lang="less" scoped>
.LoginWrap{
    height: 400px;
    width: 500px;
    position:absolute;
    top:45%;
    left:56%;
    margin-top: -271px;
    margin-left: -395px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(221, 221, 221, 1);
}

.LoginRight{
    height: 500px;
    width: 100%;
    float: right;
    position: relative;
}
.LoginTitle{
    margin-top: 20px;
    margin-bottom: 25px;
    text-align: center;
    font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
    font-weight: 650;
    font-style: normal;
    font-size: 24px;
    color: #1890FF;
}
.LoginForm{
  // position: absolute;
  position: relative;
  left:11%;
  width:350px;
  .RememberPassword{
    height: 30px;
  }
}
.login-form {
  width: 350px;
  span{
    float: left;
  }
  .login-form-button{
    margin-top: 15px;
  }
}
.LoginBottom{
  margin-left: 152px;
  margin-top:5px;
}
.ant-form-item-control{
  margin-top: -15px;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
