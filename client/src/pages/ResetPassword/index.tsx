import React from "react";
import Page from "../../components/Page";
import LocalResetPasswordForm from "./LocalResetPasswordForm";

const ResetPassword: React.FC = (): JSX.Element => {
	return (
		<Page>
			<LocalResetPasswordForm />
		</Page>
	);
};

export default ResetPassword;
