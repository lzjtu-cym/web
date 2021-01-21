import React from 'react'
import {connect} from 'dva'
import { Tooltip, Dropdown } from 'antd';
import {Menu} from '../../components'
import styles from './header.less'
import logo from '../../assets/icon/logo.jpg'


class HeaderTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let topicColor = window.__TOPIC_COLOR;
    return (
      <div className={styles.headerBox} style={{background: topicColor}}>
        <div className={styles.logo}>
          <p className={styles.logo_img}>
            <img src={logo} />
          </p>
          <p className={styles.logo_title}>
            {window.__NEW_TITLE}
          </p>
        </div>
        <div className={styles.menu}>
          <Menu
            ref={ref => {
              window.__Menu__ = ref
            }}
            {...this.props}
          />
        </div>
        <div className={styles.operation}>
          <ul>
            <li>
              <Tooltip title='操作列表' placement='bottom'>
                <Dropdown trigger='click' overlay={[]}>
                  <p
                    style={{
                      display: 'inline-block',
                      cursor: 'pointer',
                      background: 'transparent',
                      lineHeight: '35px',
                      borderRadius: '.5em',
                      padding: '0 .5em'
                    }}
                    onClick={''}
                  >

                  </p>
                </Dropdown>
              </Tooltip>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

// 将需要的state注入到与此试图相关的组件props上
function mapStateToProps (state) {
  return {...state}
}

export default connect(mapStateToProps)(HeaderTop)
