import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
//时间选择器汉化处理
import locale from 'antd/es/date-picker/locale/zh_CN'

// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
// import useCategory from '@/hooks/useCategory'
import { useEffect, useState } from 'react'
import { getProductAPI } from '@/apis/product'
import useCategory from '@/hooks/useCategory'
import useUser from '@/hooks/useUser'


const { Option } = Select
const { RangePicker } = DatePicker

const Product = () => {
  const { categoryList =[]} = useCategory()
  const { userList =[]} = useUser()
  // const [categoryIdList, setCategoryIdList] = useState([])
  // setCategoryIdList(categoryList)

  console.log(22222222222);
  
  console.log(categoryList)
  console.log(2222222222222);

  // 用户id到用户名的映射
  const [userName, setUserName] = useState({})
  // 商品分类id到商品分类名的映射
  const [categoryName, setCategoryName] = useState({})

  useEffect(() => {
    // 构建用户id到用户名的映射关系

    // 构建分类id到分类名的映射关系
    console.log('useeffect')
    console.log(categoryList)

    // const categoryMap = categoryList.reduce((acc, category) => {
    //   acc[category.id] = category.categoryName;
    //   return acc;
    // })
    // setCategoryName(categoryMap)

    if (userList.length > 0) {
      const map = userList.reduce((acc, user) => {
        acc[user.id] = user.name;
        return acc;
      }, {}); // 添加初始值 {}
      setUserName(map);
    } else {
      console.log('categoryList is empty');
    }
   

    if (categoryList.length > 0) {
      const categoryMap = categoryList.reduce((acc, category) => {
        acc[category.id] = category.categoryName;
        return acc;
      }, {}); // 添加初始值 {}
      setCategoryName(categoryMap);
    } else {
      console.log('categoryList is empty');
    }
  },[userList, categoryList])

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
      // width: 220
    },
    {
      title: '商品类别',
      dataIndex: 'productCategoryId',
      render: (productCategoryId)=>categoryName[productCategoryId] ||'-'
    },
    {
      title: '商品用户',
      dataIndex: 'productUserId',
      render:(productUserId)=>userName[productUserId] ||'-'
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
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button type="primary" shape="circle" icon={<QuestionCircleOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
          </Space>
        )
      }
    }
  ]


  // 获取商品列表
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
  useEffect(() => {
    async function getList() {
      const res = await getProductAPI()
      setList(res)
      setCount(res.length)
    }
    getList()
  },[])
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
        <Form initialValues={{ status: '' }}>

          <Form.Item label="商品分类" name="category">
            <Select
              placeholder="请选择商品分类"
              style={{ width: 120 }}
            >
              {categoryList.map(item => <Option key={item.id} value={item.id}>{item.categoryName}</Option>)}
            </Select>
          </Form.Item>

          {/* <Form.Item label="日期" name="date"> */}
            {/* 传入locale属性 控制中文显示*/}
            {/* <RangePicker locale={locale}></RangePicker>
          </Form.Item> */}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} />
      </Card>
    </div>
  )
}

export default Product