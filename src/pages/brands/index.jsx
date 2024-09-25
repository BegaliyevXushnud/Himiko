import React, { useState, useEffect } from 'react';
import { Button, message, Popconfirm } from 'antd';  
import Brand from '../../../service/brand'; 
import { GlobalTable } from '@component';
import BrandModal from '../../component/modal';
import { useNavigate } from 'react-router-dom'; 

const Brands = () => {
  const [data, setData] = useState([]);  
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState({});
  const navigate = useNavigate(); 

  const getData = async () => {
    try {
      const res = await Brand.get();
      setData(res.data.data.brands); 
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch brands");
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      console.error("Access token not found! Redirecting to home page...");
      navigate("/");  
    } else {
      getData();  
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await Brand.delete(id);
      message.success("Brand deleted successfully");
      getData();  
    } catch (error) {
      console.error(error);
      message.error("Failed to delete brand");
    }
  };

  const editItem = (item) => {
    setUpdate(item);
    setOpen(true);
  };

  const columns = [
    {
      title: 'T/R',
      dataIndex: 'T/R',
      render: (text, item, index) => index + 1,  
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, item) => <a onClick={() => editItem(item)}>{text}</a>,  
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, item) => (
        <div>
          <Button type="link" onClick={() => editItem(item)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(item.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleCancel = () => {
    setOpen(false);
    setUpdate({});  
  };

  return (
    <div>
      <h1>Brands</h1>
      <Button type="default" onClick={() => setOpen(true)}>Open Modal</Button>
      <BrandModal open={open} handleCancel={handleCancel} brand={update} />
      <GlobalTable columns={columns} data={data} />
    </div>
  );
};

export default Brands;
