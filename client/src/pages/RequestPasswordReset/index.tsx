import React from "react";
import Page from "../../components/Page";
import LocalRequestPasswordResetForm from "./LocalRequestResetPasswordForm";

const RequestPasswordReset: React.FC = () => {
	return (
		<Page>
			<LocalRequestPasswordResetForm />
		</Page>
	);
};

export default RequestPasswordReset;
