<template>
     <div class="container">

        <div class="py-5 text-center">
            <p class="lead">
                爱就好比骑马和学法语，如果不趁年轻时学会，以后想学会就难了。
            </p>
            <p class="lead">
                Love is like riding or speaking French,if you don not learn it young, it's hard to get the trick of it
                later.
            </p>
        </div>

        <div class="heading text-right mb">
            <span href="" @click.prevent = toHome()>登录</span>
            <span> | </span>
            <span href="" @click.prevent = toRegister()>注册</span>
            <span v-if="isLogin === true">
                <span> | </span>
                <span  href="" @click.prevent = exit()>退出登录</span>
            </span>
        </div>

        <div class="mb">
            <div class="list" v-for="(item, index) in data" :key = index>
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{item.title}}</h5>
                    <small>{{item.createAt}}</small>
                </div>
                <p class="mb-1">
                {{item.content}}
                </p>
                <footer class="text-right">
                    <small @click = like(item)>赞{{item.like_count}}</small>
                    <small>回复{{item.comment_count}}</small>
                    <a href="">我要回复</a>
                </footer>
            </div>
        </div>

        <ul class="pagination mb">
            <li class="page-item " v-for="(item, index) in this.pages" :key = index >
                <span @click="change(index)" style="margin-left:15px">{{index + 1}}</span>
            </li>
        </ul>
        <div>
            <a-button @click="publish">发布内容</a-button>
        </div>
         <a-modal v-model="isPublish" title="发布内容" @ok="submit" cancelText="取消" okText="确定">
           <div>标题</div>
           <div style="margin-bottom:10px"><a-input placeholder="请输入标题" v-model="myTitle" /></div>
           <div>内容</div>
           <a-textarea placeholder="请输入内容" :rows="4" v-model="myValue" />
        </a-modal>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data () {
    return {
      data: [],
      count: 0,
      pageNum: 3,
      pages: 0,
      isLogin: false,
      isPublish: false,
      myValue: '',
      myTitle: ''
    }
  },
  async created () {
    sessionStorage.getItem('isLogin') === 'true' ? this.isLogin = true : this.isLogin = false
    const res = await axios({
      method: 'get',
      url: '/'
    })
    if (res.data.code === 200)
    {
      this.data = res.data.data.rows
      this.count = res.data.data.count
      this.pageNum = res.data.pageNum
      this.pages = Math.ceil(this.count / this.pageNum)
    }
  },
  methods: {
      async change (e){
       const res = await axios.get('/', {
            params: {
               page: e + 1
            }
       })
       if (res.data.code === 200)
        {
        this.data = res.data.data.rows
        }
      },
      toHome (){
          this.$router.push('/login')
      },
      toRegister (){
          this.$router.push('/register')
      },
      exit (){
          this.isLogin = false
          sessionStorage.clear()
          this.$message.success('已退出登录')
      },
     async like (e){
       const { data: res } = await axios.post('/like', {
               uid: sessionStorage.getItem('uid'),
               commentId: e.id
       })
       if (res.code === 0)
        {
          this.data.forEach((item, index) => {
              if (item.id === e.id)
              {
                  item.like_count++
              }
          })
        }
     },
     publish (){
         this.isPublish = true
     },
    async submit (){
        this.isPublish = false
        const { data: res } = await axios.post('/publish',
        {
            uid: sessionStorage.getItem('uid'),
            title: this.myTitle,
            value: this.myValue
        })
        console.log(res)
     }
  }

}
</script>
}
<style>
li{
    cursor: pointer;
}
</style>
