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
import { Card, Breadcrumb, Button, Popconfirm, Modal, Form, Input, Space, Table, InputNumber } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { getCategoryAPI, delCategoryAPI, updateCategoryAPI, createCategoryAPI } from '@/apis/category';

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
            {/* <Button
              type="primary"
              shape="circle"
              icon={<AppstoreAddOutlined />}
              // onClick={() => handleEdit(data)}
            /> */}

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
  // 管理新增弹出框的状态
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  
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



  // 处理新增按钮点击事件
  const handleAdd = (data) => {
    setEditingCategory(data);
    setIsAddModalVisible(true);
  };






  // 关闭编辑弹出框
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    form.resetFields();
  };

   // 关闭新增弹出框
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    // setEditingCategory(null);
    addform.resetFields();
  };




  // 处理表单编辑提交事件
  const [form] = Form.useForm();
  // 处理表单新增提交事件
  const [addform] = Form.useForm();

  const onFinish = async (values) => {
    console.log('hhhhhhh');
    console.log(values)
    console.log('hhhhhhh');
    
    try {
      const { categoryName, id, parentCategoryId } = values;
      console.log('2222222');
      console.log(values)
      console.log('222222222');
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


  const handleAddFinish = async (values) => {
    console.log('hhhhhhh');
    console.log(values)
    console.log('hhhhhhh');
    try {
      const { categoryName, parentCategoryId } = values;
      console.log('2222222');
      console.log(values)
      console.log('222222222');

      const reqData = {
        categoryName,
        parentCategoryId
      };
      console.log('请求数据',reqData)

      // 调用创建分类的 API
      // 这一步无响应 为什么（数据类型的问题）
      await createCategoryAPI(reqData);

      // 重新获取分类数据
      const res = await getCategoryAPI();
      setList(res);
      setCount(res.length);

      // 关闭弹出框
      setIsAddModalVisible(false);
      // setEditingCategory(null);
      addform.resetFields();
    } catch (error) {
      console.error('新增失败', error);
    }
  }

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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: 40 }}
            onClick={handleAdd}
          >
              新增分类
            </Button>
        </Form.Item>
        {/* 新增弹出框区域 */}
        <Modal
          title="新增分类"
          open={isAddModalVisible}
          onCancel={handleAddCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary" onClick={addform.submit}>确认</Button>,
          ]}
        >
          <Form
            form={addform}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            initialValues
            onFinish={handleAddFinish}
            // onAddFinish={onAddFinish}
          >
            
            <Form.Item
              label="分类名称"
              name="categoryName"
              rules={[{ required: true, message: '请输入分类名称' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="父分类ID"
              name="parentCategoryId"
              rules={[{ required: false, message: '请输入父分类ID' }]}
            >
              <InputNumber placeholder="请输入父分类ID" style={{ width: 200 }} />
              {/* <Input type="number" /> */}
            </Form.Item>
            
          </Form>
        </Modal>


        {/* 编辑弹出框区域 */}
        <Modal
          title="编辑分类"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary" onClick={form.submit}>提交</Button>,
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
              <Input disabled  />
            </Form.Item>
            <Form.Item
              label="分类名称"
              name="categoryName"
              rules={[{ required: true, message: '请输入分类名称' }]}
            >
              <Input placeholder="请输入分类名称" />
            </Form.Item>
            <Form.Item
              label="父分类ID"
              name="parentCategoryId"
              rules={[{ required: true, message: '请输入父分类ID' }]}
            >
              <InputNumber placeholder="请输入父分类ID" style={{ width: 200 }} />
            </Form.Item>
            
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default CategoryPage;


