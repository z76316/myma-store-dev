import React, { useState, useReducer, Reducer, useCallback } from "react";
import { Form, Button, Message, Loader, Segment } from "semantic-ui-react";

type FormAction = {
	type: "SUCCESS" | "LOADING" | "ERROR";
	payload?: boolean;
};

type FormActionState = {
	success: boolean;
	error: boolean;
	loading: boolean;
};

const formStateReducer = (state: FormActionState, action: FormAction): FormActionState => {
	switch (action.type) {
		case "ERROR":
			return { ...state, loading: false, success: false, error: action.payload ?? true };
		case "LOADING":
			return { ...state, success: false, error: false, loading: action.payload ?? true };
		case "SUCCESS":
			return { ...state, error: false, loading: false, success: action.payload ?? true };
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

const LocalRequestPasswordResetForm: React.FC = (): JSX.Element => {
	const [email, setEmail] = useState<string | undefined>();
	const [formState, formStateDispatch] = useReducer<Reducer<FormActionState, FormAction>>(
		formStateReducer,
		{ loading: false, success: false, error: false }
	);

	const onSubmit = useCallback(() => {
		if (email !== undefined) {
			formStateDispatch({ type: "LOADING" });
			fetch(`/api/authentication/reset-password?email=${email}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then((res) => formStateDispatch({ type: "SUCCESS" }))
				.catch((err) => formStateDispatch({ type: "ERROR" }));
		}
	}, [email]);

	return (
		<>
			<Segment>
				If you used your email to create an account, you can request a password reset.
			</Segment>
			<Form
				error={formState.error}
				loading={formState.loading}
				onSubmit={(event, data) => onSubmit()}
				success={formState.success}
			>
				<Form.Input
					id="email"
					label="Email"
					onChange={(event, data) => setEmail(data.value)}
					required
					type="email"
				/>
				<Message content="Unable to reset your password. Please try again." error header="Error" />
				<Message
					content="If an account exists with that email, a link to reset your password will be sent to it."
					success
				/>
				<Button active={!formState.success} color="green" fluid type="submit">
					{formState.loading ? <Loader active inline="centered" /> : "Submit"}
				</Button>
			</Form>
		</>
	);
};

export default LocalRequestPasswordResetForm;
