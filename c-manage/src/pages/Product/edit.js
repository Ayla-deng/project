
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  InputNumber
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './edit.scss'
import TextArea from 'antd/es/input/TextArea'
import { useEffect } from 'react'
import { createProductAPI, getProductByIdAPI, updateProductAPI } from '@/apis/product'

import { fetchUserInfo } from '@/store/modules/user'
import { useDispatch } from'react-redux'
import { useSelector } from'react-redux'
import useCategory from '@/hooks/useCategory'
// import useUser from '@/hooks/useUser'

const { Option } = Select



const Publish = () => {
  // 获取商品分类id列表
  const { categoryList } = useCategory()

  // 获取用户列表
  // const { userList } = useUser()

  console.log(11111111);
  
  console.log(categoryList)
  console.log(11111);
  
  //提交表单
  //触发个人用户信息action(一进去就执行)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchUserInfo())
    }, [dispatch])
    
    const currentUserId = useSelector(state => state.user.userInfo.id)
    const currentUserName = useSelector(state => state.user.userInfo.name)
  const onFinish = (formValue) => {
    console.log(formValue)//这里是运行成功了的
    
    const { productName,productUserId, productCategoryId, productPrice, productStock, productDescription, productImage } = formValue
    // 1. 按照接口文档的格式处理收集到的表单数据
    const reqData = {
      productName,
      productUserId:productUserId || currentUserId,  // 确保在创建时使用当前登录用户的 ID
      productCategoryId,
      productPrice,
      productStock,
      productDescription,
      productImage
    }
    console.log(reqData);
    
    // 2. 调用接口提交
    // 处理调用不同的接口 新增-新增接口   编辑-更新接口
    if (productId) {

      updateProductAPI({ id: productId, ...reqData }) //传递一个对象，把需要的id数据传过去
    } else {
      createProductAPI(reqData)
    }
    
  }



  // 回填数据
  const [searchParams] = useSearchParams()  // id本身就在路由参数身上，解构结果是一个对象
  const productId = searchParams.get('id')
  // 获取实例  (可以通过form变量去访问它身上的setFieldValue方法完成回填)
  const [form] = Form.useForm()
  console.log(productId);
  
  useEffect(() => {
    // 1. 通过id获取数据
    async function getProductData() {
      const res = await getProductByIdAPI(productId)
      form.setFieldsValue(res)
    }
    // 只有当有id的时候才会调用此函数回填(根据是否有id做适配)
    if (productId) {
      getProductData()
    } 
    // 2. 调用实例方法 完成回填
  },[productId, form])

  const name = useSelector(state => state.user.userInfo.name)
  console.log(currentUserName)

  return (
    <div className="publish">
      {/* 圆角区域 结构美化 */}
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/layout'}>首页</Link> },
            { title: `${productId ? '编辑' : '创建'}商品` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="商品名称"
            name="productName"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入商品名称" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="商品分类"
            name="productCategory"
            rules={[{ required: true, message: '请选择商品分类' }]}
          >
            <Select placeholder="请选择商品分类" style={{ width: 400 }}>
              {/* 后面需要接口数据进行填充 */}
              {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
              {categoryList.map(item => <Option key={item.id} value={item.id}>{item.categoryName}</Option>)}
            </Select>
          </Form.Item>
          
          <Form.Item
            label="商品用户"
            name="productUserId"
            rules={[{ required: true, message: '请选择商品用户' }]}
          >
            <Select
              placeholder="请选择商品用户"
              style={{ width: 200 }}
              // disabled  设置不可选择
              defaultValue={currentUserId}
            >
              <Option value={currentUserId}>{currentUserName}</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="商品价格"
            name="productPrice"
            rules={[{ required: true, message: '请输入商品价格' }]}
          >
            <InputNumber placeholder="请输入商品价格" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item
            label="商品库存"
            name="productStock"
            rules={[{ required: false, message: '请输入商品库存' }]}
          >
            <InputNumber placeholder="请输入商品库存" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item
            label="描述"
            name="productDescription"
            rules={[{ required: true, message: '请输入商品描述' }]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="商品图片地址"
            name="productImage"
            rules={[{ required: true, message: '请输入商品图片地址' }]}
          >
            <Input placeholder="请输入商品图片地址" style={{ width: 200 }} />
          </Form.Item>
          {/* <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
              </Radio.Group>
            </Form.Item> */}
            {/* listType: 决定选择文件框的外观样式
              showUploadList: 控制显示上传列表
            */}
            {/* <Upload
              listType="picture-card"
              showUploadList
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {/* 创建商品 */}
                {productId ? '编辑' : '创建'}商品
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish