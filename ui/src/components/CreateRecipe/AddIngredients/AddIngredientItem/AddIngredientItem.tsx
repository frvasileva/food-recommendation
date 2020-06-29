import React, { useState } from "react";
import "./AddIngredientItem.scss";

export interface AddIngredientItemProps {
	value: {
		name: { value: string; error: string };
		quantity: { value: number; error: string };
		quantityType: { value: string; error: string };
	};
	onChange: Function;
	onRemove: Function;
}

export default function AddIngredientItem(props: AddIngredientItemProps) {
	const fields = props.value;
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		props.onChange({ name, value });
		setSelectedOption(value);
	};

	const [selectedOption, setSelectedOption] = useState("number");

	return (
		<div>
			<div className="row">
				<div className="col-md-5">
					<input
						type="text"
						className="form-control"
						id="name"
						name="name"
						aria-describedby="recipeHelp"
						placeholder="Ingredients"
						value={fields.name.value}
						onChange={handleChange}
					/>
					{fields.name.error && (
						<span className="text-error">{fields.name.error}</span>
					)}
				</div>
				<div className="col-md-3">
					<input
						type="text"
						className="form-control"
						id="quantity"
						name="quantity"
						aria-describedby="recipeHelp"
						placeholder="Quantity"
						value={fields.quantity.value}
						onChange={handleChange}
					/>
					{fields.quantity.error && (
						<span className="text-error">{fields.quantity.error}</span>
					)}
				</div>
				<div className="col-md-2">
					<div className="form-group">
						<select
							id="quantityType"
							name="quantityType"
							className="form-control"
							value={selectedOption}
							onChange={handleChange}
						>
							<option value="number">Number</option>
							<option value="teaspoon">Teaspoon</option>
							<option value="tablespoon">Tablespoon</option>
							<option value="cup">Cup</option>
							<option value="ml">ml</option>
							<option value="ml">ml</option>
							<option value="g">g</option>
							<option value="mm">mm</option>
							<option value="cm">cm</option>
						</select>
					</div>
					{fields.quantityType.error && (
						<span className="text-error">{fields.quantityType.error}</span>
					)}
				</div>
				<div className="col-md-2">
					<button
						onClick={(e) => props.onRemove(e)}
						className="remove-btn align-middle"
					>
						<i className="far fa-trash-alt"></i>
					</button>
				</div>
			</div>
		</div>
	);
}
