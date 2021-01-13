import React from 'react'
import connect from 'dva'
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class HomeWeb extends React.Component {

  render() {
    return (
      <div>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
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
