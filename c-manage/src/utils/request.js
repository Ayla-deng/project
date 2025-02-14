//封装request请求模块
import axios from 'axios'
import { getToken, removeToken } from './token'
import router from '@/router'

// 项目通用  ***********************
// 1.根域名配置
// 2.超时时间
// 3.请求拦截器/响应拦截器

const request = axios.create({
  baseURL: 'http://localhost:8000/',
  // baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 添加请求拦截器
// 在请求发送之前，先做拦截 插入一些自定义的配置[参数的处理]
request.interceptors.request.use((config) => {
  // 操作这个congig 注入token数据
  //1. 获取到token (在本地可以取到)
  //2. 注入 按照后端格式要求做token格式拼接
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`  //固定格式 空格不能丢失   例如添加一个Bearer令牌
  }
    return config
  }, (error)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
// 在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  }, (error)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 监控401 token失效
  console.dir(error)
  if (error.response.status === 401) {
    // 清除本地token
    removeToken()
    // 跳转登录页面
    router.navigate('/login')
    // 页面刷新
    window.location.reload()
  }
  return Promise.reject(error)
})
export default request;