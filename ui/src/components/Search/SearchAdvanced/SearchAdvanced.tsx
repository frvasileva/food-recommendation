import React, { useState } from "react";
import "./SearchAdvanced.scss";
import {
	Button,
	Modal,
	ToggleButtonGroup,
	ToggleButton,
} from "react-bootstrap";
import { TOP_INGREDIENTS_QUERY } from "../../../helpers/queries";
import { useQuery } from "@apollo/react-hooks";

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
	const preparationTime = [
		{ label: "15 min", value: "15" },
		{ label: "30 min", value: "30" },
		{ label: "60 min", value: "60" },
	];
	const cookingTime = [
		{ label: "15 min", value: "15" },
		{ label: "30 min", value: "30" },
		{ label: "60 min", value: "60" },
	];
	const skillLevel = [
		{ label: "Easy", value: "Easy" },
		{ label: "Medium", value: "Medium" },
		{ label: "Hard", value: "Hard" },
	];
	const specialDiet = [
		{ label: "Diary free", value: "Diary free" },
		{ label: "Egg free", value: "Egg free" },
		{ label: "Vegan", value: "Vegan" },
		{ label: "Vegetarenian", value: "Vegetarenian" },
		{ label: "Gluten free", value: "Gluten free" },
		{ label: "Low carb", value: "Low carb" },
		{ label: "High protein", value: "High protein" },
	];

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
							<p>Select ingredients:</p>
							<ToggleButtonGroup
								type="checkbox"
								// defaultValue={["lemon", "orange"]}
								className="custom-toggle-btn"
							>
								{ingredients.map((ingredient: any) => (
									<ToggleButton
										value={ingredient.name}
										variant="outline-info"
										className="custom-btn"
									>
										{ingredient.name}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<p>Preparation time:</p>
							<div className="row">
								<div className="col-md">
									<ToggleButtonGroup
										type="checkbox"
										defaultValue={["30"]}
										className="custom-toggle-btn"
									>
										{preparationTime.map((item: any) => (
											<ToggleButton
												value={item.value}
												variant="outline-info"
												className="custom-btn"
											>
												{item.label}
											</ToggleButton>
										))}
									</ToggleButtonGroup>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md">
								<p>Cooking time:</p>
								<ToggleButtonGroup
									type="checkbox"
									defaultValue={["30"]}
									className="custom-toggle-btn"
								>
									{cookingTime.map((item: any) => (
										<ToggleButton
											value={item.value}
											variant="outline-info"
											className="custom-btn"
										>
											{item.label}
										</ToggleButton>
									))}
								</ToggleButtonGroup>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<p>Difficulty:</p>
							<ToggleButtonGroup
								type="checkbox"
								defaultValue={["30"]}
								className="custom-toggle-btn"
							>
								{skillLevel.map((item: any) => (
									<ToggleButton
										value={item.value}
										variant="outline-info"
										className="custom-btn"
									>
										{item.label}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
						</div>
					</div>
					<div className="row">
						<div className="col-md">
							<p>Special diet:</p>
							<ToggleButtonGroup
								type="checkbox"
								defaultValue={["30"]}
								className="custom-toggle-btn"
							>
								{specialDiet.map((item: any) => (
									<ToggleButton
										value={item.value}
										variant="outline-info"
										className="custom-btn"
									>
										{item.label}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
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
