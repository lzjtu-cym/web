import React from 'react';
import styles from './index.css';
import moment from 'moment';
import Home from 'src/pages/home/routes/HomeWeb';

moment.locale('zh-cn');

class Layout extends React.Component {
  render() {
    return (
      <Home className={styles.normal}>
        {this.props.children}
      </Home>
    );
  }
}

export default Layout;
