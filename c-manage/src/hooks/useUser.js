// 封装获取用户数据的逻辑
import { useEffect, useState } from 'react'
import { getUserAPI } from '@/apis/user'

function useUser() {
  // 1. 获取用户的所有数据逻辑
  // 获取用户的id列表
    const [userList, setUserList] = useState([])
  
    useEffect(() => {
      // 1. 封装函数 在函数体内调用接口
      const getCategoryList = async () => {
        const res = await getUserAPI()
        setUserList(res)//注意这里的数据信息，是否有data字段
      }
      // 2. 调用函数
      getCategoryList()
    }, [])
  // 2.把组件中要用到的数据return出去
  return {
    userList
  }
}

export default useUser;