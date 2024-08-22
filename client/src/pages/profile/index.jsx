import { Tabs } from "antd";
import Products from "./Products";
import Addproduct from "./Addproduct";
import General from "./General";
import { useState } from "react";

const index = () => {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const items = [
    {
      key: "1",
      label: "Products",
      children: <Products />,
    },
    {
      key: "2",
      label: "Sell Product",
      children: <Addproduct setActiveTabKey={setActiveTabKey} />,
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
  return (
    <Tabs
      onChange={(key) => setActiveTabKey(key)}
      activeKey={activeTabKey}
      items={items}
      tabPosition={"left"}
    >
      Profile
    </Tabs>
  );
};

export default index;
