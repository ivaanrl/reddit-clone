import React from "react";
import "./Homepage.scss";

interface Props {
  getPosts: () => string | null;
}

const HomepageView = (props: Props) => {
  return (
    <div className="homepage-container">
      <div className="mock-post" />
    </div>
  );
};

export default HomepageView;
