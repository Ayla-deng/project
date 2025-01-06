// 封装和文商品相关的接口函数

import request from '@/utils/request'
// 1. 获取商品分类列表

export function getCategoryIdAPI (){
  return request({
    url: 'category',
    method: 'GET',
  })
}


// 2. 提交商品表单

export function createProductAPI(data) {
  return request({
    url: 'product',
    method: 'POST',
    data
  })
}

// 3. 获取商品列表

export function getProductAPI(params) {
  return request({
    url: 'product',
    method: 'GET',
    params
  })
}

// 4. 获取用户名称列表

export function getUserIdAPI (){
  return request({
    url: 'user',
    method: 'GET',
  })
}