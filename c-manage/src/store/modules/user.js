// 和用户相关的状态管理

import { createSlice } from "@reduxjs/toolkit";
import { setToken as _setToken, getToken } from '@/utils'
// import { request } from '@/utils'
import {loginAPI, getUserInfoAPI} from '@/apis/user'

const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    //添加初始化数据
    // token: localStorage.getItem('token_key') || ''
    token: getToken() || '',
    id: '',
    userInfo: {}
  },
  // 同步修改方法
  reducers: {
    setToken (state, action) {
      state.token = action.payload //存到了redux里面
      // localstorage 也存一份
      // localStorage.setItem('token_key', action.payload)
      _setToken(action.payload)
      console.log(state.token)
    },
    setId(state, action) {
      state.id = action.payload
      localStorage.setItem('id', action.payload)
      console.log(state.id)
    },
    setUserInfo (state, action) {
      state.userInfo = action.payload
    }
  }
})

// 解构出actionCreater   (通过按需方式导出)
const { setToken, setId, setUserInfo } = userStore.actions

// 获取reducer函数
const userReducer = userStore.reducer

//异步方法 完成登录获取token  模板(固定)写法
const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // const token = getState().user.token;
    // 1.发送异步请求
    const res = await loginAPI(loginForm)
    // const res = await request.post('authentication/login', loginForm)
    // 2.提交同步action进行token的存入 把后端返回的数据当成一个实参传递过来
    dispatch(setToken(res.accessToken))
    dispatch(setId(res.id))
  }
}

//获取用户个人信息 异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
    // const id = localStorage.getItem('id')
    const res = await getUserInfoAPI()
    // const res = await request.get(`user/${id}`)
    dispatch(setUserInfo(res))
  }

}


export { fetchUserInfo, fetchLogin, setToken }

export default userReducer  //默认导出方式