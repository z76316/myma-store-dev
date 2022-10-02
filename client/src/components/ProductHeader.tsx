import React, { useContext, useState } from "react";
import { Container, Header, Button, Dropdown, DropdownItemProps, Image } from "semantic-ui-react";
import { ApplicationContext } from "../context";
import { Product } from "../entities";

type ProductHeaderProps = {
	product: Product;
	image: string;
	hasSample: boolean;
};

const ProductHeader: React.FC<ProductHeaderProps> = (props): JSX.Element => {
	const ctx = useContext(ApplicationContext);
	const [selection, setSelection] = useState<number>(-1);
	const [inCart, setInCart] = useState<boolean>(
		ctx.cart.find((value) => props.product.subscriptions!.find((v) => v.id === value.id)) !==
			undefined
	);

	const options: DropdownItemProps[] = props.product.subscriptions!.map((value, index) => {
		return { key: value.id, text: `${value.length} days`, value: index };
	});

	return (
		<Container style={{ marginTop: 10 }}>
			<Image centered size="medium" src={props.image} />
			<Header as="h2">{props.product.title}</Header>
			<Header as="h4">{props.product.tagLine}</Header>
			<Button color="blue" style={{ marginBottom: 10 }}>{`Sample Chapter`}</Button>
			<Container>
				<Dropdown
					clearable
					disabled={inCart}
					onChange={(event, data) => setSelection(data.value as number)}
					options={options}
					placeholder={`Select subscription length`}
					selection
					style={{ marginRight: 10 }}
				/>
				{inCart ? (
					<Button
						color="red"
						onClick={(event, data) => {
							ctx.setCart!(
								ctx.cart.filter((value) => value.id !== props.product.subscriptions![selection].id)
							);
							setInCart(false);
						}}
					>{`Remove from Cart`}</Button>
				) : (
					<Button
						color="green"
						disabled={selection === -1}
						onClick={(event, data) => {
							ctx.setCart!([
								...ctx.cart,
								{ ...props.product.subscriptions![selection], product: props.product }
							]);
							setInCart(true);
						}}
					>{`Add to Cart`}</Button>
				)}
			</Container>
		</Container>
	);
};

export default ProductHeader;
