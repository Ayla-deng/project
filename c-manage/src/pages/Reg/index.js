/* eslint-disable no-useless-escape */

import './index.scss'
import { Card, Form, Input, Button, message, Checkbox } from 'antd'
import logo from '@/assets/logo.png'
// import { useDispatch } from 'react-redux'
// import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import { createUserAPI } from '@/apis/user'


const Reg = () => {
  // const dispatch = useDispatch()
  const navigate = useNavigate()
  //校验逻辑通过，自动触发onFinish函数,用形参接收传过来的实参
  const onFinish = async (Value) => {
    console.log(Value)

    const { name, email, password } = Value
        // 1. 按照接口文档的格式处理收集到的表单数据
        const reqData = {
          name,
          email,
          password
        }
        console.log(reqData);
        
        // 2. 调用接口提交
        createUserAPI(reqData)

    //触发异步action fetchLogin
    // await dispatch(fetchLogin(Value))
    //1. 跳转到首页
    navigate('/login')
    //2.提示用户的注册成功
    message.success('注册成功')
  }
  const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 注册表单 */}
        <Form onFinish={ onFinish }  onFinishFailed={onFinishFailed} validateTrigger='onBlur'>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: '请输入你的用户名'
              }
            ]}
          >
            <Input size="large" placeholder="请输入用户名" />
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
                // pattern: /^[\w\.-]+@[\w\.-]+\.\com$/,   //@ .com 邮箱格式
                pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.com$/, //qq.com
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
            <Input.Password size="large" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
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

export default Reg

