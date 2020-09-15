import React from "react";
import ApolloClient from "apollo-boost";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";

import { Header } from "./layout/Header/Header";
import "./App.css";
import "./layout/layout.scss";
import MainContextProvider from "./helpers/mainContext";
import Routing from "./layout/Routing";

const client = new ApolloClient({
	uri: "/api",
	request: (operation) => {
		const token = localStorage.getItem("token");

		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : "",
			},
		});
	},
});

const App = () => {
	return (
		<BrowserRouter>
			<MainContextProvider>
				<ApolloProvider client={client}>
					<Header />
					<div className="layout-wrapper">
						<Routing></Routing>
					</div>
				</ApolloProvider>
			</MainContextProvider>
		</BrowserRouter>
	);
};

export default App;
