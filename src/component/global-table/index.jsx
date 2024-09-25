import React from 'react';
import { Space, Table, Tag } from 'antd';
 
const Index = ({columns,data }) => <Table columns={columns} dataSource={data} />;
export default Index;