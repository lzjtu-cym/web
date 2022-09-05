import React from 'react';
import { connect } from 'dva';
import { Layout, message, Breadcrumb, ConfigProvider } from 'antd';
import * as styles from './HomeWeb.less';
import HeaderTop from '../components/layout/HeaderTop';
import zh_CN from 'antd/es/locale-provider/zh_CN';

const { Footer, Content } = Layout;

class HomeWeb extends React.Component {

  constructor(props) {
    super(props);
  }

  // 切换个性椎体
  changeTopic = (color) => {
    console.log(color)
    this.props.dispatch({ type: 'global/saveTopicColor', params: { color } });
    window.less.modifyVars({
      '@primary-color': color,
      '@link-color': color,
      '@btn-primary-bg': color,
    })
      .then(() => {
      })
      .catch(error => {
        message.error('Failed to update theme');
      });
  };


  render() {
    return (
      <ConfigProvider locale={zh_CN}>
      <div className={styles.home_web} id='home_web'>
        <Layout>
          <HeaderTop
            {...this.props.global}
            changeTopic={this.changeTopic.bind(this)}
          />
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">Content</div>
          </Content>
          <Footer style={{bottom: '0px', position: 'absolute',width:'100%',textAlign:'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </div>
      </ConfigProvider>
    );
  }
}

// 将需要的state注入到与此试图相关的组件props上
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(HomeWeb);
