// import { Link } from 'react-router-dom'
// import { Card, Breadcrumb, Button, Popconfirm } from 'antd'

// // 导入资源
// import { Table, Space } from 'antd'
// import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
// import { useEffect, useState } from 'react'

// import { getCategoryAPI, delCategoryAPI } from '@/apis/category'


// const Category = () => {

//   // 准备列数据
//   const columns = [
//     {
//       title: '分类id号',
//       dataIndex: 'id',
//       // width: 220
//     },
//     {
//       title: '分类名称',
//       dataIndex: 'categoryName',
//       width: 200
//     },
//     {
//       title: '创建时间',
//       dataIndex: 'createdAt'
//     },
//     {
//       title: '更新时间',
//       dataIndex: 'updatedAt'
//     },
//     {
//       title: '操作',
//       render: data => {
//         return (
//           <Space size="middle">
//             <Button type="primary" shape="circle" icon={<EditOutlined />} />
            
//             <Popconfirm
//               title="删除商品分类"
//               description="确认删除当前分类?"
//               onConfirm={() => onConfirm(data)}
//               // onCancel={cancel}   // cancel is not defined
//               okText="确定"
//               cancelText="取消"
//             >
//               <Button
//                 type="primary"
//                 danger
//                 shape="circle"
//                 icon={<DeleteOutlined />}
//               />
//             </Popconfirm>
//           </Space>
//         )
//       }
//     }
//   ]

//   // 获取商品列表
//   const [list, setList] = useState([])
//   const [count, setCount] = useState(0)
//   // 删除后的分类列表
//   const [deletedData, setDeletedData] = useState([]);
//   useEffect(() => {
//     async function getList() {
//       const res = await getCategoryAPI()
//       setList(res)
//       setCount(res.length)
//       setDeletedData(res)//更新删除后的数据为全部数据
//     }
//     getList()
//   }, [])

  
//   // 删除分类操作
//   const onConfirm =  async (data) => {
//     console.log('删除点击了',data)
//     // 调用删除接口(id)
//     await delCategoryAPI(data.id)
//     // 重新获取用户列表
//         const res = await getCategoryAPI()
//         setList(res)
//         setCount(res.length)
//         setDeletedData(res) // 更新删除后的数据
//   }

//   return (
//     <div>
//       {/* 表格区域 */}
//       <Card
//         title={
//           <Breadcrumb items={[
//             { title: <Link to={'/layout'}>首页</Link> },
//             { title: `一共有${count} 条商品分类信息：` },
//           ]} />
//         }
//       >
//         <Table rowKey="id" columns={columns} dataSource={deletedData} />
//       </Card>
//     </div>
//   )
// }

// export default Category







import { Link } from 'react-router-dom';
import { Card, Breadcrumb, Button, Popconfirm, Modal, Form, Input, Space, Table } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { getCategoryAPI, delCategoryAPI, updateCategoryAPI } from '@/apis/category';

const CategoryPage = () => {
  // 准备列数据
  const columns = [
    {
      title: '分类id号',
      dataIndex: 'id',
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
      width: 200,
    },
    {
      title: '父分类id',
      dataIndex: 'parentCategoryId',
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEdit(data)}
            />

            <Popconfirm
              title="删除商品分类"
              description="确认删除当前分类?"
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
        );
      },
    },
  ];

  // 获取商品列表
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  // 管理弹出框的状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // 获取分类数据
  useEffect(() => {
    async function getList() {
      const res = await getCategoryAPI();
      setList(res);
      setCount(res.length);
    }
    getList();
  }, []);

  // 处理编辑按钮点击事件
  const handleEdit = (data) => {
    setEditingCategory(data);
    setIsModalVisible(true);
  };

  // 关闭弹出框
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    form.resetFields();
  };

  // 处理表单提交事件
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values)
    console.log('hhhhhhh');
    
    try {
      const { categoryName, id, parentCategoryId } = values;
      const reqData = {
        categoryName,
        id,
        parentCategoryId
      };

      // 调用更新分类的 API
      await updateCategoryAPI(reqData);

      // 重新获取分类数据
      const res = await getCategoryAPI();
      setList(res);
      setCount(res.length);

      // 关闭弹出框
      setIsModalVisible(false);
      setEditingCategory(null);
      form.resetFields();
    } catch (error) {
      console.error('更新失败', error);
    }
  };

  // 删除分类操作
  const onConfirm = async (data) => {
    console.log('删除点击了', data);
    // 调用删除接口(id)
    await delCategoryAPI(data.id);
    // 重新获取分类数据
    const res = await getCategoryAPI();
    setList(res);
    setCount(res.length);
  };

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
        <Table rowKey="id" columns={columns} dataSource={list} />

        {/* 编辑弹出框 */}
        <Modal
          title="编辑分类"
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
            initialValues={editingCategory}
            onFinish={onFinish}
          >
            <Form.Item
              label="分类ID"
              name="id"
              rules={[{ required: true, message: '请输入分类ID' }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="分类名称"
              name="categoryName"
              rules={[{ required: true, message: '请输入分类名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="分类ID"
              name="parentCategoryId"
              rules={[{ required: true, message: '请输入父分类ID' }]}
            >
              <Input  />
            </Form.Item>
            
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default CategoryPage;


