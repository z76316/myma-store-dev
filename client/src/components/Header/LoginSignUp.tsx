import React from "react";
import { Menu, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const LoginSignUp: React.FC = (props): JSX.Element => {
	const history = useHistory();

	return (
		<Menu.Item>
			<Button.Group>
				<Button onClick={(event, data) => history.push("/sign-up")} primary>
					Sign Up
				</Button>
				<Button.Or />
				<Button onClick={(event, data) => history.push("/login")}>Login</Button>
			</Button.Group>
		</Menu.Item>
	);
};

export default LoginSignUp;
