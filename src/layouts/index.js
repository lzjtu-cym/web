import React from 'react';
import { ConfigProvider } from 'antd';
import styles from './index.css';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import Home from 'src/pages/home/routes/HomeWeb';

moment.locale('zh-cn');

class Layout extends React.Component {
  render() {
    return (
      <ConfigProvider locale={zh_CN}>
        <Home className={styles.normal}>
          {this.props.children}
        </Home>
      </ConfigProvider>
    );
  }
}

export default Layout;
