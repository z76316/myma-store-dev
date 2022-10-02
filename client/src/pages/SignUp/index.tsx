import React from "react";
import ThirdPartyAuthenticators from "../../components/ThirdPartyAuthenticators";
import Page from "../../components/Page";
import LocalSignUpForm from "./LocalSignUpForm";

const SignUp: React.FC = (): JSX.Element => {
	return (
		<Page>
			<LocalSignUpForm />
			<ThirdPartyAuthenticators action="sign-up" />
		</Page>
	);
};

export default SignUp;
