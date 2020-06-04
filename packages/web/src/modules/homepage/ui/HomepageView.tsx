import React from "react";

interface Props {
  getPosts: () => string | null;
}

const HomepageView = (props: Props) => {
  return <div>HomePage</div>;
};

export default HomepageView;
