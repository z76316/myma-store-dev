import React, { useContext } from "react";
import useSWR from "swr";
import { Loader, Container, Divider, Header, Icon, Card } from "semantic-ui-react";
import { ApplicationContext } from "../../context";
import { ProductsResponse } from "../../responses";
import ProductCard from "./ProductCard";

const Products: React.FC = (): JSX.Element => {
	const ctx = useContext(ApplicationContext);
	const { data } = useSWR<ProductsResponse>("/api/products", (url) =>
		fetch(url, { method: "GET", headers: { Accept: "application/json" } }).then((res) => res.json())
	);

	if (!data) {
		return <Loader active inline="centered" />;
	}

	return (
		<Container>
			<p style={{ fontSize: 18 }}>
				Below you will find an array of products that will assist in helping you understand
				Calculus, Maple, and general math concepts.
			</p>
			{ctx.user === undefined ? undefined : (
				<div>
					<Divider horizontal>
						<Header as="h4">
							<Icon name="archive" />
							{"Currently Owned Products"}
						</Header>
					</Divider>
					<Card.Group itemsPerRow={4} stackable>
						{data.products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</Card.Group>
				</div>
			)}
			<div>
				<Divider horizontal>
					<Header as="h4">
						<Icon name="archive" />
						{"Currently Owned Products"}
					</Header>
				</Divider>
				<Card.Group itemsPerRow={4} stackable>
					{data.products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</Card.Group>
			</div>
			<div>
				<Divider horizontal>
					<Header as="h4">
						<Icon name="dollar sign" />
						{"Products to Purchase"}
					</Header>
				</Divider>
				<Card.Group itemsPerRow={4} stackable>
					{data?.products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</Card.Group>
			</div>
		</Container>
	);
};

export default Products;
