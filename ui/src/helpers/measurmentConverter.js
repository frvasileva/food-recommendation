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
			default: return "";
		}
	};

	return { convertEnumToText };
};

export default measurmentConverter;