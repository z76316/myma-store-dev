import React from "react";
import NavMenu from "./NavMenu";

const Header: React.FC = () => {
	return (
		<nav style={{ flexGrow: 0 }}>
			{/* <img alt="MYMathApps" src={logo} /> */}
			<NavMenu />
		</nav>
	);
};

export default Header;
