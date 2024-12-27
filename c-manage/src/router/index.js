//路由配置

import Layout from '@/pages/Layout';    // src/pages/layout
import Login from '@/pages/Login';

import { createBrowserRouter } from 'react-router-dom'
import  AuthRoute  from '@/components/authRoute'

//配置路由实例
const router = createBrowserRouter([
  {
    path: '/',
    // element: <Layout />,  
    element:<AuthRoute><Layout /></AuthRoute>
  },
  {
    path: '/login',
    element: <Login />,
  }
])

//导出实例


export default router;
