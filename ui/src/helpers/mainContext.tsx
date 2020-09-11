import React from "react";
import tokenHelper from "./tokenHelper";

const token = tokenHelper();
const userRoles = token.roles();
const initialContext = {
	isLoggedIn: token.isLoggedIn(),
	isAdmin: userRoles.includes("admin"),
	friendlyUrl: token.friendlyUrl() !== "" ? token.friendlyUrl() : "",
};

const mainContext = React.createContext({
	context: initialContext,
	setContext: (newContext: any) => {},
});

export function useMainContext() {
	return React.useContext(mainContext);
}

export default function MainContextProvider(props: any) {
	const [context, setContextInState] = React.useState(initialContext);
	const setContext = (newContext) =>
		setContextInState({ ...context, ...newContext });
	return (
		<mainContext.Provider value={{ context, setContext }}>
			{props.children}
		</mainContext.Provider>
	);
}
