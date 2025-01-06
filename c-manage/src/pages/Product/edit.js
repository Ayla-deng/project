
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
import { Link } from 'react-router-dom'
import './edit.scss'
import TextArea from 'antd/es/input/TextArea'
import { useEffect } from 'react'
import { createProductAPI } from '@/apis/product'

import { fetchUserInfo } from '@/store/modules/user'
import { useDispatch } from'react-redux'
import { useSelector } from'react-redux'
import useCategory from '@/hooks/useCategory'

const { Option } = Select

const Publish = () => {
  // 获取商品分类id列表
  const { categoryList } = useCategory()

  console.log(11111111);
  
  console.log(categoryList)
  console.log(11111);
  
  //提交表单
  //触发个人用户信息action(一进去就执行)
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchUserInfo())
    }, [dispatch])
    
    const id = useSelector(state => state.user.userInfo.id)
  const onFinish = (formValue) => {
    console.log(formValue)//这里是运行成功了的
    
    const { productName, productCategoryId, productPrice, productStock, productDescription, productImage } = formValue
    // 1. 按照接口文档的格式处理收集到的表单数据
    const reqData = {
      productName,
      productUserId: id,
      productCategoryId,
      productPrice,
      productStock,
      productDescription,
      productImage
    }
    console.log(reqData);
    
    // 2. 调用接口提交
    createProductAPI(reqData)
  }
  return (
    <div className="publish">
      {/* 圆角区域 结构美化 */}
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/layout'}>首页</Link> },
            { title: '创建商品' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
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
            rules={[{ required: true, message: '请选择商品分类id' }]}
          >
            <Select placeholder="请选择商品分类" style={{ width: 400 }}>
              {/* 后面需要接口数据进行填充 */}
              {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
              {categoryList.map(item => <Option key={item.id} value={item.id}>{item.categoryName}</Option>)}
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
                创建商品
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish