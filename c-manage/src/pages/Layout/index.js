//token是否成功注入的测试
import { request } from "@/utils";
import { useEffect } from "react";
const Layout = () => {
  useEffect(() => {
    request.get('/user')
  },[])
  return <div>this is Layout</div>;
}

export default Layout;