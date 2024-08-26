import { Tabs } from "antd";
import Products from "./Products";
import ManageProduct from "./ManageProduct";
import General from "./General";
import { useEffect, useState } from "react";
import { getAllProducts } from "../../apicalls/product";

const Index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  const getProducts = async () => {
    try {
      const resposne = await getAllProducts();
      if (resposne.isSuccess) {
        //codes
        setProducts(resposne.productDocs);
      } else {
        throw new Error(resposne.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const items = [
    {
      key: "1",
      label: "Products",
      children: (
        <Products
          products={products}
          setActiveTabKey={setActiveTabKey}
          setEditMode={setEditMode}
          getProducts={getProducts}
          setEditProductId={setEditProductId}
        />
      ),
    },
    {
      key: "2",
      label: "Manage Product",
      children: (
        <ManageProduct
          setActiveTabKey={setActiveTabKey}
          getProducts={getProducts}
          editMode={editMode}
          editProductId={editProductId}
        />
      ),
    },
    {
      key: "3",
      label: "Notification",
      children: "Content of Tab Pane 2",
    },
    {
      key: "4",
      label: "General",
      children: <General />,
    },
  ];
  useEffect(() => {
    getProducts();
  }, []);

  const onChangeHandler = (key) => {
    setActiveTabKey(key);
    setEditMode(false);
  };

  return (
    <Tabs
      onChange={(key) => onChangeHandler(key)}
      activeKey={activeTabKey}
      items={items}
      tabPosition={"left"}
    >
      Profile
    </Tabs>
  );
};

export default Index;
