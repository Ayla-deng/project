
import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Button, Popconfirm, Modal, Form, Input} from 'antd'

// 导入资源
import { Table, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

import { getUserAPI, delUserAPI ,updateUserAPI} from '@/apis/user'

const User = () => {
  // 准备列数据
  const columns = [
    {
      title: '用户id号',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      width: 200
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
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
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(data)}
            />
            <Popconfirm
              title="删除用户"
              description="确认删除当前用户吗?"
              onConfirm={() => onConfirm(data)}
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

  // 获取用户列表
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  // const [deletedData, setDeletedData] = useState([])

  // 管理弹出框的状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // 获取用户列表数据
  useEffect(() => {
    async function getList() {
      const res = await getUserAPI()
      setList(res)
      setCount(res.length)
      // setDeletedData(res)
    }
    getList()
  }, [])

  // 处理编辑按钮点击事件
  const handleEdit = (data) => {
    console.log('编辑按钮点击了',data)
    setEditingUser(data)
    setIsModalVisible(true)
  }

  // 关闭弹出框
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  }

  // 处理表单提交事件
  const [form] = Form.useForm();


  const onFinish = async (values) => {
    console.log('11111');
    
    console.log(values)
    console.log('11111');
    
      
      try {
        const { name, id, email,password } = values;
        console.log('22222222');
        console.log(values)

        console.log('22222222');
        
        const reqData = {
          name,
          id,
          email,
          password
        };
        console.log(reqData)

  
        // 调用更新分类的 API
        await updateUserAPI(reqData);
  
        // 重新获取分类数据
        const res = await getUserAPI();
        setList(res);
        setCount(res.length);
  
        // 关闭弹出框
        setIsModalVisible(false);
        setEditingUser(null);
        form.resetFields();
      } catch (error) {
        console.error('更新失败', error);
      }
    }


  // 删除分类操作
  const onConfirm = async (data) => {
    console.log('删除点击了', data)
    // 调用删除接口(id)
    await delUserAPI(data.id)

    // 重新获取用户列表
    const res = await getUserAPI()
    setList(res)
    setCount(res.length)
    // setDeletedData(res) // 更新删除后的数据
  }

  return (
    <div>
      {/* 表格区域 */}
      <Card 
        title={
          <Breadcrumb items={[
            { title: <Link to={'/layout'}>首页</Link> },
            { title: `一共有${count} 条用户信息：` },
          ]} />
        }
      >
        <Table rowKey="id" columns={columns} dataSource={list} />

        {/* 弹出框区域 */}
        <Modal
          title="编辑用户信息"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary" onClick={form.submit}>确认</Button>,
          ]}
        >
          <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues={editingUser}
            onFinish={onFinish}
          >
            <Form.Item
              label="用户id号"
              name="id"
              rules={[{ required: true, message: '请输入用户id号' }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="用户名"
              name="name"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="用户邮箱"
              name="email"
              rules={[{ required: true, message: '请输入邮箱地址' }]}
            >
              <Input  />
            </Form.Item>
             <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input  />
            </Form.Item>
            
          </Form>
        </Modal>
      </Card>
    </div>
  )
}

export default User
