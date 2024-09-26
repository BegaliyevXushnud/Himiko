import { Button, Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import brandService from "../../../../service/brand"; // Ensure to adjust the import path

const BrandModal = ({ open, handleCancel, brand, refreshData }) => {  
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
 
    useEffect(() => {
        if (brand) {
            form.setFieldsValue({
                name: brand.name, 
                description: brand.description,
                image: brand.image,
                category_id: brand.category_id,
            });
        } else {
            form.resetFields(); // Reset fields when opening for a new brand
        }
    }, [brand, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        
        try {
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
                    label="Image URL"
                    name="image"
                    rules={[{ required: true, message: "Please enter an image URL" }]}
                >
                    <Input size="large" />
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
