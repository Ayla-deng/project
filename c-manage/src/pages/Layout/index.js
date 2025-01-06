/* eslint-disable no-undef */
import React, { useEffect} from 'react'
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  ShopOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import { fetchUserInfo } from '@/store/modules/user'
import { useDispatch } from'react-redux'
import { useSelector } from'react-redux'

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: '用户管理',
    key: 'user',
    icon: <UserOutlined />,
  },
  {
    label: '商品管理',
    key: 'product',
    icon: <ShopOutlined />,
    children: [
      {
        key: 'product/list',
        label: '商品列表',
        icon: <ShopOutlined />,
      },
      {
        key: 'product/detail',
        label: '商品详情',
        icon: <ShopOutlined />,
      },
      {
        key: 'product/edit',
        label: '创建/编辑商品',
        icon: <ShopOutlined />,
      },
    ]
  },
  {
    label: '分类管理',
    key: 'category',
    icon: <DiffOutlined />,
  },
]

const GeekLayout = () => {
  const navigate = useNavigate() 

  const onMenuClick = (route) => {
    console.log('onMenuClick', route)
    // 子菜单路由添加父路由前缀，后面的路由跳转地址就更方便处理
    const path = route.key
    navigate(path)
  }
  
  //反向函数
  //1. 获取当前路由路径
  // const location = useLocation()
  // console.log(location.pathname)
  // const selectedKey = location.pathname

  //触发个人用户信息action(一进去就执行)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  
  const name = useSelector(state => state.user.userInfo.name)
  // const name = 
  //return 返回的三组数据可以拆分出各个小模块
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['1']}
            // selectedKeys={selectedKey} 更新时高亮实现失败
            //监听点击事件
            onClick={onMenuClick}
            defaultOpenKeys={['3']}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* //设置二级路由出口 渲染二级路由组件的位置*/}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
export default GeekLayout