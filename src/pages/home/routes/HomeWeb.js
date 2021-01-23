import React from 'react';
import { connect } from 'dva';
import { Layout, message } from 'antd';
import * as styles from './HomeWeb.less';
import HeaderTop from '../components/layout/HeaderTop';

const { Footer } = Layout;

class HomeWeb extends React.Component {

  constructor(props) {
    super(props);
  }

  // 切换个性椎体
  changeTopic = (color) => {
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
      <div className={styles.home_web} id='home_web'>
        <Layout>
          <HeaderTop
            {...this.props.global}
            changeTopic={this.changeTopic.bind(this)}
          />
          <div className={styles.home_web_content}>Content</div>
          <Footer>Footer</Footer>
        </Layout>
      </div>
    );
  }
}

// 将需要的state注入到与此试图相关的组件props上
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(HomeWeb);
