import Axios from 'axios';
import qs from 'qs';
import { customeNotice } from './commonFunction';

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const request = function(type, url, params, isToast, responseType = 'json', stringify = true) {
  type = type || 'get';
  if (!url) {
    throw new Error('请指定url');
  }
  let obj = {};
  params = (Object.prototype.toString.call(params) === '[object Object]' || Object.prototype.toString.call(params) === '[object Array]') ? params : {};
  if (type === 'get') {
    obj.method = 'get';
    obj.url = url;
    obj.params = params;
    obj.responseType = responseType;
  } else if (type === 'post') {
    obj.method = 'post';
    obj.url = url;
    if (stringify) {
      params = qs.stringify(params);
    }
    obj.data = params;
    obj.responseType = responseType;
  } else if (type === 'postBody') {
    obj.method = 'post';
    obj.url = url;
    obj.data = params;
    obj.responseType = responseType;
  } else {
    throw new Error('请指定请求方式');
  }
  const instance = Axios.create();
  // 当创建实例的时候，拦截器放在default无效
  instance.interceptors.request.use((config) => {
    // 不能使用null，否则会将token的值变成'null'
    //config.headers.Authorization = window.__TOKEN___ || '';
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  instance.interceptors.response.use((response) => response, (error) => Promise.reject(error));

  return new Promise((resolve, reject) => {
    instance.request(obj)
      .then((res) => {
        if (res.status == 200) {
          /**
           * 如果返回的事blob 则直接返回
           */
          if (res.data instanceof Blob) {
            return resolve(res);
          }
          /**
           * 无权限处理
           */
          if (res.data.code == 401) {
            customeNotice({type: 'error', message: res.data.message && res.data.message || '你无权限', description: ''});
            return window.g_app._store.dispatch({ type: 'global/getUngrantInfo', params: {} });
          }
          /**
           * 有权限
           */
          if (res.data.code == '200' || res.data.code == '201' || res.data.code == '202' || res.data.code == '204' || res.data.code == 'SUCCESS') {
            isToast && customeNotice({type: 'success', message: res.data.message && res.data.message || '请求成功', description: ''});
            return resolve(res.data);
          } else {
            isToast && customeNotice({type: 'error', message: res.data.message && res.data.message || '请求失败', description: ''});
            return resolve(res.data);
          }
        }
        customeNotice({type: 'error', message: '请求失败', description: ''});
        return resolve(res.data);
      }, (err) => {
        let parseError = JSON.parse(JSON.stringify(err));
        let code = parseError.response.status;
        if (code == 401) {
          window.g_app._store.dispatch({ type: 'global/getUngrantInfo', params: {} });
        }
        if (code >= 500) {
          customeNotice({type: 'error', message: '服务端异常', description: ''});
        }
        if (code == 'ECONNABORTEO') {
          customeNotice({type: 'error', message: '请求超时', description: ''});
        }
        reject(code);
      })
      .catch((e) => {
        customeNotice({type: 'error', message: '异常', description: ''});
        reject(e);
      });
  });
};

export default request;

