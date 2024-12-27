// 封装高阶组件
// 核心逻辑：有token，正常跳转；无token：去登录页（加载注册登录页）

import { getToken } from '@/utils'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }) => {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>  //有token，返回原来那个路由组件
  } else {
    return <Navigate to="/login" replace />  //无token，重定向到login
  }
}

export default AuthRoute