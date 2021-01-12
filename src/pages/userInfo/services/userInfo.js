import config from '../../../config/commonConfig';
import request from '../../../utils/request';

export const testServiceApi = {
  getById: `${config.SERVICE_DOMAIN}/userInfo/get-by-id`,
  gets: `${config.SERVICE_DOMAIN}/userInfo/gets`,
}
export function getById(id) {
  return request('get', `${testServiceApi.getById}`, {id} , false);
}

export function gets(params) {
  return request('get', `${testServiceApi.getById}`, {...params} , false);
}
