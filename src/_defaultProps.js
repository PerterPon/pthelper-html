import { AntDesignOutlined, CrownOutlined, SmileOutlined, TabletOutlined } from '@ant-design/icons';
import React from 'react';

import Portal from './portal';
import Users from './users';
import Servers from './user-log';
import UserLogs from './servers';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: 'Portal',
        icon: <SmileOutlined />,
        component: <Portal></Portal>
      },
      {
        path: '/admin',
        name: '管理页',
        icon: <CrownOutlined />,
        component: <Users></Users>
      },
      {
        name: '列表页',
        icon: <TabletOutlined />,
        path: '/list',
        component: <Servers></Servers>,
      },
    ],
  },
  location: {
    pathname: '/',
  },
};