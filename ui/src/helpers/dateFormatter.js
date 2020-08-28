var dateFormatter = function() {

	const shortDate_ddMMyyy = date => {
		let current_datetime = new Date();
		let formatted_date =
			current_datetime.getDate() +
			"-" +
			(current_datetime.getMonth() + 1) +
			"-" +
			current_datetime.getFullYear();
		return formatted_date;
	};

	const longDate_ddMMyyyy_hhmmss = date => {
		let current_datetime = new Date();
		let formatted_date =
			current_datetime.getDate() +
			"-" +
			(current_datetime.getMonth() + 1) +
			"-" +
			current_datetime.getFullYear() +
			" " +
			current_datetime.getHours() +
			":" +
			current_datetime.getMinutes() +
			":" +
			current_datetime.getSeconds();

		return formatted_date;
	};

	return { shortDate_ddMMyyy, longDate_ddMMyyyy_hhmmss };
};

export default dateFormatter;
