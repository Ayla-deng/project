
import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {
  //校验逻辑通过，自动触发onFinish函数,用形参接收传过来的实参
  const onFinish = formValue => {
    console.log(formValue)
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={ onFinish } validateTrigger='onBlur'>
          <Form.Item
            //name(与后端接口保持一致)指定校验字段名   rules指定校验规则对象
            name="name"
            rules={[
              {
                required: true,
                message: '请输入用户名称'
              }
            ]}
          >
            <Input size="large" placeholder="请输入用户名称" />
          </Form.Item>
          <Form.Item
            name="email"
            //多条校验逻辑 先校验第一条 ，第一条通过后再校验第二条
            rules={[
              {
                required: true,
                message: '请输入邮箱地址'
              },
              {
                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.com$/,
                message: '邮箱格式不对'
              }
            ]}
          >
            <Input size="large" placeholder="请输入邮箱地址" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码'
              }
            ]}
          >
            <Input size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login

