const path = require('path');
const { generateTheme,getLessVars } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, './src/styles'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/variables.less'),
  mainLessFile: path.join(__dirname, './src/styles/index.less'),
  themeVariables: [
    //需要动态切换的主题变量
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-color',
    '@layout-header-background',
  ],
  indexFileName: './src/pages/index.ejs',
  outputFilePath: path.join(__dirname, './public/css/color.less'), //页面引入的主题变量文件
  customColorRegexArray: [/^fade\(.*\)$/]
};

generateTheme(options)
  .then(less => {
    console.log('Theme generated successfully');
  })
  .catch(error => {
    console.log('Error', error);
  });
