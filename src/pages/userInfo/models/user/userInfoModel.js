import * as usersService from '../../services/userInfo';
import * as cf from '../../../../utils/commonFunction'

export default {
  /** 命名空间，与文件名保持一致，供route关联 */
  namespace: 'userInfoModel',
  /** state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出 */
  state: {
    userInfoData: [],
    currentPage: 0,
    pageSize: 10,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    /*
     * 通过userServie 接口获取用户数据 ，并updateState进namespace=userInfoModel的state中,
     * state数据发生改变组件UserList调用render()重新加载。
     */
    * getUserInfoData({ payload: { params } }, { call, put }) {
      const { res } = yield call(usersService.gets, { params });
      if (res.code == '200') {
        yield put({
          type: 'updateState',
          payload: {
            userInfoData: res.data,
          },
        });
      } else {
        cf.customNotice({type: 'error', message: res.message});
      }
    },


  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname,search}) => {
        if (window.location.pathname === '/userInfo/routes/userInfoPage') {

        }
      })
    },
  },
};
