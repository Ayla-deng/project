
import './index.scss'
import { Card, Form, Input, Button, message } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  //校验逻辑通过，自动触发onFinish函数,用形参接收传过来的实参
  const onFinish = async (Value) => {
    console.log(Value)
    //触发异步action fetchLogin
    await dispatch(fetchLogin(Value))
    //1. 跳转到首页
    navigate('/')
    //2.提示用户的登录成功
    message.success('登录成功')
  }
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form onFinish={ onFinish } validateTrigger='onBlur'>
          
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

