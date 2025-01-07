// 封装获取分类数据的逻辑
import { useEffect, useState } from 'react'
import { getCategoryAPI } from '@/apis/category'

function useCategory() {
  // 1. 获取分类的所有数据逻辑
  // 获取商品分类id列表
    const [categoryList, setCategoryList] = useState([])
  
    useEffect(() => {
      // 1. 封装函数 在函数体内调用接口
      const getCategoryList = async () => {
        const res = await getCategoryAPI()
        setCategoryList(res)//注意这里的数据信息，是否有data字段
      }
      // 2. 调用函数
      getCategoryList()
    }, [])
  // 2.把组件中要用到的数据return出去
  return {
    categoryList
  }
}

export default useCategory;