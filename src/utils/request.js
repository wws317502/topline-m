/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'

// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' // 基础路径
})
// 处理后端返回数据超出 JS 安全整数范围问题
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch {
    return {}
  }
}]
export default request
