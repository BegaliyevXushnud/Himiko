
import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';

const ProductModal = ({ open, handleCancel, product }) => {  
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,  
        price: product.price,  
        
      });
    }
  }, [product, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('price', values.price);
   
    if (values.files) {
      formData.append('files', values.files[0].originFileObj);
    }

    if (product.id) {
      console.log('Updating product:', values);
  
    } else {
      try {
        console.log('Creating product:', values);
        const response = await fetch('https://texnoark.ilyosbekdev.uz/products/create', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: formData,
        });

        if (response.ok) {
          message.success("Product created successfully");
        } else {
          throw new Error("Failed to create product");
        }
      } catch (error) {
        console.error(error);
        message.error("Failed to create product");
      }
    }
    
    setLoading(false);
    handleCancel(); 
  };

  return (
    <Modal 
      open={open} 
      title={product?.name ? "Edit Product" : "Create Product"} 
      footer={false}
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
          rules={[{ required: true, message: "Enter product name" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Enter product price" }]}
        >
          <Input type="number" size="large" />
        </Form.Item>

        <Form.Item
          label="Upload Image"
          name="files"
        >
          <Upload
            beforeUpload={() => false} 
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
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
