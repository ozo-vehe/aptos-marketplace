import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from "../assets/logo.svg"

const Logo = ({ textStyle }) => {
  return (
    <Link
      to="/"
      className={`${textStyle} montserrat font-[700] navbar-logo min-w-[100px] flex items-end gap-2`}
    >
      <img src={logo} alt="Logo" />
      <span className="text-purple-700">NFTMarket.</span>
    </Link>
  );
};

export default Logo;

Logo.propTypes = {
  textStyle: PropTypes.string,
};
