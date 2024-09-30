import { Button, Form, Input, Modal, message, Upload } from "antd";
import { useEffect, useState } from "react";
import brandService from "../../../../service/brand"; // Ensure to adjust the import path
import { UploadOutlined } from '@ant-design/icons';

const BrandModal = ({ open, handleCancel, brand, refreshData }) => {  
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState(null); // Rasm URL sini saqlash

    useEffect(() => {
        if (brand) {
            form.setFieldsValue({
                name: brand.name, 
                description: brand.description,
                category_id: brand.category_id,
            });
            setImageUrl(brand.image); // Rasm URL sini o'rnating
        } else {
            form.resetFields(); // Reset fields when opening for a new brand
            setImageUrl(null); // Yangilanganda rasm URL ni tozalash
        }
    }, [brand, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        
        try {
            // Rasm yuklanganida, URL ni saqlang
            values.image = imageUrl;

            if (brand?.id) {
                // Update brand
                await brandService.update(brand.id, values);
                message.success("Brand updated successfully");
            } else {
                // Create brand
                await brandService.create(values);
                message.success("Brand created successfully");
            }
            refreshData(); // Refresh data after create/update
            handleCancel();
        } catch (error) {
            console.error(error);
            message.error("Failed to save brand");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (info) => {
        if (info.file.status === 'done') {
            const url = URL.createObjectURL(info.file.originFileObj); // Rasm yuklanganidan so'ng URL yaratish
            setImageUrl(url);
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    return (
        <Modal 
            open={open} 
            title={brand?.name ? "Edit Brand" : "Create Brand"} 
            footer={null}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                name="brandForm"
                style={{ width: '100%', marginTop: '20px' }}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item
                    label="Brand Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter the brand name" }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: "Please enter a description" }]}
                >
                    <Input size="large" />
                </Form.Item>
                <Form.Item
                    label="Image"
                    name="image"
                    rules={[{ required: true, message: "Please upload an image" }]}
                >
                    <Upload
                        name="image"
                        listType="picture"
                        showUploadList={false}
                        onChange={handleImageChange}
                    >
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                    {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ marginTop: '10px', width: '100px', height: '100px' }} />} {/* Rasm ko'rsatish */}
                </Form.Item>
                <Form.Item
                    label="Category ID"
                    name="category_id"
                    rules={[{ required: true, message: "Please enter the category ID" }]}
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item>
                    <Button
                        size="large"
                        style={{ width: "100%" }}
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        {brand?.name ? "Update" : "Add"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default BrandModal;
