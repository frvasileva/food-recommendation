import React from "react";
import "dotenv/config";

export const UploadPhoto = (props: any) => {
	let wind = window as any;
	let cloudinary = wind.cloudinary;
	let cloudinaryWidget: any;

	React.useEffect(function () {
		cloudinaryWidget = cloudinary.createUploadWidget(
			// {
			// 	cloudName: process.env.CLOUDINARY_NAME,
			// 	apiKey: process.env.CLOUDINARY_API_KEY,
			// 	apiSecret: process.env.CLOUDINARY_API_SECRET,
			// 	uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
			// },
			{
				cloudName: "deumq4qrd",
				apiKey: "991123829249252",
				apiSecret: "7LjQEUa2Ts01KzyuiqdbGRAop_8",
				uploadPreset: "glnbmjl8",
			},
			getResponse
		);
	});

	const openWidget = (e: any) => {
		e.preventDefault();
		cloudinaryWidget.open();
	};

	const getResponse = (error, result) => {
		if (!error && result && result.event === "success") {
			props.onImageUpload(result.info.url);
		}
	};

	return (
		<div className="upload-photo-widget-wrapper">
			<button
				id="upload_widget"
				className="btn btn-info"
				onClick={openWidget}
			>
				Add photo
			</button>
		</div>
	);
};
