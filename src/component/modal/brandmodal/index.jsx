import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import Brand from '../../../service/brand'; 

const BrandModal = ({ open, handleCancel, brand }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (brand) {
      form.setFieldsValue({
        name: brand.name,
        description: brand.description,
        category_id: brand.category_id,
      });
    }
  }, [brand, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    
    try {
      if (brand.id) {
        await Brand.update(brand.id, values); 
      } else {
        await Brand.create(values);
      }
      handleCancel(); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal 
      open={open} 
      title={brand?.name ? "Edit Brand" : "Create Brand"} 
      footer={false}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="brandForm"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Brand Name"
          name="name"
          rules={[{ required: true, message: "Enter brand name" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea size="large" />
        </Form.Item>

        <Form.Item
          label="Category ID"
          name="category_id"
          rules={[{ required: true, message: "Enter category ID" }]}
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
