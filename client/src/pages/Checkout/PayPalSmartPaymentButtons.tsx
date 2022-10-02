/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { formatter } from "../../utils";
import { ApplicationContext } from "../../context";

type PayPalSmartPaymentButtonsProps = {
	total: string;
};

const PayPalSmartPaymentButtons: React.FC<PayPalSmartPaymentButtonsProps> = (
	props
): JSX.Element => {
	const ctx = useContext(ApplicationContext);
	const [rendered, setRendered] = useState<boolean>(false);

	useEffect(() => {
		if (!rendered) {
			// paypal attribute gets loaded in public/index.html
			// @ts-ignore
			window.paypal
				.Buttons({
					// @ts-ignore
					createOrder: (data, actions) => {
						const parts = ctx.user!.name.split(" ");
						const givenName = parts[0];
						const surname = parts.length > 1 ? parts.slice(1) : "";
						const invoiceId = uuidv4();
						const formattedTotal = props.total.replace("$", "").replace(",", "");

						return actions.order.create({
							payer: {
								given_name: givenName,
								surname: surname,
								email_address: ctx.user!.email
							},
							purchase_units: [
								{
									description: "MYMathApps Store transaction",
									amount: {
										currency_code: "USD",
										value: formattedTotal,
										breakdown: {
											item_total: {
												currency_code: "USD",
												value: formattedTotal
											}
										}
									},
									invoice_id: invoiceId,
									items: ctx.cart.map((value) => {
										return {
											name: value.product!.title,
											description: `${value.length} day subscription`,
											quantity: "1",
											unit_amount: {
												currency_code: "USD",
												value: formatter
													.format(value.cost / 100)
													.replace("$", "")
													.replace(",", "")
											},
											category: "DIGITAL_GOODS"
										};
									})
								}
							]
						});
					},
					// @ts-ignore
					onApprove: (data, actions) => {
						// @ts-ignore
						return actions.order.capture().then((details) => {
							ctx.setCart!([]);
						});
					}
				})
				.render("#paypal-smart-payment-buttons-container");
			setRendered(true);
		}
	}, [ctx.cart, ctx.setCart, ctx.user, props.total, rendered]);

	return <div id="paypal-smart-payment-buttons-container"></div>;
};

export default PayPalSmartPaymentButtons;
