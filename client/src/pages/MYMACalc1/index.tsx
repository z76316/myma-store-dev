/* eslint-disable react/no-multi-comp */

import React from "react";
import { Container, Image } from "semantic-ui-react";
import Textbook from "../../components/Textbook";
import thumbnail from "../../resources/images/MYMACalc1/thumbnail.gif";

const MYMACalc1: React.FC = (): JSX.Element => {
	return (
		<Container textAlign="left">
			<Image
				alt="Algebraic shapes within a three axis"
				floated="right"
				size="small"
				src={"https://www.mymathapps.com/bundles/mfcproduct/images/m4c-anim.gif"}
			/>
			<p>
				<strong>A Web Based, Interactive, Multimedia Calculus</strong>
			</p>
			<p>
				<strong>
					<em>Doing, Not Just Viewing</em>
				</strong>
			</p>
			<p>Learn Vector Calculus easily with the interactive MYMathApps Calculus 1 online textbook</p>
			<h2>Benefits of an Online Text</h2>
			<p>
				Although primarily a standard calculus text, the online format allows for many features
				which are impossible in a static book:
			</p>
			<ul>
				<li>
					There are many animations directly in the pages, some of which can be modified real-time
					by the student.
				</li>
				<li>
					The text is fully hyperlinked. The material is designed to be followed linearly, with
					frequent side excursions for extra material such as additional examples, background
					information, proofs or advanced material.
				</li>
				<li>
					Most pages in the text cover a single topic followed by an example and an exercise. More
					exercises appear on a linked exercise page. Hints, answers and full solutions for the
					exercises toggle in dropdown regions directly below the exercise. Hopefully, students try
					the problems before they click on the answer or solution button. The solution is not right
					there in front of them as in a paper book.
				</li>
				<li>
					When there is an obvious way to check an answer, the check appears in a light green region
					at the end of the an example&apos;s solution, or in a separate drop down region after an
					exercise. For example:
					<br />
					After solving an equation, one should check it by substituting the solution back into the
					equation.
					<br />
					After finding an antiderivative, one should check by differentiating.
					<br />
					After finding the center of mass of an object, one should check that it is inside (the
					convex hull of) the object.
				</li>
				<li>
					Sometimes there is a comment or remark about an exercise, that the author would like to
					make which might have given away the answer if visible in the page. In that case there is
					an additional button at the end of the exercise to drop down the remark. For example:
					<br />
					The integral you just computed gives the area of a semi-circle. So you could have known
					the answer in advance.
				</li>
				<li>
					Many books give formulas without proof. MYMACalc proves every formula. Derivations and
					proofs are directly in the text when they are essential to understanding, but are
					frequently hidden in a drop-down region when they are not essential, so they do not
					obstruct the flow of the material but are still easily accessible to interested students.
					There are many more proofs than most textbooks.
				</li>
				<li>
					There are exercise pages for each chapter and the exercises are grouped by section of the
					chapter. Each group is hyperlinked back to the appropriate pages, to facilitate those
					students who like to start on the exercises and only read the chapter when they need help
					doing the exercises.
				</li>
				<li>
					There are links to the Maplets for Calculus (M4C) directly in the text. These drill the
					students on specific topics acting like a &ldquo;Tutor without the Tutor&rdquo;. Since the
					M4C are displayed in Java, they cannot be viewed on most mobile devices. Consequently,
					they are gradually being converted into browser-based tutorials which either are directly
					embedded in the text or appear on separate tutorial pages.
				</li>
				<li>
					MYMACalc works in any browser on any device, except for the Maplets for Calculus (M4C)
					(because they are Java based).
				</li>
			</ul>
		</Container>
	);
};

const MYMACalc1Textbook: React.FC = (): JSX.Element => (
	<Textbook child={<MYMACalc1 />} codeName="MYMACalc1" image={thumbnail} />
);

export default MYMACalc1Textbook;
