import React from "react";
import { Header, Grid, Image, GridColumn } from "semantic-ui-react";

type PersonProps = {
	about: string;
	name: string;
	img: string;
};

const Person: React.FC<PersonProps> = ({ about, name, img }): JSX.Element => (
	<>
		<Header as="h2">{name}</Header>
		<Grid columns={2}>
			<Grid.Row>
				<GridColumn>
					<Image circular src={img} />
				</GridColumn>
				<GridColumn>
					<p>{about}</p>
				</GridColumn>
			</Grid.Row>
		</Grid>
	</>
);

export default Person;
