import config from '../config/commonConfig';
import request from '../utils/request';

export const testServiceApi = {
  getById: `${config.SERVICE_DOMAIN}/test/get-by-id`
}
export function getById(id) {
  return request('get', `${testServiceApi.getById}`, {id} , false);
}
