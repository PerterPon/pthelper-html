
import axios from 'axios';
import { message as messageLib } from 'antd';

const host = 'http://hk.perterpon.com/api';

export async function requestData(method, params) {

  const res = await axios({
    url: host,
    method: 'post',
    data: {
      method,
      data: params
    },
    responseType: 'json'
  });
  const { data, success, message } = res.data;
  if (false === success) {
    messageLib.error(message);
    throw new Error(message);
  } else {
    return data;
  }

}
