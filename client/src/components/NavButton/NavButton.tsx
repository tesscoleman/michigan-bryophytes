import { NavLink } from "react-router-dom";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";
import "./navbutton.css";
import Icon from "@mdi/react";

interface Props {
  text: string;
  route: string;
}

const NavButton = ({ text, route }: Props) => {
  return (
    <>
      <NavLink to={"/" + route}>
        <button className="nav-button">
            {text}
            <Icon path={mdiChevronRight} size={1} />
        </button>
      </NavLink>
    </>
  );
};

export default NavButton;
