
import React from "react"
import { Button, Form, Input, InputNumber, Select, Switch, message } from 'antd';

import { requestData } from './request';

export default (props) => {

  let fields = [];

  function onSubmit() {
    const params = {};
    console.log(fields);
    for (const field of fields) {
      const { name, value } = field;
      params[name[0]] = value;
    }

    requestData('addUser', params).then(() => {
      message.success('success');
    })
  }

  return (
    <Form
      name="user-detail"
      fields={props.fields}
      onFieldsChange={(_, allFields) => {
        fields = allFields;
      }}
      onFinish={onSubmit}
      onFinishFailed={(arg1, arg2) => console.log(arg1, arg2)}
    >
      <Form.Item
        name="site"
        label="site"
        rules={[{required: true}]}
      >
        <Select>
          <Select.Option value="mteam">mteam</Select.Option>
          <Select.Option value="hdchina">hdchina</Select.Option>
          <Select.Option value="sjtu">sjtu</Select.Option>
          <Select.Option value="hdtime">hdtime</Select.Option>
          <Select.Option value="audiences">audiences</Select.Option>
          <Select.Option value="ourbits">ourbits</Select.Option>
          <Select.Option value="pterclub">pterclub</Select.Option>
          <Select.Option value="hdarea">hdarea</Select.Option>
          <Select.Option value="pttime">pttime</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="cookie"
        label="cookie"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="uploadCount"
        label="upload count"
        rules={[{required: true}]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="paid"
        label="paid"
        rules={[{required: true}]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="cycleTime"
        label="cycle time"
        rules={[{required: true}]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="rssPasskey"
        label="rss passkey"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="vip"
        label="vip"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="bindServer"
        label="bind server"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="increaseRate"
        label="increase rate"
        rules={[{required: true}]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="tbName"
        label="tb name"
        rules={[{required: true}]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="proxy"
        label="proxy"
      >
        <Switch />
      </Form.Item>
      <Form.Item
        name="proxyAddr"
        label="proxy addr"
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type="primary" htmlType="submit">submit</Button>
      </Form.Item>
    </Form>
  );
}
