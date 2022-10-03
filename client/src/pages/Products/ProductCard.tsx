import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

/*
 * TODO: lol images should probs be hosted statically on server but this is just a workaround. pls no kill
 */
import calc1 from "../../resources/images/MYMACalc1/thumbnail.gif";
import calc2 from "../../resources/images/MYMACalc2/thumbnail.gif";
import calc3 from "../../resources/images/MYMACalc3/thumbnail.gif";
import m4c from "../../resources/images/M4C/thumbnail.gif";
import matthew from "../../resources/images/matthew.png";
import { Product } from "../../entities";

type ProductCardProps = {
	product: Product;
};

function getImage(codeName: string): string {
	switch (codeName) {
		case "MYMACalc1":
			return calc1;
		case "MYMACalc2":
			return calc2;
		case "MYMACalc3":
			return calc3;
		case "M4C":
			return m4c;
		default:
			return matthew;
	}
}

const ProductCard: React.FC<ProductCardProps> = (props): JSX.Element => {
	const date = new Date(props.product.updatedAt);

	return (
		<Card as={Link} to={`/products/${props.product.codeName}`}>
			<Image src={getImage(props.product.codeName)} ui={false} wrapped />
			<Card.Content>
				<Card.Header>{props.product.title}</Card.Header>
				<Card.Meta>{`Published by ${props.product.company.name}`}</Card.Meta>
				<Card.Meta>{`Last updated on ${date.toLocaleDateString()}`}</Card.Meta>
				<Card.Description>{props.product.tagLine}</Card.Description>
			</Card.Content>
		</Card>
	);
};

export default ProductCard;
