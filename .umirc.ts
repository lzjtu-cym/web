import { IConfig } from 'umi-types';
const routes = require( './src/routes');
const resolve = require( 'path').resolve();

// ref: https://umijs.org/config/
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
    src: resolve(__dirname, './src/'),
    config: resolve(__dirname, './src/config/'),
    pages: resolve(__dirname, './src/pages/'),
    utils: resolve(__dirname, './src/utils/'),
    services: resolve(__dirname, './src/services/'),
    assets: resolve(__dirname, './src/assets/'),
  }
}

export default config;
