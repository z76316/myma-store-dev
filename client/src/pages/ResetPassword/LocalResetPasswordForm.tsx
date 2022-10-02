import React, { useCallback, useReducer, Reducer, useState } from "react";
import { Form, FormProps, Button, Message } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

type FormValues = {
	email: string;
	temporaryPassword: string;
	newPassword: string;
	confirmedNewPassword: string;
};

type FormAction = {
	type: "SUCCESS" | "LOADING" | "CONFIRMED_PASSWORD_ERROR" | "REQUEST_ERROR";
	payload?: boolean;
};

type FormActionState = {
	success: boolean;
	confirmedPasswordError: boolean;
	requestError: boolean;
	loading: boolean;
};

const formStateReducer = (state: FormActionState, action: FormAction): FormActionState => {
	switch (action.type) {
		case "REQUEST_ERROR":
			return { ...state, loading: false, success: false, requestError: action.payload ?? true };
		case "CONFIRMED_PASSWORD_ERROR":
			return {
				...state,
				loading: false,
				success: false,
				confirmedPasswordError: action.payload ?? true
			};
		case "LOADING":
			return {
				...state,
				success: false,
				requestError: false,
				confirmedPasswordError: false,
				loading: action.payload ?? true
			};
		case "SUCCESS":
			return {
				...state,
				requestError: false,
				confirmedPasswordError: false,
				loading: false,
				success: action.payload ?? true
			};
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

const LocalResetPasswordForm: React.FC = (): JSX.Element => {
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const email = params.get("email");
	const temporaryPassword = params.get("temporaryPassword");
	const [formValues, setFormValues] = useState<FormValues>({
		email: email ?? "",
		temporaryPassword: temporaryPassword ?? "",
		newPassword: "",
		confirmedNewPassword: ""
	});
	const [formState, formStateDispatch] = useReducer<Reducer<FormActionState, FormAction>>(
		formStateReducer,
		{ loading: false, success: false, requestError: false, confirmedPasswordError: false }
	);

	const onSubmit = useCallback(
		(data: FormProps) => {
			formStateDispatch({ type: "LOADING" });
			fetch("/api/authentication/reset-password", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: formValues.email,
					temporaryPassword: formValues.temporaryPassword,
					hashedPassword: CryptoJS.SHA256(formValues.newPassword + formValues.email).toString(
						CryptoJS.enc.Base64
					)
				})
			})
				.then((res) => formStateDispatch({ type: "SUCCESS" }))
				.catch((err) =>
					formStateDispatch({
						type: "REQUEST_ERROR",
						payload: true
					})
				);
		},
		[formStateDispatch, formValues]
	);

	return (
		<Form
			error={formState.requestError}
			loading={formState.loading}
			onSubmit={(event, data) => onSubmit(data)}
			success={formState.success}
		>
			<Form.Input
				id="email"
				label="Email"
				onChange={(event, data) => setFormValues({ ...formValues, email: data.value })}
				required
				type="email"
				value={email}
			/>
			<Form.Input
				id="temporaryPassword"
				label="Temporary Password"
				onChange={(event, data) => setFormValues({ ...formValues, temporaryPassword: data.value })}
				required
				type="password"
				value={temporaryPassword}
			/>
			<Form.Input
				id="newPassword"
				label="New Password"
				onChange={(event, data) => setFormValues({ ...formValues, newPassword: data.value })}
				required
				type="password"
			/>
			<Form.Input
				error={
					formState.confirmedPasswordError
						? { content: "Passwords do not match", pointing: "below" }
						: false
				}
				id="confirmNewPassword"
				label="Confirm New Password"
				onChange={(event, data) => {
					formStateDispatch({
						type: "CONFIRMED_PASSWORD_ERROR",
						payload: data.value !== formValues.newPassword
					});
					setFormValues({ ...formValues, confirmedNewPassword: data.value });
				}}
				required
				type="password"
			/>
			<Message content="Unable to change your password. Please try again." error header="Error" />
			<Message
				content="Your password has been successfully changed. You can now login again."
				header="Success"
				success
			/>
			<Button
				active={!formState.success && !formState.confirmedPasswordError && !formState.requestError}
				color="green"
				fluid
				type="submit"
			>
				Submit
			</Button>
		</Form>
	);
};

export default LocalResetPasswordForm;
