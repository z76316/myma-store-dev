import React from "react";
import { Container } from "semantic-ui-react";

type PageProps = {
	children: React.ReactNode;
};

const Page: React.FC<PageProps> = (props): JSX.Element => (
	<Container className="page" text textAlign="left">
		{props.children}
	</Container>
);

export default Page;
