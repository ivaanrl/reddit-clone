import * as React from "react";
import "./Navbar.scss";

interface Props {
  search: (searchValue: string) => null;
}

const NavbarView = (props: Props) => {
  let theme = "light";
  //const themes = ["light", "dark"];

  const handleThemeChange = () => {
    theme = theme === "light" ? "dark" : "light";

    document.documentElement.className = "";
    document.documentElement.classList.add(`theme-${theme}`);
  };
  return (
    <React.Fragment>
      <div onClick={handleThemeChange}>cHANGE THEME</div>
      <div onClick={() => props.search("keonda")}> Searchccc</div>
    </React.Fragment>
  );
};

export default NavbarView;
