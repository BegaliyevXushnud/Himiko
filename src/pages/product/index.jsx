import React, { useState, useEffect } from 'react';
import { Button, message, Popconfirm } from 'antd';  
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'; 
import { productService } from '../../../service';  
import { GlobalTable } from '@component'; 
import ProductModal from '../../component/modal';  
import { useNavigate } from 'react-router-dom';  

const Product = () => {
    const [data, setData] = useState([]);  
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);  
    const [totalItems, setTotalItems] = useState(0); 
    const navigate = useNavigate();  

    const getData = async (page = 1, limit = 10) => {
        try {
            const res = await productService.get({ params: { page, limit } });
            setData(res?.data?.data?.products || []);  
            setTotalItems(res?.data?.data?.total || 0);  
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        if (!access_token) {
            console.error("Access token topilmadi! Bosh sahifaga yo'naltirilmoqda...");
            navigate("/");  
        } else {
            getData(currentPage, pageSize);  
        }
    }, [navigate, currentPage, pageSize]);

    const handleDelete = async (id) => {
        try {
            await productService.delete(id);  
            message.success("Product muvaffaqiyatli o'chirildi");
            getData(currentPage, pageSize);  
        } catch (error) {
            console.error(error);
            message.error("Productni o'chirishda xatolik yuz berdi");
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
            render: (text, item, index) => (currentPage - 1) * pageSize + index + 1,  
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            render: (text, item) => <a onClick={() => editItem(item)}>{text}</a>,  
        },
        {
            title: 'Price',
            dataIndex: 'price',  
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, item) => (
                <div>
                    <Button type="link" icon={<EditOutlined />} onClick={() => editItem(item)} />
                    <Popconfirm
                        title="Mahsulotni o'chirishni tasdiqlaysizmi?"
                        onConfirm={() => handleDelete(item.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleCancel = () => {
        setOpen(false);
        setUpdate(null);  
    };

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <div>
            <h1>Products</h1>
            <Button type="default" onClick={() => setOpen(true)}>Open Modal</Button>
            <ProductModal open={open} handleCancel={handleCancel} product={update} refreshData={() => getData(currentPage, pageSize)} />
            <GlobalTable 
                columns={columns} 
                data={data} 
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalItems,
                    onChange: handlePageChange,
                    showSizeChanger: true,
                    pageSizeOptions: [2, 5, 7, 10]
                }}
            />
        </div>
    );
};

export default Product;
