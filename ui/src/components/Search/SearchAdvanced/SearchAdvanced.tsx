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

		props.advancedFilterSubmitted(param);
	};

	const preparationTime = [
		{ label: "15 мин", value: "15" },
		{ label: "30 мин", value: "30" },
		{ label: "60 мин", value: "60" },
	];
	const cookingTime = [
		{ label: "15 мин", value: "15" },
		{ label: "30 мин", value: "30" },
		{ label: "60 мин", value: "60" },
	];
	const skillLevel = [
		{ label: "Лесно", value: "Easy" },
		{ label: "Средно", value: "Medium" },
		{ label: "Трудно", value: "Hard" },
	];
	const specialDiet = [
		{ label: "Безмлечна", value: "diary-free" },
		{ label: "Без яйца", value: "egg-free" },
		{ label: "Веган", value: "vegan" },
		{ label: "Вегетарианска", value: "vegetarenian" },
		{ label: "Без глутен", value: "gluten-free" },
	];

	return (
		<>
			<Button variant="light" size="sm" onClick={handleShow}>
				Филтри
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
							<p>Основни продукти:</p>
							<ToggleButtonGroup
								type="checkbox"
								// defaultValue={["lemon", "orange"]}
								className="custom-toggle-btn"
							>
								{ingredients.map((item: any) => (
									<ToggleButton
										value={item.name}
										variant="outline-info"
										className="custom-btn"
										onClick={setSelIngredients}
										key={item.name}
									>
										{item.name}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6">
							<p>Време за приготвяне:</p>
							<div className="row">
								<div className="col-md">
									<ToggleButtonGroup
										type="checkbox"
										// defaultValue={["30"]}
										className="custom-toggle-btn"
									>
										{preparationTime.map((item: any) => (
											<ToggleButton
												value={item.value}
												variant="outline-info"
												className="custom-btn"
												onClick={setPrepTime}
												key={item.value}
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
								<p>Време за готвене:</p>
								<ToggleButtonGroup
									type="checkbox"
									// defaultValue={["30"]}
									className="custom-toggle-btn"
								>
									{cookingTime.map((item: any) => (
										<ToggleButton
											value={item.value}
											variant="outline-info"
											className="custom-btn"
											onClick={setCookTime}
											key={item.value}
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
								// defaultValue={["medium"]}
								className="custom-toggle-btn"
							>
								{skillLevel.map((item: any) => (
									<ToggleButton
										value={item.value}
										variant="outline-info"
										className="custom-btn"
										onClick={setLevel}
										key={item.value}
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
										key={item.value}
									>
										{item.label}
									</ToggleButton>
								))}
							</ToggleButtonGroup>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={handleClose}>
						Затвори
					</Button>
					<Button variant="dark" onClick={advancedFilterSubmitted}>
						Запази
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};
