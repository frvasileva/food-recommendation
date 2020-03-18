var urlTransformer = function() {
	"use strict";

	var cyrilicToEnglish = {
		а: "a",
		б: "b",
		в: "v",
		г: "g",
		д: "d",
		е: "e",
		ж: "zh",
		з: "z",
		и: "i",
		й: "i",
		к: "k",
		л: "l",
		м: "m",
		н: "n",
		о: "o",
		п: "p",
		р: "r",
		с: "s",
		т: "t",
		у: "u",
		ф: "f",
		х: "h",
		ц: "tz",
		ч: "ch",
		ш: "sh",
		щ: "sht",
		ъ: "a",
		ь: "j",
		ю: "ju",
		я: "ja",
		" ": "-"
	};

	var forbiddenUrlSymbols = ".,>:<='';()?&~!/*^$#@".split("");

	var englishToCyrilic = Object.keys(cyrilicToEnglish).reduce(
		(result, bgChar) => {
			result[cyrilicToEnglish[bgChar]] = bgChar;
			return result;
		},
		{}
	);

	const cleanNonUrlSymbols = text => {
		let wordArray = text.split("");

		var result = wordArray.map(item => {
			forbiddenUrlSymbols.map(fi => {
				if (item == fi) {
					item = "";
				}
			});
			return item;
		});
		return result.join("");
	};

	const bulgarianToEnglish = text => {
		let wordArray = text.split("");

		const result = wordArray.map(char => {
			return cyrilicToEnglish[char];
		});
		return result.join("");
	};

	const englishToBulgarian = text => {
		let wordArray = cleanNonUrlSymbols(text).split("");

		const result = wordArray.map(char => {
			return englishToCyrilic[char];
		});

		return result.join("");
	};

	return { bulgarianToEnglish, englishToBulgarian, cleanNonUrlSymbols };
};

export default urlTransformer;
