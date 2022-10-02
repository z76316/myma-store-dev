/* eslint-disable react/no-multi-comp */

import React from "react";
import { Container, Image } from "semantic-ui-react";
import Textbook from "../../components/Textbook";
import thumbnail from "../../resources/images/MYMACalc3/thumbnail.gif";

const MYMACalc3: React.FC = (): JSX.Element => {
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
					<em>Doing, Not Just Viewing test change</em>
				</strong>
			</p>
			<p>
				Learn Vector Calculus intuitively with the interactive MYMathApps Calculus 3 online textbook
			</p>
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
					MYMACalc works in any browser on any device, except for the M4C (because they are Java
					based).
				</li>
			</ul>
			<h2>Benefits of MYMACalc 3 over Other Texts</h2>
			<p>
				Many students have a great deal of difficulty visualizing in three dimensions. 3D graphics,
				both static and animated, are designed to help with this difficulty. Animations are also
				helpful with visualizing other concepts.
			</p>
			<ul>
				<li>
					In discussing Cross Products, there are animations to help students visualize the right
					hand rule.
				</li>
				<li>
					In discussing Vector Addition and Magnitude, there are animations to help students
					visualize the Triangle Inequality.
				</li>
				<li>
					Lots of graphics help students understand the derivations of Parametric and Non-Parametric
					equations for lines and planes, how lines in R3 can be skew rather than parallel or
					intersecting, and how to compute the distance from a point to a line or plane. FIX
				</li>
				<li>
					There are plots of examples of all the quadratic curves (conic sections) and all the
					quardatic surfaces.
				</li>
				<li>
					In discussing the Properties of Curves, there are animations understand arclength, the
					tangent, normal and binormal unit vectors, curvature and torsion.
				</li>
				<li>
					There is a highly interactive graphic to motivate the definition of Partial Derivatives
					and Tangent Planes. After viewing the graph of a function of 2 variables, a student clicks
					on buttons and moves sliders to construct the two traces and position them, add tangent
					lines to the traces and move them along the traces and finally add the tangent plane. All
					of this can be animated or rotated with the mouse.
				</li>
				<li>
					Interactive graphic help students visualize the Divergence of a Vector Field as the amount
					a fluid flows out of a circle and the Curl of a Vector Field as the amount a fluid rotates
					around a circle.
				</li>
				<li>Animations show students the convergence of Rieman Sums for 1 and 2 variables.</li>
				<li>
					When studying Green&apos;s, Stokes&apos; and Gauss&apos; Theorems, there are animations to
					help students understand the orientations of curves and surfaces and the relation between
					them.
				</li>
			</ul>
			<p>
				MYMACalc 3 covers lots of material in a different order or with different emphasis than many
				standard books:
			</p>
			<ul>
				<li>
					MYMACalc 3 has students compute partial derivatives, then turns to the interpretation as
					the slopes of the traces and finally the limit definitions.
				</li>
				<li>
					MYMACalc 3 gets students to compute iterated integrals, then turns to the Riemann sum
					definition, where students see iterated integrals arising as the result in various
					coordinate systems.
				</li>
				<li>
					MYMACalc 3 defines derivatives with respect an arbitrary vector, not just unit vectors,
					because these are important when computing the derivative along a curve. Directional
					derivatives are then a special case.
				</li>
				<li>
					MYMACalc 3 emphasizes the passive view of curvilinear coordinates as a different
					description of the points in the plane, rather than the active view as a transformation
					between two planes.
				</li>
				<li>
					Standard books cover line and surface integrals with the theorems, after partial
					derivatives and multiple integrals. They frequently spend time on line and surface
					integrals for graphs and then repeat for parametric surfaces.
				</li>
				MYMACalc 3 treats line and surface integrals almost exclusively parametrically, with graphs
				of functions as special cases.
				<li>
					MYMACalc 3 covers line integrals with arc length integrals. This gives students time to
					digest line integrals before they get to surface integrals or the theorems.
				</li>
				<li>
					MYMACalc 3 covers surface integrals directly after multiple integrals emphasizing the
					analogy between curvilinear coordinates in the plane and parametric surfaces. This is
					separated from Stokes&apos; and Gauss&apos; Theorems by the Fundamental Theorem of
					Calculus for Curves and Green&apos;s Theorem.
				</li>
				<li>
					MYMACalc 3 treats the four Fundamental Theorems of Vector Calculus equally, emphasizing
					that each theorem uses the Fundamental Theorem of Calculus to reduce the number of
					integrals by one and replace the domain of integration by the boundary of the original
					domain.
				</li>
			</ul>
		</Container>
	);
};

const MYMACalc3Textbook: React.FC = (): JSX.Element => (
	<Textbook child={<MYMACalc3 />} codeName="MYMACalc3" image={thumbnail} />
);

export default MYMACalc3Textbook;
