import jwtDecode from 'jwt-decode';
import * as homeConfig from 'src/pages/home/config/homeConfig'

export default {
  /** 命名空间，与文件名保持一致，供route关联 */
  namespace: 'global',
  /** state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出 */
  state: {
    token: '',
    userInfo: {}, // 用户信息
    tenantId: '', // 租户ID
    appId: '', // 应用ID
    roleId: '', // 角色ID
    userType: '', // 用户类型
    userIndentity: '', // 用户身份
    currentPage: 0,
    pageSize: 10,
    topicList: homeConfig.default.topicList || [],
    topicColor: '#1890ff',
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    // init
    * init({ params }, { call, put }) {
      yield put({ type: 'updateState', payload: { ...params } });
    },
    // 切换主题
    * saveTopicColor({ params }, { call, put, select }) {
      let color = params;
      yield put({ type: 'updateState', payload: { topicColor: color } });
      // 存储主题颜色
      localStorage.topicColor = color;
      window.__TOPIC_COLOR = color;
    },
    // 获取用户信息
    * getUserInfo({ params }, { call, put, select }) {
      if (!params.token) return false;
      let userInfo = jwtDecode(params.token) || {};
      // 存储用户信息
      sessionStorage.userInfo = JSON.stringify(userInfo);
      window.__USERINFO__ = userInfo;
      yield put({ type: 'updateState', payload: { userInfo } });
    },
    // 用户请求无权限或者注销
    * getUngrantInfo({ params }, { call, put, select }) {
      let token = yield select(state => state.global);
      let _token = token || sessionStorage.token || '';

      // 删除本地数据，并重置global models, 重定向个人登录
      sessionStorage.token && delete sessionStorage.token;
      sessionStorage.accountInfo && delete sessionStorage.accountInfo;
      let initialState = {
        token: '',
        userInfo: {}, // 用户信息
        tenantId: '', // 租户ID
        appId: '', // 应用ID
        roleId: '', // 角色ID
        userType: '', // 用户类型
        userIndentity: '', // 用户身份
        currentPage: 0,
        pageSize: 10,
        topicList: homeConfig.default.topicList || [],
        topicColor: '#1890ff',
      };
      sessionStorage.token && (delete sessionStorage.token);
      sessionStorage.appId && (delete sessionStorage.appId);
      sessionStorage.tenantId && (delete sessionStorage.tenantId);
      sessionStorage.accountInfo && (delete sessionStorage.accountInfo);
      sessionStorage.userInfo && (delete sessionStorage.userInfo);
      sessionStorage.menuList && (delete sessionStorage.menuList);
      sessionStorage.menuId && (delete sessionStorage.menuId);

      yield put({ type: 'updateState', payload: { ...initialState } });
      const parentUrl = /http:\/\/([^\/]*)/;
      window.location.replace(parentUrl + '?logout=' + _token);
    },

  },
  subscriptions: {
    getGlobalData(e) {
      const { dispatch } = e;
      let _token = !!sessionStorage && sessionStorage.token || '';
      let _appId = !!sessionStorage && sessionStorage.appId || '';
      let _tenantId = !!sessionStorage && sessionStorage.tenantId || '';
      let _roleId = !!sessionStorage && sessionStorage.roleId || '';
      let _userInfo = !!sessionStorage && sessionStorage.accountInfo && JSON.parse(sessionStorage.accountInfo) || {};
      dispatch({
        type: 'init',
        params: { token: _token, appId: _appId, tenantId: _tenantId, roleId: _roleId, userInfo: _userInfo },
      });
      !!_token && dispatch({ type: 'getUserInfo', params: { token: _token } });
    },
    setup({ dispatch, history }) {
      return history.listen(({pathname,search}) => {
        if (pathname === '/') {
          window.__NEW_TITLE = "测试项目";
          localStorage.topicColor = '#1890ff';
          window.__TOPIC_COLOR = '#1890ff';
        }
      })
    },
  },
};
