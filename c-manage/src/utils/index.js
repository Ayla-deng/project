// 统一中转工具模块函数
// import {request} from '@/utils'

import request from './request'
import { setToken, getToken, removeToken } from './token'

// 做一个中转导出 统一从index.js里进行导入
export {
  request,
  setToken, getToken, removeToken
}