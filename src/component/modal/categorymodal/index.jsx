import { Button, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";

const CategoryModal = ({ open, handleCancel, category }) => {  
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
 
  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name, 
      });
    }
  }, [category, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    
    if(category.id){
        console.log(values,'update');
    } else {
        console.log(values, 'create');
    }
    
    setLoading(false);
    handleCancel(); 
  };

  return (
    <Modal 
      open={open} 
      title={category?.name ? "Edit category" : "Create category"} 
      footer={false}
      onCancel={handleCancel}  
    >
      <Form
        form={form}
        name="categoryForm"
        style={{ width: '100%', marginTop: '20px' }}
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          label="Category name"
          name="name"
          rules={[{ required: true, message: "Enter category name" }]}
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
            {category?.name ? "Update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryModal;  
