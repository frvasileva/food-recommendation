import React, { useState } from "react";
import "./SearchAdvanced.scss";
import { Button, Modal } from "react-bootstrap";
import { TOP_INGREDIENTS_QUERY } from "../../../helpers/queries";
import { useQuery } from "@apollo/react-hooks";
import LoadingScreen from "../../../layout/Loading/Loading";
import ErrorScreen from "../../../layout/ErrorPage/Error";
import "./SearchAdvanced.scss";

export const SearchAdvanced = (props: any) => {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const query = useQuery(TOP_INGREDIENTS_QUERY);

	if (query.loading) return null;
	if (query.error) return <ErrorScreen error={query.error} />;

	const ingredients = query.data.topIngredients;

	return (
		<>
			<Button variant="light" size="sm" onClick={handleShow}>
				Advanced search
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				size="lg"
				className="search-modal"
			>
				<Modal.Header closeButton>
					<Modal.Title>Detailed filter</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						<div className="col-md">
							{" "}
							<p>Select ingredients:</p>
							<ul className="search-filer-list top-ingredients-list">
								{ingredients.map((ingredient: any) => (
									<li key={ingredient.name}>
										<Button variant="outline-info" size="sm">
											{ingredient.name}
										</Button>
									</li>
								))}
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-md-4">
							{" "}
							<p>Preparation time:</p>
							<ul className="search-filer-list  preparation-time-list">
								<li>
									<Button variant="outline-info" size="sm">
										15 min
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										30 min
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										60 min
									</Button>
								</li>
							</ul>
						</div>
						<div className="col-md-4">
							{" "}
							<p>Cooking time:</p>
							<ul className="search-filer-list  preparation-time-list">
								<li>
									<Button variant="outline-info" size="sm">
										15 min
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										30 min
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										60 min
									</Button>
								</li>
							</ul>
						</div>

						<div className="col-md-4">
							{" "}
							<p>Difficulty:</p>
							<ul className="search-filer-list  preparation-time-list">
								<li>
									<Button variant="outline-info" size="sm">
										Easy
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										Medium
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										Hard
									</Button>
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-md">
							<p>Special diet:</p>
							<ul className="search-filer-list  preparation-time-list">
								<li>
									<Button variant="outline-info" size="sm">
										Gluten free
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										Diary free
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										Egg free
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										Vegan
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										Vegeterian
									</Button>
								</li>
								<li>
									<Button variant="outline-info" size="sm">
										Healthy
									</Button>
								</li>
							</ul>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
