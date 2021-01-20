import React from 'react';
import { LocaleProvider } from 'antd';
import styles from './index.css';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import moment from 'moment';
import Home from 'src/pages/home/routes/HomeWeb';

moment.locale('zh-cn');

class Layout extends React.Component {
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <Home className={styles.normal}>
          {this.props.children}
        </Home>
      </LocaleProvider>
    );
  }
}

export default Layout;
