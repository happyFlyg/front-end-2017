import Vue          from 'vue'
import Router       from 'vue-router'
import Index        from '@/page/Index.vue'
import Creat        from '@/page/Creat.vue'
import CreatSlect   from '@/page/CreatSlect.vue'
import CreatFinish  from '@/page/CreatFinish.vue'
import CreatSuccess from '@/page/CreatSuccess.vue'
Vue.use(Router)

export default new Router({
  routes:[
    {path:'/index',component:Index},
    {path:'/Creat',component:Creat},
    {path:'/toCreatSlect',component:CreatSlect},
    {path:'/CreatFinish',component:CreatFinish},
    {path:'/CreatSuccess',component:CreatSuccess},
    {path:'*',component:Index}
  ]
})
