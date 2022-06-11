
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Layout, Menu, Image } from 'antd';
import React, { useState } from 'react';
import './App.css';

import Portal from './portal';
import Users from './users';
import UserLog from './user-log';
import Servers from './servers';

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
  getItem('Portal', 'portal', <PieChartOutlined />),
  getItem('Users', 'users', <DesktopOutlined />),
  getItem('Servers', 'servers', <UserOutlined />),
];

const keyMap = {
  portal: <Portal></Portal>,
  users: <Users></Users>,
  servers: <Servers></Servers>
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
            <Image src="http://cdn-pt.perterpon.com/tingting.jpg"></Image>
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