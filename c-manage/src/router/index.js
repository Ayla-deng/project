//路由配置

import Layout from '@/pages/Layout';    // src/pages/layout
import Login from '@/pages/Login';
import Reg from '@/pages/Reg';
import Load from '@/pages/Load';

import { createBrowserRouter, Navigate } from 'react-router-dom'
import  AuthRoute  from '@/components/authRoute'
import Home from '@/pages/Home';
import User from '@/pages/User';
import Category from '@/pages/Category';
import List from '@/pages/Product/list';
import Detail from '@/pages/Product/detail';
import Edit from '@/pages/Product/edit';



//配置路由实例
const router = createBrowserRouter([
  {
    path: '/',
    element: <Load />,
  },
  {
    path: '/reg',
    element: <Reg />,
  },
  {
    path: '/layout',
    // element: <Layout />,  
    element: <AuthRoute><Layout /></AuthRoute>,
    //二级路由新增children属性
    children: [
      //重定向
      {
        path: '',
        element: <Navigate to="home" replace />
      },
      {
        path: 'home',
        index: true,
        element:<Home />
      },
      {
        path: 'user',
        element:<User />
      },
      {
        path: 'product',
        children: [
          //重定向
          {
            path: '',
            element: <Navigate to="list" replace />
          },
          {
            path: 'list',
            element:<List />
          },
          {
            path: 'detail',
            element:<Detail />
          },
          {
            path: 'edit',
            element:<Edit />
          },
        ]
      },
      {
        path: 'category',
        element:<Category />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
  }
])

//导出实例


export default router;
