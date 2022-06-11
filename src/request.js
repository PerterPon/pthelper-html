
import axios from 'axios';

const host = 'http://127.0.0.1:8081/api'

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

  return res.data.data;
}
