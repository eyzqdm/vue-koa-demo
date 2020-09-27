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
            <a-tag href="" @click.prevent = toHome()>登录</a-tag>
            <span> | </span>
            <a-tag href="" @click.prevent = toRegister()>注册</a-tag>
            <span v-if="isLogin === true">
                <span> | </span>
                <a-tag  href="" @click.prevent = exit()>退出登录</a-tag>
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
                    <a-tag color="#2db7f5" @click = like(item)>赞{{item.like_count}}</a-tag>
                    <a-tag color="#87d068" @click = showComments(item)>查看评论</a-tag>
                    <a-tag color="#108ee9" @click= comments(item)>我要评论</a-tag>
                </footer>
            </div>
        </div>

        <ul class="pagination mb">
            <li class="page-item " v-for="(item, index) in this.pages" :key = index >
                <span @click="change(index)" style="margin-left:15px">{{index + 1}}</span>
            </li>
        </ul>
        <div>
            <a-button type="primary" @click="publish">发布内容</a-button>
        </div>
         <a-modal v-model="isPublish" title="发布内容" @ok="submit" cancelText="取消" okText="确定">
           <div>标题</div>
           <div style="margin-bottom:10px"><a-input placeholder="请输入标题" v-model="myTitle" /></div>
           <div>内容</div>
           <a-textarea placeholder="请输入内容" :rows="4" v-model="myValue" />
        </a-modal>
        <a-modal v-model="isCommentsShow" title="所有评论"  :footer="null">
            <div v-for="(item,index) in commentsList" :key = index>
                <span>用户: {{item.user_id}}</span>
                <span>{{item.content}}</span>
            </div>
        </a-modal>
         <a-modal v-model="commentsShow" title="评论" @ok="commentSubmit" cancelText="取消" okText="确定">
           <a-textarea placeholder="请输入评论内容" :rows="4" v-model="myComment" />
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
      myTitle: '',
      commentsList: [],
      isCommentsShow: false,
      commentsShow: false,
      myComment: '',
      currentContent: 0
    }
  },
  async created () {
    sessionStorage.getItem('isLogin') === 'true' ? this.isLogin = true : this.isLogin = false
    const res = await axios({
      method: 'get',
      url: '/'
    })
    if (res.data.code === 0)
    {
      this.data = res.data.data.rows
      this.count = res.data.data.count
      this.pageNum = res.data.pageNum
      this.pages = Math.ceil(this.count / this.pageNum)
    }
    else {
       this.$message.error(`${res.msg}`)
    }
  },
  methods: {
      async change (e){
       const res = await axios.get('/', {
            params: {
               page: e + 1
            }
       })
       console.log(res.data)
       if (res.data.code === 0)
        {
        this.data = res.data.data.rows
        }
        else {
           this.$message.error(`${res.msg}`)
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
        else {
             this.$message.error(`${res.msg}`)
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
        if (res.code === 0)
        {
           this.data = res.data.rows
        }
        else
        {
          this.$message.error(`${res.msg}`)
        }
     },
    async showComments (e){
      const { data: res } = await axios.post('/showComments', {
               commentId: e.id
       })
       if (res.code === 0)
       {
         this.commentsList = res.data
         this.isCommentsShow = true
       }
       else {
           this.$message.error(`${res.msg}`)
       }
     },
     comments (e){
         this.currentContent = e.id
         this.commentsShow = true
     },
     async commentSubmit (){
         this.commentsShow = false
         const { data: res } = await axios.post('/comments', {
               uid: sessionStorage.getItem('uid'),
               contentId: this.currentContent,
               content: this.myComment
       })
     if (res.code === 0)
       {
        this.$message.success('评论成功')
       }
       else {
           this.$message.error(`${res.msg}`)
       }
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
