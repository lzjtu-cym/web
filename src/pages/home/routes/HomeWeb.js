import React from 'react'
import {connect} from 'dva'
import { Layout } from 'antd';
import * as styles from './HomeWeb.less'
import HeaderTop from '../components/layout/HeaderTop'

const { Header, Footer, Sider, Content } = Layout;

class HomeWeb extends React.Component {

  render() {
    return (
      <div className={styles.home_web} id='home_web'>
        <Layout>
          <HeaderTop></HeaderTop>
          <div className={styles.home_web_content}>Content</div>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    )
  }
}

// 将需要的state注入到与此试图相关的组件props上
function mapStateToProps (state) {
  return {...state}
}

export default connect(mapStateToProps)(HomeWeb)
