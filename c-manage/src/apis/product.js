/* eslint-disable no-undef */
// 封装和文商品相关的接口函数

// import axios from 'axios'
import request from '@/utils/request'


// 1. 提交商品表单

export function createProductAPI(data) {
  return request({
    url: 'product',
    method: 'POST',
    data
  })
}

// 2. 获取商品列表

export function getProductAPI(params) {
  return request({
    url: 'product',
    method: 'GET',
    params
  })
}

// 3. 获取单个商品详情

export function getProductByIdAPI (id){
  return request({
    url: `product/${id}`,
    method: 'GET',
  })
}

// 4. 更新商品表单

export function updateProductAPI(data) {
  return request({
    url: `product/${data.id}`,
    method: 'PATCH',
    data
  })
}


// 5. 删除商品

export function delProducrAPI (id){
  return request({
    url: `product/${id}`,
    method: 'DELETE',
  })
}
