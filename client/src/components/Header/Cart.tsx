import React, { useContext } from "react";
import { Menu, Button, Label, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { ApplicationContext } from "../../context";

const Cart: React.FC = () => {
	const ctx = useContext(ApplicationContext);

	return (
		<Menu.Item>
			<Button as="div" labelPosition="right">
				<Button as={Link} color="green" to="/checkout">
					<Icon name="shopping cart" />
					{"Cart"}
				</Button>
				<Label as={Link} basic color="green" pointing="left" to="/checkout">
					{ctx.cart.length}
				</Label>
			</Button>
		</Menu.Item>
	);
};

export default Cart;
