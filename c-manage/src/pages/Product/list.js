import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, Popconfirm} from 'antd'

// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons'
// import useCategory from '@/hooks/useCategory'
import { useEffect, useState } from 'react'
import { getProductAPI, delProducrAPI } from '@/apis/product'
import useCategory from '@/hooks/useCategory'
import useUser from '@/hooks/useUser'

// const { Option } = Select

const Category = () => {
  const { categoryList =[]} = useCategory()
  const { userList =[]} = useUser()

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
      console.log('categoryList is empty');
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
      width: 200
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

  // 获取商品分类列表
  const [list, setList] = useState([])
  const [count, setCount] = useState(0)
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
      {/* 表格区域 */}
      <Card 
        title={
          <Breadcrumb items={[
            { title: <Link to={'/layout'}>首页</Link> },
            { title: `一共有${count} 条商品信息：` },
          ]} />
        }
      >
        <Table rowKey="id" columns={columns} dataSource={list} />
      </Card>
    </div>
  )
}

export default Category