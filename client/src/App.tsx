import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { SWRConfig } from "swr";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { ApplicationContext } from "./context/application.context";
import Header from "./components/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MYMACalc1 from "./pages/MYMACalc1";
import MYMACalc3 from "./pages/MYMACalc3";
import MYMACalc2 from "./pages/MYMACalc2";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import User from "./entities/user";
import Subscription from "./entities/subscription";
import Home from "./pages/Home";
import AccountActivation from "./pages/AccountActivation";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RequestPasswordReset from "./pages/RequestPasswordReset";
import ResetPassword from "./pages/ResetPassword";

const App: React.FC = (): JSX.Element => {
	// eslint-disable-next-line
	const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
	const [user, setUser] = useState<User | undefined>();
	const [cart, setCart] = useState<Subscription[]>([]);

	useEffect(() => {
		if (cookies.jwt !== undefined) {
			const jwtLogin = async (): Promise<void> => {
				const res = await fetch("/api/authentication/jwt/login", {
					method: "GET",
					headers: { Accept: "application/json", Authorization: `Bearer ${cookies.jwt}` }
				});

				if (res.status === 200) {
					setUser((await res.json()) as User);
				}
			};

			jwtLogin();
		}
	}, [cookies.jwt]);

	return (
		<BrowserRouter>
			<SWRConfig
				value={{
					refreshWhenHidden: false,
					refreshWhenOffline: false,
					revalidateOnFocus: false,
					revalidateOnReconnect: false
				}}
			>
				<ApplicationContext.Provider value={{ user, setUser, cart, setCart }}>
					<div className="App" style={{ display: "flex", flexDirection: "column" }}>
						<Header />
						<main style={{ flexGrow: 1 }}>
							<Switch>
								<Route exact path="/">
									<Home />
								</Route>
								<Route exact path="/login">
									<Login />
								</Route>
								<Route exact path="/sign-up">
									<SignUp />
								</Route>
								<Route exact path="/about">
									<About />
								</Route>
								<Route exact path="/products">
									<Products />
								</Route>
								<Route exact path="/products/MYMACalc1">
									<MYMACalc1 />
								</Route>
								<Route exact path="/products/MYMACalc2">
									<MYMACalc2 />
								</Route>
								<Route exact path="/products/MYMACalc3">
									<MYMACalc3 />
								</Route>
								<Route exact path="/checkout">
									<Checkout />
								</Route>
								<Route exact path="/contact">
									<Contact />
								</Route>
								<Route exact path="/activate">
									<AccountActivation />
								</Route>
								<Route exact path="/reset-password">
									<ResetPassword />
								</Route>
								<Route exact path="/request-password-reset">
									<RequestPasswordReset />
								</Route>
							</Switch>
						</main>
					</div>
				</ApplicationContext.Provider>
			</SWRConfig>
		</BrowserRouter>
	);
};

export default App;
