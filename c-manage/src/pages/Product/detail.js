/* eslint-disable no-undef */
import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Select,Input, Modal, Popconfirm } from 'antd'
//时间选择器汉化处理
// import locale from 'antd/es/date-picker/locale/zh_CN'

// 导入资源
import { Table, Space } from 'antd'
import { EditOutlined, QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons'
// import useCategory from '@/hooks/useCategory'
import { useEffect, useState } from 'react'
import { getProductAPI, delProducrAPI } from '@/apis/product'
import useCategory from '@/hooks/useCategory'
import useUser from '@/hooks/useUser'


const { Option } = Select
// const { RangePicker } = DatePicker

const Product = () => {
  const { categoryList = [] } = useCategory()
  const { userList = [] } = useUser()

  // 用户id到用户名的映射
  const [userName, setUserName] = useState({})
  // 商品分类id到商品分类名的映射
  const [categoryName, setCategoryName] = useState({})


  useEffect(() => {
    // 构建用户id到用户名的映射关系
    if (userList.length > 0) {
      const map = userList.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {}); // 添加初始值 {}
      setUserName(map);
    } else {
      console.log('userList is empty');
    }
    
    // 构建分类id到分类名的映射关系
    if (categoryList.length > 0) {
      const categoryMap = categoryList.reduce((acc, category) => {
        acc[category.id] = category.categoryName;
        return acc;
      }, {}); // 添加初始值 {}
      setCategoryName(categoryMap);
    } else {
      console.log('categoryList is empty');
    }
  }, [userList, categoryList])

  // 准备列数据
  const columns = [
    {
      title: '商品图片',
      dataIndex: 'productImage',
      // width: 220
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      width: 200
    },
    {
      title: '商品类别',
      dataIndex: 'productCategoryId',
      render: (productCategoryId) => categoryName[productCategoryId] || '-'
    },
    {
      title: '商品用户',
      dataIndex: 'productUserId',
      render: (productUserId) => userName[productUserId] || '-'
    },
    {
      title: '价格',
      dataIndex: 'productPrice'
    },
    {
      title: '库存数',
      dataIndex: 'productStock'
    },
    {
      title: '操作',
      render: (data) => {   // data 用于传递参数
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button type="primary" shape="circle" icon={<QuestionCircleOutlined />} onClick={() => showModal(data)} />
            <Popconfirm
              title="删除商品"
              description="确认删除当前商品吗?"
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
  // 商品总数
  const [count, setCount] = useState(0)
  // 筛选后的商品列表
  // const [filteredData, setFilteredData] = useState([]);
  // 搜索输入框的状态
  const [searchText, setSearchText] = useState('')
  // 模态框的状态
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // 获取商品操作后状态
  const [operateData, setOperateData] = useState([]);


  useEffect(() => {
    async function getList() {
      const res = await getProductAPI()
      setList(res)
      setCount(res.length)
      setOperateData(res) // 初始化操作后的数据为全部数据
    }
    getList()
  }, [])
  
  const onFinish = (formValue) => {
    console.log(formValue)
    // 筛选条件
    const { category, user } = formValue;

    // 进行筛选
    const operateData = list.filter(item => {
      return (category === '' || item.productCategoryId === category) &&
        (user === '' || item.productUserId === user) &&
        (searchText === '' || item.productName.toLowerCase().includes(searchText.toLowerCase()));
    });

    // 更新筛选操作后的数据和计数
    setOperateData(operateData);
    setCount(operateData.length)
  };
  const onReset = () => {
    // 重置筛选条件
    // setFilteredData(list); // 恢复为全部数据
    setOperateData(list); // 恢复为全部数据
    setCount(list.length);
    setSearchText(''); // 重置搜索输入框
    // window.location.reload()
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  }

  // 控制模态框的显示与隐藏
  const showModal = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  }

  const handleOk = () => {
    setIsModalVisible(false);
  }

  // 控制模态框的关闭
  const handleCancel = () => {
    setIsModalVisible(false);
  }

  // 模态框中的列配置，展示商品表的所有字段
  const modalColumns = [
    {
      title: '商品ID',
      dataIndex: 'id',
    },
    {
      title: '商品图片',
      dataIndex: 'productImage',
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
    },
    {
      title: '商品描述',
      dataIndex: 'productDescription',
    },
    {
      title: '商品类别',
      dataIndex: 'productCategoryId',
      render: (productCategoryId) => categoryName[productCategoryId] || '-',
    },
    {
      title: '商品用户',
      dataIndex: 'productUserId',
      render: (productUserId) => userName[productUserId] || '-',
    },
    {
      title: '价格',
      dataIndex: 'productPrice',
    },
    {
      title: '库存数',
      dataIndex: 'productStock',
    },
    {
      title: '商品创建时间',
      dataIndex: 'createdAt',
    },
    {
      title: '商品更新时间',
      dataIndex: 'updatedAt',
    }
  ];

  // 删除商品操作
  const onConfirm = async (data) => {
    console.log('删除点击了', data)
    // 调用删除接口(id)
    await delProducrAPI(data.id)

    // 重新获取删除后的商品列表
    const res = await getProductAPI()
    setList(res)
    // setDeletedData(res)
    setOperateData(res) // 更新操作数据为全部数据
    // 重新计算删除后的商品总数
    setCount(res.length)
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/layout'}>首页</Link> },
            { title: '商品详情' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ category:'',user:'' }} onFinish={onFinish}>
          <Form.Item label="商品名称" name="productName">
            <Input
              placeholder="请输入商品名称"
              style={{ width: 160 }}
              value={searchText}
              onChange={handleSearch}
            />
          </Form.Item>
          <Form.Item label="商品分类" name="category">
            <Select
              // placeholder="请选择商品类别"
              style={{ width: 160 }}
            >
              <Option value="" disabled selected>请选择商品类别</Option>
              {categoryList.map(item => <Option key={item.id} value={item.id}>{item.categoryName}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="用户分类" name="user">
            <Select
              // placeholder="请选择用户名称"
              style={{ width: 160 }}
            >
              <Option value="" disabled selected>请选择用户名称</Option>
              {userList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
            <Button type="primary" htmlType="button" onClick={onReset} style={{ marginLeft: 40 }}>
              刷新
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={operateData} />
      </Card>
      {/* 模态框 */}
      <Modal
        title="商品详细信息"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // 移除默认的确定和取消按钮
        width="80%"  // 设置模态框宽度为80%
        // width="720px"  // 设置模态框宽度的具体像素值
        // style={{ height: '100vh' }} // 设置模态框高度为视口高度的60%（无响应）
      >
        {selectedProduct && (
          <Table
            rowKey="id"
            columns={modalColumns}
            dataSource={[selectedProduct]}
            pagination={false} // 不需要分页
          />
        )}
      </Modal>
    </div>
  )
}

export default Product

















