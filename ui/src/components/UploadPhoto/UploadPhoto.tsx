import React from "react";
import "dotenv/config";

export const UploadPhoto = (props: any) => {
	let wind = window as any;
	let cloudinary = wind.cloudinary;
	let cloudinaryWidget: any;

	React.useEffect(function () {
		cloudinaryWidget = cloudinary.createUploadWidget(
			{
				cloudName: process.env.CLOUDINARY_NAME,
				apiKey: process.env.CLOUDINARY_API_KEY,
				apiSecret: process.env.CLOUDINARY_API_SECRET,
				uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
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
				className="cloudinary-button"
				onClick={openWidget}
			>
				Add photo
			</button>
		</div>
	);
};
