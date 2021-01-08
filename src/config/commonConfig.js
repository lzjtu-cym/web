// 后端服务地址
const SERVICE_DOMAIN = 'http://127.0.0.1:8080';

const config = {
  isDev: process.env.NODE_ENV === 'development',
  name: '测试项目',
  preFix: 'jspro',
  ROUTE_TOOL_LIMIT: false, // 工具按钮权限
  PAGE_SIZE: 10,

  SERVICE_DOMAIN,
  // 后端服务接口
  SERVICE_API: {
    USER_INFO_API: `${SERVICE_DOMAIN}/user-service`
  }
}

export default config;
