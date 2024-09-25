
    import React, { useState, useEffect } from 'react';
    import { Button, message, Popconfirm } from 'antd';  
    import { category } from '../../../service';
    import { GlobalTable } from '@component';
    import CategoryModal from '../../component/modal';
    import { useNavigate } from 'react-router-dom';  

    const Category = () => {
    const [data, setData] = useState([]);  
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState({});
    const navigate = useNavigate();  

   
    const getData = async () => {
        try {
        const res = await category.get();
        setData(res?.data?.data.categories);
        } catch (err) {
        console.error(err);
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
        await category.delete(id);
        message.success("Category deleted successfully");
        getData();  
        } catch (error) {
        console.error(error);
        message.error("Failed to delete category");
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
        <h1>Categories</h1>
        <Button type="default" onClick={() => setOpen(true)}>Open Modal</Button>
        <CategoryModal open={open} handleCancel={handleCancel} category={update} />
        <GlobalTable columns={columns} data={data} />
        </div>
    );
    };

    export default Category;
