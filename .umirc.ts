import { IConfig } from 'umi-types';
const routes = require( './src/routes');
const path = require( 'path');

const config: IConfig =  {
  treeShaking: true,
  hash: true,
  routes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: false,
      title: 'web',
      dll: false,

      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:9049',
      changeOrigin: true,
      "pathRewrite": {"^api": ""}

    }
  },
  // 设置文件夹别名
  alias: {
    src: path.resolve(__dirname, './src/'),
    config: path.resolve(__dirname, './src/config/'),
    pages: path.resolve(__dirname, './src/pages/'),
    utils: path.resolve(__dirname, './src/utils/'),
    services: path.resolve(__dirname, './src/services/'),
    assets: path.resolve(__dirname, './src/assets/'),
  }
}

export default config;
