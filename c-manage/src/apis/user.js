// 跟用户相关的所有请求
import request from '@/utils/request'
// 1. 登录请求 (通用写法axios官方网站可看)

export function loginAPI (formData){
  return request({
    url: 'authentication/login',
    method: 'POST',
    data: formData
  })
}

// 2. 获取用户信息

export function getUserInfoAPI() {
  const id = localStorage.getItem('id')
  return request({
    url: `user/${id}`,
    method: 'GET'
  })
}

// 3. 提交用户表单
export function createUserAPI(data) {
  return request({
    url: 'user',
    method: 'POST',
    data
  })
}


// 3. 获取用户列表
export function getUserAPI(params) {
  return request({
    url: 'user',
    method: 'GET',
    params
  })
}

// 2. 删除用户

export function delUserAPI (id){
  return request({
    url: `user/${id}`,
    method: 'DELETE',
  })
}



