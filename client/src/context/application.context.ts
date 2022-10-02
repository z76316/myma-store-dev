import React from "react";
import { User, Subscription } from "../entities";

export type ApplicationContextData = {
	user?: User;
	setUser?: (user?: User) => void;
	cart: Subscription[];
	setCart?: (cart: Subscription[]) => void;
};

export const ApplicationContext = React.createContext<ApplicationContextData>({
	cart: []
});
