import { Checkbox, Col, Form, Input, Row, Select, Tabs, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  getOldProduct,
  sellProduct,
  updateProductValues,
} from "../../apicalls/product";
import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import Upload from "../../components/Upload";

const ManageProduct = ({
  setActiveTabKey,
  getProducts,
  editMode,
  editProductId,
}) => {
  const [productActiveTabKey, setProductActiveTabKey] = useState("1");
  const items = [
    {
      key: "1",
      label: "Product Details",
      children: (
        <ProductForm
          setActiveTabKey={setProductActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    editMode
      ? {
          key: "2",
          label: "Product Images",
          children: (
            <Upload
              setActiveTabKey={setProductActiveTabKey}
              editProductId={editProductId}
            />
          ),
        }
      : null,
  ];

  const onChangeHandler = (key) => {
    setProductActiveTabKey(key);
  };
  return (
    <Tabs
      onChange={(key) => onChangeHandler(key)}
      activeKey={productActiveTabKey}
      items={items}
    >
      Profile
    </Tabs>
  );
};

export default ManageProduct;
