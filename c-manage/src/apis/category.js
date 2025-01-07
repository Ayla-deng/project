
import request from '@/utils/request'


// 1. 获取商品分类列表
export function getCategoryAPI(params) {
  return request({
    url: 'category',
    method: 'GET',
    params
  })
}


// 2. 删除分类

export function delCategoryAPI (id){
  return request({
    url: `category/${id}`,
    method: 'DELETE',
  })
}

// 3. 获取单个商品分类详情

export function updateCategoryAPI (data){
  return request({
    url: `category/${data.id}`,
    method: 'PATCH',
    data
  })
}

