import React from "react";
import "./single-location.scss";

export default function SingleLocation({
	location,
	setSelected,
	goToViewport
}) {
	const handleClick = location => {
		setSelected(location);
		goToViewport(
			location.geometry.coordinates[1],
			location.geometry.coordinates[0]
		);
	};
	return (
		<div
			className="location-wrap"
			tabIndex="0"
			onClick={() => handleClick(location)}
		>
			<div className="info">
				<h2 className="location-name">{location.properties.Title}</h2>
				<h5>{location.properties.Location.Address}</h5>
			</div>
		</div>
	);
}
