/* eslint-disable no-undef */
import React from 'react'
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  ShopOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { Outlet } from 'react-router-dom'

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '1',
    icon: <HomeOutlined />,
  },
  {
    label: '用户管理',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: '商品管理',
    key: '3',
    icon: <ShopOutlined />,
    children: [
      {
        key: '5',
        label: '商品列表',
        icon: <ShopOutlined />,
      },
      {
        key: '6',
        label: '商品详情',
        icon: <ShopOutlined />,
      },
      {
        key: '7',
        label: '创建/编辑商品',
        icon: <ShopOutlined />,
      },
    ]
  },
  {
    label: '分类管理',
    key: '4',
    icon: <DiffOutlined />,
  },
]

const GeekLayout = () => {
  //return 返回的三组数据可以拆分出各个小模块
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">柴柴老师</span>
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