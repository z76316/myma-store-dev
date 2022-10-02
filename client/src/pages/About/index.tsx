import React from "react";
import { Header, Divider } from "semantic-ui-react";

import Page from "../../components/Page";
import YasskinImg from "../../resources/images/yasskin.png";
import MeadeImg from "../../resources/images/meade.png";
import Person from "./Person";

const PersonInfo = [
	{
		name: "Dr. Philip B. Yasskin",
		img: YasskinImg,
		about:
			"Dr. Yasskin is an Associate Professor in the Department of Mathematics at Texas A&M University. Dr. Yasskin has been using computer algebra systems since the mid 1970s and Maple since 1992. He is one of the pioneers of web-based Maple applications. He is the principal author on the single and multivariable Maple lab manuals for Stewart's Calculus texts. For 4 years he supervised the Maple computer labs for the first year engineering calculus courses. Dr. Yasskin is also a Co-Director of the TAMU Summer Educational Enrichment in Math for middle school students and of the TAMU Math Circle for middle and high school students, and is the National Program Director for the Special Interest Group of the MAA on Math Circles."
	},
	{
		name: "Dr. Douglas B. Meade",
		img: MeadeImg,
		about:
			"Dr. Meade is the Director of Undergraduate Studies and an Associate Professor in the Department of Mathematics at the University of South Carolina. Dr. Meade has more than twenty years of experience using Maple for both research and education, and was a pioneer in creating (legal) Internet accessible Maple-based applications. Among his publications are a textbook for freshman engineering, several online courses, and numerous Maple supplements to top-selling calculus, linear algebra, and differential equations textbooks. Dr Meade also supervises the administration of the the Math Placement Tests at the University of South Carolina."
	}
];

const About: React.FC = (props): JSX.Element => {
	return (
		<Page>
			<Header as="h1">About Us</Header>
			<Divider />
			{PersonInfo.map((p, i) => (
				<Person key={i} {...p} />
			))}
		</Page>
	);
};

export default About;
