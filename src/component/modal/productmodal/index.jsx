import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import productService from "../../../../service/product";  // Product servisini import qilamiz

const ProductModal = ({ open, handleCancel, product, refreshData }) => {  
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
 
    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                name: product.name, 
                price: product.price, 
            });
        } else {
            form.resetFields(); 
        }
    }, [product, form]);

    const handleSubmit = async (values) => {
        setLoading(true);
        
        try {
            if (product?.id) {
              
                await productService.update(product.id, values);
                message.success("Product updated successfully");
            } else {
                
                await productService.create(values);
                message.success("Product created successfully");
            }
            refreshData(); 
            handleCancel(); 
        } catch (error) {
            console.error(error);
            message.error("Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal 
            open={open} 
            title={product?.name ? "Edit Product" : "Create Product"} 
            footer={null}
            onCancel={handleCancel}  
        >
            <Form
                form={form}
                name="productForm"
                style={{ width: '100%', marginTop: '20px' }}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: "Please enter the product name" }]}
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item
                    label="Product Price"
                    name="price"
                    rules={[{ required: true, message: "Please enter the product price" }]}
                >
                    <Input size="large" type="number" />
                </Form.Item>

                <Form.Item>
                    <Button
                        size="large"
                        style={{ width: "100%" }}
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                    >
                        {product?.name ? "Update" : "Add"}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ProductModal;  
