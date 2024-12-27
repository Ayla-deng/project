// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils'

const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token:''
  },
  // 同步修改方法
  reducers: {
    setToken (state, action) {
      state.token = action.payload
    }
  }
})

// 解构出actionCreater   (通过按需方式导出)
const { setToken } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登录获取token  模板(固定)写法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1.发送异步请求
    const res = await request.post('authentication/login', loginForm)
    // const res = await request.post('/authorizations', loginForm)
    // 2.提交同步action进行token的存入 把后端返回的数据当成一个实参传递过来
    dispatch(setToken(res.accessToken))
  }
}

export { fetchLogin, setToken }

export default userReducer  //默认导出方式