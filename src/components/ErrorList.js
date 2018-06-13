import "antd/lib/alert/style/css";
import "antd/lib/list/style/css";

import { Alert, List } from "antd";

import React from "react";

export default function ErrorList(props) {
  const { errors } = props;
  return (
    <Alert
      message="错误信息"
      description={
        <List
          dataSource={errors.map(x => x.stack)}
          renderItem={item => <List.Item>{item}</List.Item>}
          size="small"
        />
      }
      type="error"
      closable
      showIcon
    />
  );
}
