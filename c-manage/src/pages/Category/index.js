import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
//时间选择器汉化处理
import locale from 'antd/es/date-picker/locale/zh_CN'

// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'

const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  // 准备列数据
  const columns = [
    {
      title: '商品图片',
      dataIndex: 'cover',
      width: 180,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '商品名称',
      dataIndex: 'productName',
      // width: 220
    },
    {
      title: '商品类别',
      dataIndex: 'productCategoryId',
      // render: data => <Tag color="green">审核通过</Tag>
    },
    {
      title: '商品用户id',
      dataIndex: 'productUserId',
      // render: data => <Tag color="green">审核通过</Tag>
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
  // 准备表格body数据
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/layout'}>首页</Link> },
            { title: '商品列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }}>
          {/* <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item> */}

          <Form.Item label="商品分类" name="category">
            <Select
              placeholder="请选择商品分类"
              style={{ width: 120 }}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 count 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={data} />
      </Card>
    </div>
  )
}

export default Article