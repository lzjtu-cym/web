import React from 'react'
import {connect} from 'dva'
import { Layout } from 'antd';

const { Header} = Layout;

class HeaderTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div id='home_header'>
        <Header>
          aasdad
        </Header>
      </div>
    )
  }
}

// 将需要的state注入到与此试图相关的组件props上
function mapStateToProps (state) {
  return {...state}
}

export default connect(mapStateToProps)(HeaderTop)
