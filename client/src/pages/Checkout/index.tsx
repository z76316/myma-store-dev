import React, { useContext } from "react";
import { Table, Container, Header, Button } from "semantic-ui-react";
import { formatter } from "../../utils";
import { ApplicationContext } from "../../context";
import PayPalSmartPaymentButtons from "./PayPalSmartPaymentButtons";

const Checkout: React.FC = (): JSX.Element => {
	const ctx = useContext(ApplicationContext);

	const total = formatter.format(
		ctx.cart.map((value) => value.cost).reduce((accum, value) => accum + value, 0) / 100
	);

	return (
		<Container>
			<Table celled striped>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Product</Table.HeaderCell>
						<Table.HeaderCell>Publisher</Table.HeaderCell>
						<Table.HeaderCell collapsing>Length (days)</Table.HeaderCell>
						<Table.HeaderCell collapsing>Price (USD)</Table.HeaderCell>
						<Table.HeaderCell collapsing />
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{ctx.cart.map((value, index) => {
						return (
							<Table.Row key={value.id}>
								<Table.Cell>{value.product!.title}</Table.Cell>
								<Table.Cell>{value.product!.company.name}</Table.Cell>
								<Table.Cell>{value.length}</Table.Cell>
								<Table.Cell>{formatter.format(value.cost / 100)}</Table.Cell>
								<Table.Cell>
									<Button
										color="red"
										fluid
										icon="delete"
										onClick={(event, data) => ctx.setCart!(ctx.cart.filter((v, i) => i !== index))}
									/>
								</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
				<Table.Footer>
					<Table.Row>
						<Table.HeaderCell colSpan={3}>
							<b>Total</b>
						</Table.HeaderCell>
						<Table.HeaderCell colSpan={2} collapsing>
							<b>{total}</b>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
			{ctx.user === undefined ? (
				<Header as="h3">You must be signed in to complete your purchase.</Header>
			) : (
				<PayPalSmartPaymentButtons total={total} />
			)}
		</Container>
	);
};

export default Checkout;
