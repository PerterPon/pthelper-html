
import React, { useEffect, useState } from 'react';

import { requestData } from './request';
import { Descriptions, Progress, Button, message, Space, Table, Tag, Modal } from 'antd';
import LinkChart from './line-chart';
import fileSize from 'filesize';
import LineChart from './line-chart';

import UserLog from './user-log';

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
  render: renderTrend
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
  let { uploadCount, totalUpload, latestSiteData, } = item;
  uploadCount = uploadCount || 0;
  totalUpload = totalUpload || 0;
  latestSiteData = latestSiteData || { downloadCount: 0, uploadCount: 0, shareRatio: 0 };
  const { downloadCount, uploadCount: realUpload, shareRatio } = latestSiteData;
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
        <Tag className='users-ov-item'>
          ↕: 
          <span className='users-ov-item-value'>{shareRatio}</span>
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
          download count:
          <span className='users-ov-item-value'>{fileSize(downloadCount || 0)}</span>
        </Tag>
      </div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item'>
          upload count:
          <span className='users-ov-item-value'>{fileSize(uploadCount || 0)}</span>
        </Tag>
      </div>
      <div className='users-ov-row'>
        <Tag className='users-ov-item'>
          increased count:
          <span className='users-ov-item-value'>{fileSize(increasedCount || 0)}</span>
        </Tag>
      </div>
    </div>
  );
}

function renderTrend(item) {
  const { serverData } = item;
  const userData = [];
  for (const item of serverData) {
    const { gmt_create, upload_count, upload_speed } = item;
    userData.push({ 
      gmt_create, 
      type: 'uploadCount',
      data: upload_count
    });
    userData.push({ 
      gmt_create, 
      type: 'uploadSpeed',
      data: upload_speed
    });
  }
  return (
    <div>
      <LineChart
        data={userData} 
        xField={"gmt_create"}
        yField={"data"}
        seriesField={"type"}
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
      <Space size="middle">
        <Button onClick={ () => onViewUserLog(item)} type="link">View Log</Button>
        <Button onClick={() => onChangeServer(item)} type="link">Scraper</Button>
        <Button onClick={() => onDelete(item)} type="link">Delete</Button>
      </Space>
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
