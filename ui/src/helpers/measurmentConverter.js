var measurmentConverter = function () {
	const convertEnumToText = (value) => {
		if (value === null || value === undefined || value === "") {
			return "";
		}

		switch (value) {
			case "number":
				return "броя";
			case "teaspoon":
				return "ч.л.";
			case "tablespoon":
				return "с.л.";
			case "cup":
				return "чаши";
			case "ml":
				return "мл.";
			case "g":
				return "гр.";
			case "mm":
				return "мм";
			case "cm":
				return "см";
		}
	};

	return { convertEnumToText };
};

export default measurmentConverter;

// <option value="number">Number</option>
// <option value="teaspoon">Teaspoon</option>
// <option value="tablespoon">Tablespoon</option>
// <option value="cup">Cup</option>
// <option value="ml">ml</option>
// <option value="g">g</option>
// <option value="mm">mm</option>
// <option value="cm">cm</option>
