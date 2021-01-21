import jwtDecode from 'jwt-decode';

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
    topicList: [ //主题
      { name: '默认蓝', color: '#1890ff' },
      { name: '叶兰绿', color: '#1cc392' },
      { name: '赤城红', color: '#eb3149' },
      { name: '玉烟紫', color: '#9958dc' },
      { name: '芙蕖粉', color: '#f7889c' },
      { name: '露莓黑', color: '#304269' },
      { name: '经典蓝', color: '#114f8e' },
    ],
    topicColor: '#1890ff',
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },

  effects: {
    // 获取token
    * getToken({ params }, { call, put }) {
      yield put({ type: 'setToken', payload: { ...params } });
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
        topicList: [ //主题
          { name: '默认蓝', color: '#1890ff' },
          { name: '叶兰绿', color: '#1cc392' },
          { name: '赤城红', color: '#eb3149' },
          { name: '玉烟紫', color: '#9958dc' },
          { name: '芙蕖粉', color: '#f7889c' },
          { name: '露莓黑', color: '#304269' },
          { name: '经典蓝', color: '#114f8e' },
        ],
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
      const { dispatch, history } = e;
      let _token = !!sessionStorage && sessionStorage.token || '';
      let _appid = !!sessionStorage && sessionStorage.appId || '';
      let _tenantId = !!sessionStorage && sessionStorage.tenantId || '';
      let _roleId = !!sessionStorage && sessionStorage.roleId || '';
      let _userInfo = !!sessionStorage && sessionStorage.accountInfo && JSON.parse(sessionStorage.accountInfo) || {};
      dispatch({
        type: 'getToken',
        params: { token: _token, appId: _appid, tenantId: _tenantId, roleId: _roleId },
      });
      !!_token && dispatch({ type: 'getUserInfo', params: { token: _token } });
    },
    setup({ dispatch, history }) {
      return history.listen(({pathname,search}) => {
        if (pathname === '/') {
          window.__NEW_TITLE = "测试项目";
        }
      })
    },
  },
};
