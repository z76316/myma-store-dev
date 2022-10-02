import React from "react";
import ThirdPartyAuthenticators from "../../components/ThirdPartyAuthenticators";
import Page from "../../components/Page";
import LocalLoginForm from "./LocalLoginForm";

const Login: React.FC = (): JSX.Element => {
	return (
		<Page>
			<LocalLoginForm />
			<ThirdPartyAuthenticators action="login" />
		</Page>
	);
};

export default Login;
