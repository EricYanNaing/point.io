import { Checkbox, Col, Form, Input, Row, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const Addproduct = () => {
  const categoryOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home_garden", label: "Home & Garden" },
    { value: "sports", label: "Sports" },
    { value: "beauty_health", label: "Beauty & Health" },
    { value: "toys", label: "Toys" },
    { value: "automotive", label: "Automotive" },
    { value: "books", label: "Books" },
  ];
  const checkBoxOptions = [
    {
      label: "Accessories",
      value: "Accessories",
    },
    {
      label: "Warranty",
      value: "Warranty",
    },
    {
      label: "Voucher",
      value: "Voucher",
    },
  ];
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">What you want to sell?</h1>
      <Form layout="vertical">
        <Form.Item
          hasFeedback
          name="product_name"
          label="Product Name"
          rules={[
            { required: true, message: "Product Name must be included." },
            { min: 5, message: "Product Name must have 5 words at least." },
          ]}
        >
          <Input placeholder="product name..." />
        </Form.Item>
        <Form.Item
          hasFeedback
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Description must be included.",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              hasFeedback
              name="price"
              label="Product Price"
              rules={[
                { required: true, message: "Product Price must be included." },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              hasFeedback
              name="product_category"
              label="Choose A Category"
              rules={[
                {
                  required: true,
                  message: "Product Category must be included.",
                },
              ]}
            >
              <Select defaultValue={""} options={categoryOptions}></Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              hasFeedback
              name="product_used_for"
              label=" Used For"
              rules={[
                {
                  required: true,
                  message: "Product Used Times must be included.",
                },
                {
                  min: 5,
                  message: "Product Used Times must have 5 words at least.",
                },
              ]}
            >
              <Input placeholder="eg : (3 months ago)..." />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="product_details" label="This product has">
          <Checkbox.Group options={checkBoxOptions} defaultValue={[""]} />
        </Form.Item>
        <button className="font-medium text-lg text-center rounded-md bg-blue-500 text-white flex items-center p-1 gap-2 justify-center w-full my-4">
          {" "}
          <PlusCircleIcon width={26} />
          Sell
        </button>
      </Form>
    </section>
  );
};

export default Addproduct;
