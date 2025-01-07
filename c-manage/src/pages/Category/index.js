import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Button, Popconfirm } from 'antd'

// 导入资源
import { Table, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

import { getCategoryAPI, delCategoryAPI } from '@/apis/category'


const Product = () => {

  // 准备列数据
  const columns = [
    {
      title: '分类id号',
      dataIndex: 'id',
      // width: 220
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      width: 200
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            
            <Popconfirm
              title="删除商品分类"
              description="确认删除当前分类?"
              onConfirm={() => onConfirm(data)}
              // onCancel={cancel}   // cancel is not defined
              okText="确定"
              cancelText="取消"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  // 获取商品列表
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  // 删除后的分类列表
  const [deletedData, setDeletedData] = useState([]);
  useEffect(() => {
    async function getList() {
      const res = await getCategoryAPI()
      setList(res)
      setCount(res.length)
      setDeletedData(res)//更新删除后的数据为全部数据
    }
    getList()
  }, [])

  
  // 删除分类操作
  const onConfirm =  async (data) => {
    console.log('删除点击了',data)
    // 调用删除接口(id)
    await delCategoryAPI(data.id)
    // 重新获取用户列表
        const res = await getCategoryAPI()
        setList(res)
        setCount(res.length)
        setDeletedData(res) // 更新删除后的数据
  }

  return (
    <div>
      {/* 表格区域 */}
      <Card 
        title={
          <Breadcrumb items={[
            { title: <Link to={'/layout'}>首页</Link> },
            { title: `一共有${count} 条商品分类信息：` },
          ]} />
        }
      >
        <Table rowKey="id" columns={columns} dataSource={deletedData} />
      </Card>
    </div>
  )
}

export default Product