import React from "react";
import { HomepageOrderController } from "@reddit-clone/controller";
import OrderBar from "../../../shared/modules/orderBar/OrderBar";

const HomepageOrderBarConnector = () => {
  return (
    <HomepageOrderController>{() => <OrderBar />}</HomepageOrderController>
  );
};

export default HomepageOrderBarConnector;
