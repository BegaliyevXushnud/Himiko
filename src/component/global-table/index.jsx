import React from 'react';
import { Table } from 'antd';

const Index = ({ columns, data, pagination, handleChange }) => (
    <Table
    columns={columns}
    dataSource={data?.map((item, index) => ({ ...item, key: item.id || index }))}  
    pagination={pagination}
    onChange={handleChange}
    bordered
/>

);

export default Index;
