import {Link} from "react-router-dom";

import { Button } from "antd";

const Load = () => {
  return (
    <div>
      this is load  加载页
      <Button><Link to='/reg'>注册</Link></Button>
      <Button><Link to='/login'>登录</Link></Button>
    </div>
  )
}

export default Load;