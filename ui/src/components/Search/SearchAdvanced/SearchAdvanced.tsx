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
	const [fIngredients, setSelectedIngredients] = useState([] as string[]);
	const [fPreparationTime, setPreparationTime] = useState([] as string[]);
	const [fCookingTime, setCookingTime] = useState([] as string[]);
	const [fSkillLevel, setSkillLevel] = useState([] as string[]);

	const query = useQuery(TOP_INGREDIENTS_QUERY);

	if (query.loading) return null;
	if (query.error) return <ErrorScreen error={query.error} />;

	const ingredients = query.data.topIngredients;

	const setSelIngredients = (e: any) => {
		if (e.target.type !== "checkbox") return;
		if (fIngredients.includes(e.target.value)) {
			setSelectedIngredients(fIngredients.filter((i) => i !== e.target.value));
		} else {
			setSelectedIngredients([...fIngredients, e.target.value]);
		}
	};
	const setPrepTime = (e: any) => {
		if (e.target.type !== "checkbox") return;
		if (fPreparationTime.includes(e.target.value)) {
			setPreparationTime(fPreparationTime.filter((i) => i !== e.target.value));
		} else {
			setPreparationTime([...fPreparationTime, e.target.value]);
		}
	};
	const setCookTime = (e: any) => {
		if (e.target.type !== "checkbox") return;
		if (fCookingTime.includes(e.target.value)) {
			setCookingTime(fCookingTime.filter((i) => i !== e.target.value));
		} else {
			setCookingTime([...fCookingTime, e.target.value]);
		}
	};
	const setLevel = (e: any) => {
		console.log("setLevel");
		if (e.target.type !== "checkbox") return;
		if (fSkillLevel.includes(e.target.value)) {
			setSkillLevel(fSkillLevel.filter((i) => i !== e.target.value));
		} else {
			setSkillLevel([...fSkillLevel, e.target.value]);
		}
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const advancedFilterSubmitted = () => {
		var param = "";
		if (fIngredients.length != 0) {
			let url = "&ingredients=" + fIngredients.join(",");
			param = url;
		}
		if (fPreparationTime.length != 0) {
			let url = "&prepTime=" + fPreparationTime.join(",");
			param = param + url;
		}
		if (fCookingTime.length != 0) {
			let url = "&cookingTime=" + fCookingTime.join(",");
			param = param + url;
		}

		if (fSkillLevel.length != 0) {
			let url = "&skillLevel=" + fSkillLevel.join(",");
			param = param + url;
		}

		console.log("param", param);
		setShow(false);

		console.log("submitted from child");

		props.advancedFilterSubmitted(param);
	};

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
		{ label: "Easy", value: "easy" },
		{ label: "Medium", value: "medium" },
		{ label: "Hard", value: "hard" },
	];
	const specialDiet = [
		{ label: "Diary free", value: "diary-free" },
		{ label: "Egg free", value: "egg-free" },
		{ label: "Vegan", value: "vegan" },
		{ label: "Vegetarenian", value: "vegetarenian" },
		{ label: "Gluten free", value: "gluten-free" },
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
				{/* <Modal.Header closeButton>
					<Modal.Title>Detailed filter</Modal.Title>
				</Modal.Header> */}
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
										onClick={setSelIngredients}
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
												onClick={setPrepTime}
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
											onClick={setCookTime}
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
								defaultValue={["medium"]}
								className="custom-toggle-btn"
							>
								{skillLevel.map((item: any) => (
									<ToggleButton
										value={item.value}
										variant="outline-info"
										className="custom-btn"
										onClick={setLevel}
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
					<Button variant="info" onClick={advancedFilterSubmitted}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
