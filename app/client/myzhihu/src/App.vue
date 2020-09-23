<template>
  <div id="app">
    <div class="container">

        <div class="py-5 text-center">
            <img class="d-block mx-auto mb-4" src="../src/assets/logo.png" />
            <p class="lead">
                爱就好比骑马和学法语，如果不趁年轻时学会，以后想学会就难了。
            </p>
            <p class="lead">
                Love is like riding or speaking French,if you don not learn it young, it's hard to get the trick of it
                later.
            </p>
            <!-- 人这一生，总要心碎一两次的。

                We must have our heart broken once or twice before we are done.
                世事无常，我们要随遇而安。

                It just happens, and we should live with it.

                人生就是不断收集回忆的过程，最终陪伴我们的也只有回忆了。

                The business of life is the acquisition of memories.In the end that's all there is.

                亲爱的，人生总是会遇到各种麻烦，我们得尽力去解决它。
                My dear, all life is a series of problems which we must try and solve.

                没有翻不了的山，没有沉不了的船。
                Every mountain is unclimbable until someone climbs it.Every ship is unsinkable until it sinks.

                世道变了，我们也得跟着变。

                The world moves on, and we must move with it.

                当坏事发生时，仍希望未发生过是毫无意义的，当务之急是减少损失。

                When something bad happens,there is no point in wishing it had not happened.The only option is to minimize the damage.
                每种生活都有它自己的规矩，如果你不愿意遵守，那么这种生活就不适合你。 -->
        </div>

        <div class="heading text-right mb">
            <a href="">注册</a>
            <span> | </span>
            <a href="">登录</a>
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
                        <h5 class="modal-title">注册</h5>
                        <button type="button" class="close">
                            <span>&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">

                        <!-- 注册 -->
                        <form>
                            <div class="form-group row">
                                <label for="username" class="col-md-3 col-form-label">用户名</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" id="username" placeholder="用户名" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-3 col-form-label">密码</label>
                                <div class="col-md-9">
                                    <input type="password" class="form-control" id="password" placeholder="密码" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="repassword" class="col-md-3 col-form-label">重复密码</label>
                                <div class="col-md-9">
                                    <input type="password" class="form-control" id="repassword" placeholder="重复密码" />
                                </div>
                            </div>
                        </form>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">注册</button>
                        <button type="button" class="btn btn-secondary">取消</button>
                        <a href="">我有账号，立即登录</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" style="display: -block">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">登录</h5>
                        <button type="button" class="close">
                            <span>&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">

                        <!-- 登录 -->
                        <form>
                            <div class="form-group row">
                                <label for="username" class="col-md-3 col-form-label">用户名</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" id="username" placeholder="用户名" />
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="password" class="col-md-3 col-form-label">密码</label>
                                <div class="col-md-9">
                                    <input type="password" class="form-control" id="password" placeholder="密码" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">登录</button>
                        <button type="button" class="btn btn-secondary">取消</button>
                        <a href="">我要注册</a>
                    </div>
                </div>
            </div>
        </div>
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
    <router-view/>
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
       console.log(e)
       const res = await axios.get('/', {
            params: {
               page: e + 1
            }
       })
       if (res.data.code === 200)
    {
      this.data = res.data.data.rows
    }
      }
  }
}
</script>
<style>
li{
    cursor: pointer;
}
</style>
