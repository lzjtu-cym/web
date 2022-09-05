import React from 'react';
import { connect } from 'dva';
import { CaretDownOutlined, CaretRightOutlined, CheckOutlined } from '@ant-design/icons';
import { Tooltip, Dropdown, Popover } from 'antd';
import { Menu } from '../../components';
import styles from './header.less';
import logo from '../../assets/icon/logo.jpg';

class HeaderTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operateId: '',
      topicId: '',
      chooseOperate: false,
    };

    document.onclick = () => {
      this.setState({ chooseOperate: false });
    };
  }

  // 选择主题
  chooseTopic = (color) => {
    this.props.changeTopic(color);
    this.setState({ chooseOperate: false });
  };

  hoverTopic = (id) => {
    this.setState({ topicId: id });
  };

  chooseOperate = (e) => {
    setTimeout(() => {
      this.setState({ chooseOperate: false });
    }, 500);
  };

  hoverOperate = (id) => {
    this.setState({ operateId: id });
  };

  // 个人中心
  toPersonCenter = () => {

  };

  // 注销登录
  onLoginout = () => {

  };

  render() {
    let { chooseOperate, operateId, topicId } = this.state;
    let { topicList } = this.props;
    let topicColor = window.__TOPIC_COLOR;
    let topicListCon = (
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {topicList && topicList.map((item, index) =>
          <li
            key={index}
            onClick={this.chooseTopic.bind(this, item.color)}
            onMouseEnter={this.hoverTopic.bind(this, item.color)}
            style={{
              listType: 'none', cursor: 'pointer',
              margin: 0, padding: 0, fontSize: '12px',
              color: topicId === item.color && topicColor,
            }}
          >
            {item.name}
            {topicColor === item.color &&
            <CheckOutlined style={{ float: 'right', marginTop: '8px', fontSize: '12px' }} />}
          </li>,
        )}
      </ul>
    );

    const operationList = (
      <div style={{
        background: '#fff',
        width: '7em',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        borderRadius: '.3em',
        padding: '0 1em',
      }}>
        <p style={{ fontSize: '14px', borderBottom: '1px solid #f0f0f0', lineHeight: '30px', margin: 0 }}>操作</p>
        <div>
          <p
            onClick={this.toPersonCenter.bind(this)}
            style={{
              margin: 0,
              fontSize: '14px',
              cursor: 'pointer',
              lineHeight: '32px',
              color: operateId === 'personCenter' && topicColor,
            }}
            onMouseEnter={this.hoverOperate.bind(this, 'personCenter')}
          >
            个人中心
          </p>
          <p
            onClick={this.onLoginout.bind(this)}
            style={{
              margin: 0,
              fontSize: '14px',
              cursor: 'pointer',
              lineHeight: '32px',
              color: operateId === 'loginout' && topicColor,
            }}
            onMouseEnter={this.hoverOperate.bind(this, 'loginout')}
          >
            注销登录
          </p>
          <Popover trigger="hover" content={topicListCon} placement="leftTop">
            <p
              onClick={this.toPersonCenter.bind(this)}
              style={{
                margin: 0,
                fontSize: '14px',
                cursor: 'pointer',
                lineHeight: '32px',
                color: operateId === 'topic' && topicColor,
              }}
              onMouseEnter={this.hoverOperate.bind(this, 'topic')}
            >
              个性主题
              <CaretRightOutlined style={{ color: '#ccc', fontSize: '10px' }} />
            </p>
          </Popover>
        </div>
      </div>
    );
    return (
      <div className={styles.headerBox} style={{ background: topicColor }}>
        {/*logo*/}
        <div className={styles.logo}>
          <p className={styles.logo_img}>
            <img src={logo} alt='logo' />
          </p>
          <p className={styles.logo_title}>
            {window.__NEW_TITLE}
          </p>
        </div>
        {/*menu展示*/}
        <div className={styles.menu}>
          <Menu
            ref={ref => {
              window.__Menu__ = ref;
            }}
            {...this.props}
          />
        </div>
        {/*操作列表*/}
        <div className={styles.operation}>
          <ul>
            <li style={{ margin: 0 }}>
              <Tooltip title='操作列表' placement='bottom'>
                <Dropdown trigger='click' overlay={operationList}>
                  <p
                    style={{
                      display: 'inline-block',
                      cursor: 'pointer',
                      background: chooseOperate ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                      lineHeight: '35px',
                      borderRadius: '.5em',
                      padding: '0 .5em',
                    }}
                    onClick={this.chooseOperate.bind(this)}
                  >
                    <span style={{ color: '#fff' }}>{window.__USERINFO__ ? window.__USERINFO__.name : '张三'}</span>
                    <CaretDownOutlined style={{ color: '#fff', marginLeft: '3px' }} />
                  </p>
                </Dropdown>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// 将需要的state注入到与此试图相关的组件props上
function mapStateToProps(state) {
  return { ...state };
}

export default connect(mapStateToProps)(HeaderTop);
