
import React, { useEffect, useState } from 'react';

import { requestData } from './request';
import { Descriptions, Progress, Button, message, Space, Table, Tag, Modal } from 'antd';
import LinkChart from './line-chart';
import fileSize from 'filesize';
import LineChart from './line-chart';

import UserLog from './user-log';
import moment from 'moment';

async function loadData() {
  const res = await requestData('allUserInfo');
  return res;
}

const columns = [{
  title: 'Overview',
  key: 'Overview',
  render: renderOverview
}, {
  title: 'progress',
  key: 'progress',
  render: renderProgress
}, {
  title: 'daily upload',
  key: 'upload',
  render: renderUpload
}, {
  title: 'trend',
  key: 'trend',
  render: renderTrend,
  width: 600
}, {
  title: 'operate',
  key: 'operate',
  render: renderOperate
}];

function renderOverview(item) {
  const { done, nickname, paid, scraperServer, serverIds, site, uid, vip, uploadCount, proxyAddr, increaseRate } = item;
  return (
    <div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item'>nick: 
          <span className='users-ov-item-value'>{nickname}</span>
        </Tag>
        <Tag className='users-ov-item'>uid: 
          <span className='users-ov-item-value'>{uid}</span>
        </Tag>
        <Tag className='users-ov-item'>site: 
          <span className='users-ov-item-value'>{site}</span>
        </Tag>
      </div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item' color={true === done ? 'green' : 'orange'}>done:
          <span className='user-ov-item-value' >{String(done)}</span>
        </Tag>
        <Tag className='users-ov-item'>vip: 
          <span className='users-ov-item-value'>{vip}</span>
        </Tag>
        <Tag className='users-ov-item' color='green'>paid: 
          <span className='users-ov-item-value'>{paid}</span>
        </Tag>
      </div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item' color="cyan">server:
          <span className='users-ov-item-value'>{scraperServer}</span>
        </Tag>
        <Tag className='users-ov-item'>server ids: 
          <span className='users-ov-item-value'>{serverIds}</span>
        </Tag>
        <Tag className='users-ov-item'>increase rate: 
          <span className='users-ov-item-value'>{increaseRate}</span>
        </Tag>
      </div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item'>proxy addr: 
          <span className='users-ov-item-value'>{proxyAddr}</span>
        </Tag>
      </div>
    </div>
  );
}

function renderProgress(item) {
  let { uploadCount, totalUpload, serverData, latestSiteData, } = item;
  uploadCount = uploadCount || 0;
  totalUpload = totalUpload || 0;
  latestSiteData = latestSiteData || { downloadCount: 0, uploadCount: 0, shareRatio: 0 };
  const { downloadCount, uploadCount: realUpload, shareRatio } = latestSiteData;
  let eta = 0;
  if (true === Array.isArray(serverData) && 2 <= serverData.length) {
    const firstData = serverData[0];
    const latestData = serverData[serverData.length - 1];
    const timeDiff = (new Date(latestData.gmt_create)) - (new Date(firstData.gmt_create));
    const uploadDiff = latestData.upload_count - firstData.upload_count;
    const uploadRate = uploadDiff / timeDiff;
    eta = (uploadCount - totalUpload) / uploadRate;
    eta = Math.max(0, eta);
  }
  return (
    <div>
      <Progress percent={ Math.floor(totalUpload / uploadCount * 100) }></Progress>
      <div className='users-ov-row'>
        <Tag className='users-ov-item'>
          ↑:
          <span className='users-ov-item-value'>{realUpload}T</span>
        </Tag>
        <Tag className='users-ov-item'>
          ↓: 
          <span className='users-ov-item-value'>{downloadCount}T</span>
        </Tag>
      </div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item' color={"green"}>
          ETA: 
          <span className='users-ov-item-value'>{(eta / 1000 / 60 / 60).toFixed(2)}H</span>
        </Tag>
      </div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item'>
          totalUpload: 
          <span className='users-ov-item-value'>{totalUpload.toFixed(2)}</span>
        </Tag>
      </div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item'>
          uploadCount: 
          <span className='users-ov-item-value'>{uploadCount.toFixed(2)}</span>
        </Tag>
      </div>
    </div>
  );
}

function renderUpload(item) {
  const { downloadCount, increasedCount, uploadCount } = item.loadData;
  return (
    <div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item'>
          ↓:
          <span className='users-ov-item-value'>{fileSize(downloadCount || 0)}</span>
        </Tag>
      </div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item'>
          ↑:
          <span className='users-ov-item-value'>{fileSize(uploadCount || 0)}</span>
        </Tag>
      </div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item'>
          ↑↑:
          <span className='users-ov-item-value'>{fileSize(increasedCount || 0)}</span>
        </Tag>
      </div>
    </div>
  );
}

function renderTrend(item) {
  const { serverData } = item;
  // for (const item of serverData) {
  //   console.log(moment(item.gmt_create).format('HH:mm'));
  //   item.gmt_create = moment(item.gmt_create).format('HH:mm');
  // }
  return (
    <div>
      <LineChart
        data={[serverData, serverData]} 
        xField={"gmt_create"}
        yField={['upload_count', 'upload_speed']}
        yaxis={[{
          label: {
            // 数值格式化为千分位
            formatter: (v) => `${Number(v).toFixed(3)} TB`
          }
        }, {
          label: {
            // 数值格式化为千分位
            formatter: (v) => `${Math.round(v / 1024 / 1024)} MB`
          }
        }]}
        height={200} />
    </div>
  );
}

async function onChangeServer(item) {
  const serverId = window.prompt();
  const { uid, site } = item;
  await requestData('updateScraper', {
    serverId, uid, site
  });
  message.success('success!');
}

async function onDelete(item) {
  const { nickname, uid, site } = item;
  const res = window.confirm(`do you want to delete user: [${nickname}]`);
  if (false === res) {
    return;
  }
  await requestData('deleteUser', { uid, site });
}

function renderOperate(item) {
  return (
    <div>
      <div className='users-ov-row'>
        <Button onClick={ () => onViewUserLog(item)} type="link">View Log</Button>
      </div>
      <div className='users-ov-row'>
        <Button onClick={() => onChangeServer(item)} type="link">Scraper</Button>
      </div>
      <div className='users-ov-row'>
        <Button onClick={() => onDelete(item)} type="link">Delete</Button>
      </div>
    </div>
  );
}

function onViewUserLog(item) {
  const { uid, nickname } = item;
  setUserNickFunc(nickname);
  setShowLogUserFunc(uid);
  setShowModalFunc(true);
}

let setUserNickFunc = null;
let setShowLogUserFunc = null;
let setShowModalFunc = null;
let setUserSiteFunc = null;

export default () => {
  
  const [listData, setListData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showLogUser, setShowLogUser] = useState(undefined);
  const [userNick, setUserNick] = useState('');
  const [userSite, setUserSite] = useState('');

  const [loading, setLoading] = useState(false);
  setUserNickFunc = setUserNick;
  setShowLogUserFunc = setShowLogUser;
  setShowModalFunc = setShowModal;
  setUserSiteFunc = setUserSite;

  useEffect(() => {
    setLoading(true);
    loadData().then((data) => {
      setLoading(false);
      setListData(data);
    }).catch(() => {
      setLoading(false);
    });
  }, []);
  return (
    <div className="users">
      <Table loading={loading} dataSource={listData} columns={columns} />
      <Modal width={'50%'} title={userNick} visible={showModal} onOk={() => setShowModal(false)} onCancel={() => setShowModal(false)} >
        <UserLog key={showLogUser} uid={showLogUser} site={userSite}></UserLog>
      </Modal>
    </div>
  );
}
