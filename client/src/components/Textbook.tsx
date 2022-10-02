/* eslint-disable react/no-multi-comp */

import React from "react";
import useSWR from "swr";
import { Loader, Divider } from "semantic-ui-react";
import { Product } from "../entities";
import ProductHeader from "./ProductHeader";

type TextbookProps = {
	child: React.ReactNode;
	codeName: string;
	image: string;
};

const Textbook: React.FC<TextbookProps> = (props): JSX.Element => {
	const { data } = useSWR<Product, Error>(`/api/products/${props.codeName}`, (url) =>
		fetch(url, { method: "GET" }).then((res) => res.json())
	);

	if (!data) {
		return <Loader active inline="centered" />;
	}

	return (
		<>
			<ProductHeader hasSample image={props.image} product={data} />
			<Divider></Divider>
			{props.child}
			<p>
				<img
					alt="The National Science Foundation"
					src="https://www.mymathapps.com/images/nsf.png"
					style={{ verticalAlign: "middle", height: "3em" }}
				/>
				&emsp;Supported in part by NSF DUE CCLI / TUES Grants 0737209 / 1123170 (Meade) and 0737209
				/ 1123255 (Yasskin)
			</p>
		</>
	);
};

export default Textbook;
