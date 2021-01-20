

export default {
  /** 命名空间，与文件名保持一致，供route关联 */
  namespace: 'homeModel',
  /** state: 该 Model 当前的状态。数据保存在这里，直接决定了视图层的输出 */
  state: {
    currentPage: 0,
    pageSize: 10,
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {


  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({pathname,search}) => {
        if (pathname === '/home/routes/HomeWeb') {

        }
      })
    },
  },
};
