import React from "react";
import { Container, Image, Header, Grid, Card, Divider } from "semantic-ui-react";
import "../../App.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { Link } from "react-router-dom";
import katex from "../../resources/images/katex.png";
import maple from "../../resources/images/maple.png";
import ictcm from "../../resources/images/ictcm.png";
import logo from "../../resources/images/logo.png";
import finance from "../../resources/images/Finance/FinanceLogo.png";

import "swiper/scss";

SwiperCore.use([Autoplay]);

type SlideshowProps = {
	images: string[];
	style?: React.CSSProperties | null;
	shuffle: boolean;
};
const Slideshow: React.FC<SlideshowProps> = (props): JSX.Element => {
	function shuffle(a: string[]): string[] {
		for (let i = a.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[a[i], a[j]] = [a[j], a[i]];
		}
		return a;
	}

	const images: string[] = props.shuffle ? shuffle(props.images) : props.images;

	const items = images.map((image) => {
		return (
			<SwiperSlide
				key={image}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<img
					alt={""}
					className="d-block"
					src={image}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "contain"
					}}
				/>
			</SwiperSlide>
		);
	});

	return (
		<Swiper
			autoplay={{
				delay: 3000,
				disableOnInteraction: false
			}}
			centeredSlides
			loop
			style={{
				backgroundColor: "white",
				width: "290px",
				height: "290px"
			}}
			updateOnWindowResize
		>
			{items}
		</Swiper>
	);
};

// eslint-disable-next-line react/no-multi-comp
const Logo: React.FC = (): JSX.Element => {
	return <Image alt="MYMathApps Logo" src={logo} ui={false} width="350px" wrapped />;
};

// eslint-disable-next-line react/no-multi-comp
const Home: React.FC = (): JSX.Element => {
	const calc1Files: string[] = [
		"TanCotAnim.gif",
		"ex_cone.gif",
		"EgDotWorkWagon.gif",
		"areafndef.gif",
		"fishtank0_animate.gif",
		"LRS_animate.gif",
		"betw1rect_animate.gif",
		"ftcareapf3.gif",
		"LinApprox1.gif",
		"def_lim_both.gif",
		"x_RR_Cars.gif",
		"MRS_animate.gif",
		"def_lim_left.gif",
		"x_RR_ladder.gif",
		"PfTriIneq4.gif",
		"def_lim_right.gif",
		"yint1rect_animate.gif",
		"RRS_animate.gif",
		"def_tan_slope.gif",
		"SinCosAnim.gif",
		"ex_AreaIVP_sinx.gif"
	];

	const calc2Files: string[] = [
		"rect2yanimate.gif",
		"LRS_animate.gif",
		"rect3xanimate.gif",
		"MRS_animate.gif",
		"rect4xanimate.gif",
		"RRS_animate.gif",
		"rect4yanimate.gif",
		"area1xanimate.gif",
		"slopesolcrvs.gif",
		"area1yanimate.gif",
		"valentine.gif",
		"area2xanimate.gif",
		"xcirc_eqtrisec_animate.gif",
		"area2yanimate.gif",
		"xcirc_sqsec_animate.gif",
		"areafndef.gif",
		"xcircle_cylin_misc_animate.gif",
		"betw1rect_animate.gif",
		"xcircle_cylin_misc_solid_animate.gif",
		"cardioid_anim_ex.gif",
		"xcos_disks_animate.gif",
		"circ_eqtrisec_animate.gif",
		"xcos_disks_solid_animate.gif",
		"ex_AreaIVP_sinx.gif",
		"xexpo_cylin_misc_solid_animate.gif",
		"fishtank0_animate.gif",
		"xparab_cylin2_solid_animate.gif",
		"ftcareapf3.gif",
		"xparab_cylin3_solid_animate.gif",
		"limacon_anim.gif",
		"xparab_cylin4b_animate.gif",
		"parabxanimate.gif",
		"xparab_cylin4c_solid_animate.gif",
		"pcrvarc-animate.gif",
		"xparab_cylin_misc_2_solid_animate.gif",
		"r=cos2theta_anim.gif",
		"xparab_cylin_misc_solid_animate.gif",
		"r=cos3theta_anim.gif",
		"xparab_disk_misc_solid_animate.gif",
		"r=cos4theta_anim.gif",
		"xparab_horz_disc_solid_animate.gif",
		"r=cos5theta_anim.gif",
		"xparab_horz_washer_solid_animate.gif",
		"r=theta-all_anim.gif",
		"yint1rect_animate.gif",
		"rect2xanimate.gif"
	];

	const calc3Files: string[] = [
		"2DReimannAnimation.gif",
		"eg_multi_plane_cone.gif",
		"DefCrossGeomDir.gif",
		"ellipex.gif",
		"DerivAlongCrv.gif",
		"ex_cone.gif",
		"EgDotWorkWagon.gif",
		"parabeg.gif",
		"GradProof12.gif",
		"quadcubextrace.gif",
		"GradProof2D3c.gif",
		"quadcubeytrace.gif",
		"HelixOsculatingCircle.gif",
		"sincosTaylor.gif",
		"LinApprox2.gif",
		"xDotWorkVertTrack.gif",
		"PfTriIneq4.gif",
		"x_3dParabe.gif",
		"StokesMovie1-hole.gif",
		"x_box_div.gif",
		"def_cylcoordgrid_anim.gif",
		"x_box_uneven.gif",
		"def_lim_2D.gif",
		"x_fence.gif",
		"def_sphcoordgrid_anim.gif"
	];

	const mapletsFiles: string[] = [
		"AbsValLinEq.png",
		"ODEDirField.png",
		"ApproxIntLeftError.png",
		"ODEMixing.png",
		"Basic14Polar.png",
		"ParFracFindCoeff.png",
		"CMBar.png",
		"ParFracGenDecomp.png",
		"Centroid2D.png",
		"ParamTanLine.png",
		"DerivInvFn.png",
		"RRLadder.png",
		"EpsilonDelta.png",
		"RelatedRates.png",
		"FactorQuad.png",
		"Sec2TanGraphicNumeric.png",
		"GeometricSeries.png",
		"ShapeQuadCoeff.png",
		"Graph_df.png",
		"Shift.png",
		"ImplicitDifferentiation.png",
		"SinCosProps.png",
		"ImproperInt.png",
		"SurfAreaOfRev.png",
		"IntBySub.png",
		"TeleSeries.png",
		"LHospital.png",
		"TrigFnCircDef.png",
		"LinearApprox.png",
		"TrigSub.png",
		"MMAreaBox.png",
		"VertAsymptFind.png",
		"MMCrossRiver.png",
		"VolBySlicing.png",
		"MMFencedArea.png",
		"VolOfRev.png",
		"MMRectinEll.png",
		"WorkGravity.png",
		"MMTinCan.png",
		"WorkOnCurve.png",
		"MaclSerInteg.png",
		"WorkPumping.png",
		"MaclSerLimits.png",
		"WorkRope.png",
		"MaxMinQuad.png",
		"WorkSpring.png",
		"ODE1stLinear.png"
	];

	const calc1Imgs: string[] = [];
	const calc2Imgs: string[] = [];
	const calc3Imgs: string[] = [];
	const mapletsImgs: string[] = [];

	calc1Files.forEach((file) => {
		// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
		calc1Imgs.push(require("../../resources/images/MYMACalc1/" + file));
	});
	calc2Files.forEach((file) => {
		// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
		calc2Imgs.push(require("../../resources/images/MYMACalc2/" + file));
	});
	calc3Files.forEach((file) => {
		// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
		calc3Imgs.push(require("../../resources/images/MYMACalc3/" + file));
	});
	mapletsFiles.forEach((file) => {
		// eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
		mapletsImgs.push(require("../../resources/images/M4C/" + file));
	});

	return (
		<Container className="container-fluid" fluid style={{ padding: "0" }}>
			<Container className="container-fluid" fluid style={{ padding: "0" }}>
				<Container
					style={{
						height: "180px",
						position: "relative",
						display: "flex",
						"justify-content": "center",
						"align-items": "center"
					}}
				>
					<Grid className="middle aligned">
						<Grid.Row columns={2}>
							<Grid.Column className="middle aligned six wide">
								<Logo />
							</Grid.Column>
							<Grid.Column className="ten wide">
								<p style={{ fontSize: "1.5em" }}>
									We provide instructional and supplemental learning materials for various math
									topics created by distinguished faculty from universities around the United
									States.
								</p>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
				<Container className="ui divider"></Container>
				<Container>
					<p style={{ marginTop: 40, fontSize: "2.5em" }}>Online Content</p>
					<Grid>
						<Grid.Row columns={2} style={{ height: "320px" }}>
							<Grid.Column className="five wide">
								<Card className="h-100 centered">
									<div className="image bg-white">
										<Slideshow images={calc1Imgs} shuffle />
									</div>
								</Card>
							</Grid.Column>
							<Grid.Column className="eleven wide">
								<p style={{ fontSize: "2em" }}>MYMathApps Calculus 1</p>
								<p style={{ fontSize: "1.2em" }}>
									MYMACalc 1 is a complete course on Differential Calculus, plus a review of
									Precalculus and a start on Integral Calculus. The course is highly interactive and
									visual. Essentially all exercises have answers and full solutions and some for
									hints, checks and remarks. Each of these is hidden until the student clicks a
									button. There are lots of graphics including 2D and 3D plots, both static and
									animated, and some are interactive based on student input.
									<br />
									<Link to="/products/MYMACalc1">More Information</Link>
								</p>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={2} style={{ height: "320px" }}>
							<Grid.Column className="eleven wide">
								<p style={{ fontSize: "2em" }}>MYMathApps Calculus 2</p>
								<p style={{ fontSize: "1.2em" }}>
									MYMACalc 2 is a complete course on Integral Calculus and Sequences and Series,
									plus an introduction to Differential Equations. The course is highly interactive
									and visual. Essentially all exercises have answers and full solutions and some for
									hints, checks and remarks. Each of these is hidden until the student clicks a
									button. There are lots of graphics including 2D and 3D plots, both static and
									animated, and some are interactive based on student input.
									<br />
									<Link to="/products/MYMACalc2">More Information</Link>
								</p>
							</Grid.Column>
							<Grid.Column className="five wide">
								<Card className="h-100 centered">
									<div className="image bg-white">
										<Slideshow images={calc2Imgs} shuffle />
									</div>
								</Card>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={2} style={{ height: "320px" }}>
							<Grid.Column className="five wide">
								<Card className="h-100 centered">
									<div className="image bg-white">
										<Slideshow images={calc3Imgs} shuffle />
									</div>
								</Card>
							</Grid.Column>
							<Grid.Column className="eleven wide">
								<p style={{ fontSize: "2em" }}>MYMathApps Calculus 3</p>
								<p style={{ fontSize: "1.2em" }}>
									MYMACalc 3 is a complete course on Multivariable Calculus including Green&apos;s,
									Stokes&apos; and Gauss&apos; Theorems. The course is highly interactive and
									visual. Essentially all exercises have answers and full solutions and some for
									hints, checks and remarks. Each of these is hidden until the student clicks a
									button. There are lots of graphics including 2D and 3D plots, both static and
									animated, and some are interactive based on student input.
									<br />
									<Link to="/products/MYMACalc3">More Information</Link>
								</p>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row columns={2} style={{ height: "320px" }}>
							<Grid.Column className="eleven wide">
								<p style={{ fontSize: "2em" }}>Maplets for Calculus</p>
								<p style={{ fontSize: "1.2em" }}>
									M4C is a collection Maple-based applets which help students learn all three
									semesters of calculus. They present students with questions and guide them through
									the solution process. They only work on computers on which the Maple computer
									algebra system is installed. They are included with all of MYMathApps Calculus
									texts but are also available separately.
									<br />
									<Link to="/products/m4c">More Information</Link>
								</p>
							</Grid.Column>
							<Grid.Column className="five wide">
								<Card className="h-100 centered">
									<div
										className="image bg-white"
										style={{
											position: "relative"
										}}
									>
										<Slideshow
											images={mapletsImgs}
											shuffle
											style={{
												position: "relative"
											}}
										/>
										<Image
											alt="ICTCM"
											as="a"
											href="https://en.wikipedia.org/wiki/ICTCM_Award"
											src={ictcm}
											style={{
												position: "absolute",
												left: "0",
												top: "0",
												zIndex: "999"
											}}
											target="_blank"
											ui={false}
											width="100px"
											wrapped
										/>
									</div>
								</Card>
							</Grid.Column>
						</Grid.Row>
					</Grid>

					<Divider />
					<p style={{ margin: "0px", fontSize: "2.5em" }}>Downloadable Content</p>
					<Divider />
					<p style={{ margin: "0px", fontSize: "2.0em" }}>Finance with Maple</p>
					<p style={{ margin: "0px", fontSize: "1em" }}>by Eli Prisman</p>
					<br />

					<Grid>
						<Grid.Row columns={3}>
							<Grid.Column>
								<Card className="bg-white centered">
									<Image className="bg-white" src={finance} ui={false} wrapped />
									<Card.Content>
										<p style={{ fontSize: "1.5em" }}>Introduction to Derivative Securities</p>
									</Card.Content>
								</Card>
							</Grid.Column>
							<Grid.Column>
								<Card className="bg-white centered">
									<Image className="bg-white" src={finance} ui={false} wrapped />
									<Card.Content>
										<p style={{ fontSize: "1.5em" }}>Fixed Income Fundamentals</p>
									</Card.Content>
								</Card>
							</Grid.Column>
							<Grid.Column>
								<Card className="bg-white centered">
									<Image className="bg-white" src={finance} ui={false} wrapped />
									<Card.Content>
										<p style={{ fontSize: "1.5em" }}>Essays in Portfolio Management</p>
									</Card.Content>
								</Card>
							</Grid.Column>
						</Grid.Row>
					</Grid>
					<Divider />
				</Container>
				<Container
					fluid
					style={{
						background: "#3B8BEA",
						color: "white",
						marginTop: "40px",
						paddingTop: "20px",
						paddingBottom: "60px",
						textAlign: "center"
					}}
				>
					<p style={{ marginTop: "20px", fontSize: "2em" }}>
						Our products use a variety of technologies to help you quickly learn new math concepts.
					</p>
					<Container
						style={{
							display: "flex",
							justifyContent: "space-around",
							alignItems: "center"
						}}
					>
						<Image
							alt="KaTeX"
							as="a"
							href="https://katex.org/"
							src={katex}
							target="_blank"
							width="175"
						/>
						<Image
							alt="MathJax"
							as="a"
							href="https://www.mathjax.org"
							src="https://www.mathjax.org/badge/mj_logo.png"
							target="_blank"
							width="175"
						/>
						<Header
							as="a"
							href="http://mathlex.org/"
							style={{
								color: "#0b0",
								fontSize: "4em",
								fontFamily: "ChunkFive",
								lineHeight: "normal",
								latterSpacing: "1px"
							}}
							target="_blank"
						>
							MathLex
						</Header>
						<span>
							<Image
								alt="Maple"
								as="a"
								href="https://maplesoft.com/products/Maple/"
								src={maple}
								target="_blank"
								width="130"
							/>
							<span style={{ marginLeft: 15, fontSize: "1.5em" }}>Maple</span>
						</span>
					</Container>
				</Container>
				<Container
					fluid
					style={{
						background: "#343A40",
						color: "white",
						paddingTop: "40px",
						paddingBottom: "40px",
						textAlign: "center"
					}}
				>
					Copyright © 2011–19 P. B. Yasskin and D. B. Meade. All rights reserved.
				</Container>
			</Container>
		</Container>
	);
};

export default Home;
