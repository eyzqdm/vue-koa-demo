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
  PasswordLogin (e){
      e.preventDefault()
       this.form1.validateFields(async (err, values) => {
        values.captcha = ''
          if (!err) {
          const { data: res } = await axios.post('/login', values)
          console.log(res.msg)
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
              this.$message.error(`${res.msg}`)
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
    height: 400px;
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
