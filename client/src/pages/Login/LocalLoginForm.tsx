import React, { useCallback, useState, useContext, useReducer, Reducer } from "react";
import { Form, Button, FormProps, Message, Loader } from "semantic-ui-react";
import CryptoJS from "crypto-js";
import { useHistory } from "react-router-dom";
import { ApplicationContext } from "../../context";
import { User } from "../../entities";

type FormValues = {
	email: string;
	password: string;
};

type FormAction = {
	type: "ERROR" | "LOADING";
	payload?: boolean | string;
};

type FormActionState = {
	error?: string;
	loading: boolean;
};

const formReducer = (state: FormActionState, action: FormAction): FormActionState => {
	switch (action.type) {
		case "ERROR":
			return { ...state, error: action.payload as string, loading: false };
		case "LOADING":
			return { ...state, error: undefined, loading: (action.payload as boolean) ?? true };
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

const LocalLoginForm: React.FC = (): JSX.Element => {
	const [formState, formStateDispatch] = useReducer<Reducer<FormActionState, FormAction>>(
		formReducer,
		{
			loading: false
		}
	);
	const [formValues, setFormValues] = useState<FormValues>({ email: "", password: "" });
	const ctx = useContext(ApplicationContext);
	const history = useHistory();

	const onSubmit = useCallback(
		(data: FormProps) => {
			formStateDispatch({ type: "LOADING" });
			fetch("/api/authentication/local/login", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email: formValues.email,
					hashedPassword: CryptoJS.SHA256(formValues.password + formValues.email).toString(
						CryptoJS.enc.Base64
					)
				})
			})
				.then(async (res) => {
					const user = (await res.json()) as User;
					ctx.setUser!(user);
					history.push("/");
				})
				.catch((err) =>
					formStateDispatch({
						type: "ERROR",
						payload:
							"Unable to login. Please ensure your email and password are correct and try again."
					})
				);
		},
		[formStateDispatch, ctx.setUser, formValues, history]
	);

	return (
		<Form
			error={formState.error !== undefined}
			loading={formState.loading}
			onSubmit={(event, data) => onSubmit(data)}
		>
			<Form.Input
				id="email"
				label="Email"
				onChange={(event, data) => setFormValues({ ...formValues, email: data.value })}
				required
				type="email"
			/>
			<Form.Input
				id="password"
				label="Password"
				onChange={(event, data) => setFormValues({ ...formValues, password: data.value })}
				required
				type="password"
			/>
			<Message content={formState.error} error />
			<Button color="green" fluid type="submit">
				{formState.loading ? <Loader active inline="centered" /> : "Login"}
			</Button>
		</Form>
	);
};

export default LocalLoginForm;
