import React, { useState, useEffect } from 'react';
import { Button, message, Popconfirm } from 'antd';  
import { product } from '../../../service';  
import { GlobalTable } from '@component';
import ProductModal from '@modals';  
import { useNavigate, useLocation } from 'react-router-dom';

const Product = () => {
    const [data, setData] = useState([]);  
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState({});
    const [params, setParams] = useState({ page: 1, limit: 3 });
    const navigate = useNavigate();
    const location = useLocation(); 

    const getData = async () => {
        try {
            const res = await product.get(params); 
            setData(res?.data?.data?.products);  
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 3;
        
        setParams({
            page,
            limit
        });
    }, [location.search]);

    useEffect(() => {
        getData();
    }, [params]);

    const handleTableChange = (pagination) => {
        const { current = 1, pageSize = 10 } = pagination;
        
        setParams((prev) => ({
            ...prev,
            page: current,
            limit: pageSize,
        }));
    
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", current);
        searchParams.set("limit", pageSize);
    
        navigate(`?${searchParams.toString()}`);  
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
            await product.delete(id);  
            message.success("Product deleted successfully");
            getData();  
        } catch (error) {
            console.error(error);
            message.error("Failed to delete product");
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
            key: 'index',  
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, item) => <a onClick={() => editItem(item)}>{text}</a>,  
            key: 'name', 
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price', 
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
            key: 'action',  
        },
    ];

    const handleCancel = () => {
        setOpen(false);
        setUpdate({});  
    };

    return (
        <div>
            <h1>Products</h1>
            <Button type="default" onClick={() => setOpen(true)}>Open Modal</Button>
            <ProductModal open={open} handleCancel={handleCancel} product={update} />
            <GlobalTable 
                columns={columns} 
                data={data || []} 
                pagination={{
                    current: params.page,
                    pageSize: params.limit,
                    total: data?.length || 0, 
                    showSizeChanger: true,
                    pageSizeOptions: ['2', '5', '7', '10', '12'],
                    onChange: handleTableChange,
                }} 
                handleChange={handleTableChange}
            />
        </div>
    );
};

export default Product;
