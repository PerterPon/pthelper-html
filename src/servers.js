
import React, { useEffect, useState } from 'react';

import { Table } from 'antd';
import { requestData } from './request';
import fileSize from 'filesize';
import LineChart from './line-chart';

const columns = [{
  title: 'ip',
  dataIndex: 'ip',
}, {
  title: 'id',
  dataIndex: 'id',
}, {
  title: 'type',
  dataIndex: 'type'
}, {
  title: 'downloading',
  dataIndex: ''
}, {
  title: 'upload speed',
  render: (item) => {
    const serverData = item.serverData || [];
    const lastestData = serverData[serverData.length - 1];
    if (undefined === lastestData) {
      return;
    }
    const { upload_speed } = lastestData;
    return `${fileSize(upload_speed)}/S`;
  }
}, {
  title: 'download speed',
  render: (item) => {
    const serverData = item.serverData || [];
    const lastestData = serverData[serverData.length - 1];
    if (undefined === lastestData) {
      return;
    }
    const { download_speed } = lastestData;
    return `${fileSize(download_speed)}/S`;
  }
}, {
  title: 'left space',
  render: (item) => {
    const serverData = item.serverData || [];
    const lastestData = serverData[serverData.length - 1];
    if (undefined === lastestData) {
      return;
    }
    const { left_space } = lastestData;
    return `${fileSize(left_space)}`;
  }
}, {
  title: 'trend',
  render: (item) => {
    const serverData = item.serverData || [];
    const data = [];
    for (const item of serverData) {
      const { upload_speed, download_speed, gmt_create } = item;
      data.push({
        gmt_create,
        data: upload_speed,
        type: 'upload speed'
      });
      data.push({
        gmt_create,
        data: download_speed,
        type: 'download speed'
      });
    }
    return (
      <LineChart height={200} data={data} xField="gmt_create" yField="data" seriesField="type"></LineChart>
    )
  }
}];

export default () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    requestData('allServer').then((res) => {
      setLoading(false);
      setData(res);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <Table columns={columns} loading={loading} dataSource={data} />
    </div>
  );
}

