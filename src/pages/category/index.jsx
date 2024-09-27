import React, { useState, useEffect } from 'react';
import { Button, message, Input, Table } from 'antd';
import { category } from '../../../service';
import { useNavigate, useLocation } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import CategoryModal from '@modals';
import { GlobalPopconfirm } from '../../component'; // Adjust the import path as necessary
import './index.css';

const { Search } = Input;

const Category = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
    const { search } = useLocation();

    const getQueryParams = () => {
        const params = new URLSearchParams(search);
        const page = params.get('page') ? parseInt(params.get('page')) : 1;
        const limit = params.get('limit') ? parseInt(params.get('limit')) : 5;
        return { page, limit };
    };

    const getData = async (page = 1, limit = 10, query = '') => {
        try {
            const res = await category.get({
                params: { 
                    page, 
                    limit, 
                    search: query 
                },
            });
            setData(res?.data?.data?.categories || []);
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
            const { page, limit } = getQueryParams();
            setCurrentPage(page);
            setPageSize(limit);
            getData(page, limit, searchQuery);
        }
    }, [navigate, search, searchQuery]);

    const handleDelete = async (id) => {
        try {
            await category.delete(id);
            message.success("Category muvaffaqiyatli o'chirildi");
            getData(currentPage, pageSize, searchQuery);
        } catch (error) {
            console.error(error);
            message.error("Categoryni o'chirishda xatolik yuz berdi");
        }
    };

    const editItem = (item) => {
        setUpdate(item);
        setOpen(true);
    };

    const columns = [
        {
            title: '№',
            dataIndex: 'index',
            render: (text, item, index) => (currentPage - 1) * pageSize + index + 1,
        },
        {
            title: 'Category name',
            dataIndex: 'name',
            render: (text, item) => <a onClick={() => editItem(item)}>{text}</a>,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, item) => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button type="link" icon={<EditOutlined />} onClick={() => editItem(item)} />
                    <GlobalPopconfirm
                        title="Categoryni o'chirishni tasdiqlaysizmi?"
                        onConfirm={() => handleDelete(item.id)}
                    >
                        <Button type="link" danger icon={<DeleteOutlined />} />
                    </GlobalPopconfirm>
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
        const current_params = new URLSearchParams(search);
        current_params.set('page', `${page}`);
        current_params.set('limit', `${pageSize}`);
        navigate(`?${current_params}`);
        getData(page, pageSize, searchQuery);
    };

    const onSearch = (value) => {
        setSearchQuery(value);
        getData(currentPage, pageSize, value);
    };

    const refreshData = () => {
        getData(currentPage, pageSize, searchQuery);
    };

    return (
        <div>
            <div className="header-container">
                <Search
                    className="search-input"
                    placeholder="Search category..."
                    onSearch={onSearch}
                    allowClear
                />
                <Button className="add-btn" type="primary" onClick={() => setOpen(true)}>Add New Category</Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalItems,
                    onChange: handlePageChange,
                    showSizeChanger: true,
                    pageSizeOptions: [2, 5, 7, 10],
                }}
                rowKey={(item) => item.id}
            />
            
            <CategoryModal
                open={open}
                handleCancel={handleCancel}
                category={update}
                refreshData={refreshData}
            />
        </div>
    );
};

export default Category;