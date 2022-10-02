import React, { useContext } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ApplicationContext } from "../../context";

const Profile: React.FC = (): JSX.Element => {
	// eslint-disable-next-line
	const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
	const ctx = useContext(ApplicationContext);
	const history = useHistory();

	return (
		<Dropdown as={Menu.Item} item text={ctx.user!.name}>
			<Dropdown.Menu>
				<Dropdown.Item
					onClick={(event, data) => {
						removeCookie("jwt");
						ctx.setUser!(undefined);
						history.push("/");
					}}
				>
					Logout
				</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default Profile;
