
import React, { useEffect, useState } from 'react';

import { Descriptions, Statistic, PageHeader } from 'antd';

import { requestData } from './request';
import filesize from 'filesize';

import LineChart from './line-chart';

async function loadTrendData() {
  const res = await requestData('overviewInfo');
  return res;
}

const Portal = () => {
  const [dailyUpload, setDailyUpload] = useState(0);
  const [actualUpload, setActualUpload] = useState(0);
  const [increasedUpload, setIncreasedUpload] = useState(0);

  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    loadTrendData().then((res) => {
      setDailyUpload(res.overViewData.uploadCount);
      setActualUpload(res.overViewData.downloadCount);
      setIncreasedUpload(res.overViewData.increasedCount);
      setTrendData(res.serverData);
    });
  }, []);

  return (
    <>
      <Descriptions>
        <Descriptions.Item>
          <Statistic title="Daily Upload:" value={filesize(dailyUpload)}></Statistic>
        </Descriptions.Item>
        <Descriptions.Item>
          <Statistic title="Actual Upload:" value={filesize(actualUpload)}></Statistic>
        </Descriptions.Item>
        <Descriptions.Item>
          <Statistic title="Increased Upload:" value={filesize(increasedUpload)}></Statistic>
        </Descriptions.Item>
      </Descriptions>
      <div className='line-chart-container'>
        <LineChart data={trendData} xField={'gmt_create'} yField={'upload_speed'} seriesField={'name'}></LineChart>
      </div>
    </>
  );
}

export default Portal;