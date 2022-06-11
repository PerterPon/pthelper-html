
import React, { useEffect, useState } from 'react';

import { Spin, Collapse } from 'antd';

import { requestData } from './request';
import * as moment from 'moment';

async function loadData(uid, site) {
  const res = await requestData('userLog', { uid, site });
  return res;
}

function renderPanel(data) {
  const panels = [];
  for (const item of data) {
    const { messages, log_link, gmt_create } = item;
    panels.push(
      <Collapse.Panel header={
        <div>
          {moment(gmt_create).format('YYYY-MM-DD HH:mm:SS')}
          <a href={log_link} target="_blank">{log_link}</a>
        </div>
      }>
        <div className='log-container'>
          {messages}
        </div>
      </Collapse.Panel>
    );
  }
  return panels;
}

export default (props) => {

  const [loading, setLoging] = useState(false);
  const [data, setData] = useState([]);

  const { uid, site } = props;

  useEffect(() => {
    if ('' === uid || !uid) {
      return;
    }
    setLoging(true);
    loadData(uid, site).then((resData) => {
      setLoging(false);
      setData(resData);
    }).catch(() => {
      setLoging(false);
    })
  }, []);

  return (
    <div className='user-log'>
      <Spin spinning={loading} />
      <Collapse defaultActiveKey={['0']} ghost>
        {renderPanel(data)}
      </Collapse>
    </div>
  );
}
