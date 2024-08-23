import { Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  getOldProduct,
  sellProduct,
  updateProductValues,
} from "../../apicalls/product";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

const Addproduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  const [form] = Form.useForm();
  const [sellerId, setSellerId] = useState(null);
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

  const onFinishHandler = async (values) => {
    try {
      let resposne;
      if (editMode) {
        values.seller_id = sellerId;
        values.product_id = editProductId;
        resposne = await updateProductValues(values);
      } else {
        resposne = await sellProduct(values);
      }
      if (resposne.isSuccess) {
        form.resetFields();
        message.success(resposne.message);
        setActiveTabKey("1");
        getProducts();
      } else {
        form.resetFields();
        throw new Error(resposne.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const getOldProductData = async () => {
    try {
      const resposne = await getOldProduct(editProductId);
      if (resposne.isSuccess) {
        message.success("Edit Mode on.");
        const { name, description, price, usedFor, category, details, seller } =
          resposne.productDoc;
        setSellerId(seller);
        const modifiedProduct = {
          product_name: name,
          product_description: description,
          product_price: price,
          product_category: category,
          product_usedFor: usedFor,
          product_details: details,
        };
        form.setFieldsValue(modifiedProduct);
      } else {
        throw new Error(resposne.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (editMode) {
      //code
      getOldProductData();
    } else {
      form.resetFields();
    }
  }, [getOldProductData]);
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">
        {!editMode ? "What you want to sell?" : "Edit your product here."}
      </h1>
      <Form layout="vertical" onFinish={onFinishHandler} form={form}>
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
          name="product_description"
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
              name="product_price"
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
              name="product_usedFor"
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
          {editMode ? (
            <PencilSquareIcon width={26} />
          ) : (
            <PlusCircleIcon width={26} />
          )}
          {editMode ? "Update Product" : "Sell Product"}
        </button>
      </Form>
    </section>
  );
};

export default Addproduct;
