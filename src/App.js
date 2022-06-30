
import {
  PieChartOutlined,
  HomeOutlined,
  EditOutlined,
  CloudServerOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Image } from 'antd';
import React, { useState } from 'react';
import './App.css';

import Portal from './portal';
import Users from './users';
import Servers from './servers';
import UserDetail from './user-detail';

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Portal', 'portal', <HomeOutlined />),
  getItem('Users', 'users', <UserOutlined />),
  getItem('Servers', 'servers', <CloudServerOutlined />),
  getItem('Add User', 'userDetail', <EditOutlined />),
];

const keyMap = {
  portal: <Portal></Portal>,
  users: <Users></Users>,
  servers: <Servers></Servers>,
  userDetail: <UserDetail fields={[
    {
      name: 'increaseRate',
      value: 1.13
    }, 
    {
      name: 'bindServer',
      value: '-1'
    }, 
    {
      name: 'proxy',
      value: false
    }, 
    {
      name: 'proxyAddr',
      value: 'http://hk.perterpon.com:4230'
    }, 
    {
      name: 'cycleTime',
      value: 10
    },
  ]}></UserDetail>
};

const defaultKey = 'users';

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [Comp, setComp] = useState(keyMap[defaultKey]);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={[defaultKey]} onSelect={(value) => setComp(keyMap[value.key])} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background site-header"
          style={{
            padding: 0,
          }}
        >
          <Avatar className="avatar" src={
            <Image src="http://cdn-pt.perterpon.com/html/logo.png"></Image>
          }></Avatar>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {Comp}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Powered By PTHelper
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;