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
            <a href="" @click.prevent = toHome()>登录</a>
            <span> | </span>
            <a href="" @click.prevent = toRegister()>注册</a>
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
                    <small>赞{{item.like_count}}</small>
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
        <div class="modal" style="display: -block">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">xxxxxxxxxx</h5>
                            <button type="button" class="close">
                                <span>&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <!-- 回复 -->
                            <form>
                                <div class="form-group row">
                                    <div class="col-md-12">
                                        <textarea class="form-control" id="username" placeholder="回复内容……" cols="30" rows="10"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary">回复</button>
                            <button type="button" class="btn btn-secondary">取消</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data () {
    return {
      data: [],
      count: 0,
      pageNum: 2,
      pages: 0
    }
  },
  async created () {
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
      console.log(res.data)
      console.log(res.data.pageNum, this.pages)
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
