import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./OrderBar.scss";

interface Props {
  getPosts: (username: string, order: string) => void;
}

const OrderBar = (props: Props) => {
  const location = useLocation();
  const { getPosts } = props;

  useEffect(() => {
    const sortOrder = location.search.split("&")[0].split("=")[1];
    /*const timeSort =
      location.search.split("&").length > 1
        ? location.search.split("&")[1].split("=")[1]
        : "all_time"; */
    setActiveOption(sortOrder);
    const username = location.pathname.split("/")[2];
    getPosts(username, sortOrder);
  }, [location]);

  const [activeOption, setActiveOption] = useState("new");

  return (
    <div className="order-bar-container">
      <Link
        to={`${location.pathname}?sort=new`}
        className={
          activeOption === "new"
            ? "order-bar-sort-option-container-active"
            : "order-bar-sort-option-container"
        }
      >
        <svg
          className="order-bar-new-icon order-bar-icon"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <polygon
              fill="inherit"
              points="17.16 10 19.07 12.936 15.799 14.188 15.619 17.686 12.237 16.776 10.035 19.5 7.833 16.776 4.451 17.686 4.271 14.188 1 12.936 2.91 10 1 7.065 4.271 5.812 4.451 2.315 7.833 3.224 10.035 .5 12.237 3.224 15.619 2.315 15.799 5.812 19.07 7.065"
            ></polygon>
          </g>
        </svg>{" "}
        <span>New</span>{" "}
      </Link>
      <Link
        to={`${location.pathname}?sort=hot`}
        className={
          activeOption === "hot"
            ? "order-bar-sort-option-container-active"
            : "order-bar-sort-option-container"
        }
      >
        <svg
          className="order-bar-hot-icon order-bar-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Hot</title>
          <path d="M10.31.61a.5.5,0,0,0-.61,0C9.41.83,2.75,6.07,2.75,11.47a8.77,8.77,0,0,0,3.14,6.91.5.5,0,0,0,.75-.64,3.84,3.84,0,0,1-.55-2A7.2,7.2,0,0,1,10,9.56a7.2,7.2,0,0,1,3.91,6.23,3.84,3.84,0,0,1-.55,2,.5.5,0,0,0,.75.64,8.77,8.77,0,0,0,3.14-6.91C17.25,6.07,10.59.83,10.31.61Z"></path>
        </svg>{" "}
        <span>Hot</span>
      </Link>
      <Link
        to={`${location.pathname}?sort=top&t=all_time`}
        className={
          activeOption === "top"
            ? "order-bar-sort-option-container-active"
            : "order-bar-sort-option-container"
        }
      >
        <svg
          className="order-bar-top-icon order-bar-icon"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              fill="inherit"
              d="M1.25,17.5 L1.25,7.5 L6.25,7.5 L6.25,17.5 L1.25,17.5 Z M12.49995,17.5001 L7.49995,17.5001 L7.49995,5.0001 L4.99995,5.0001 L9.99995,0.0006 L14.99995,5.0001 L12.49995,5.0001 L12.49995,17.5001 Z M13.75,17.5 L13.75,12.5 L18.75,12.5 L18.75,17.5 L13.75,17.5 Z"
            ></path>
          </g>
        </svg>
        <span>Top</span>
      </Link>
    </div>
  );
};

export default OrderBar;
