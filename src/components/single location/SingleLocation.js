import React from "react";
import "./single-location.scss";

export default function SingleLocation({ location, setSelected }) {
	const handleClick = location => {
		setSelected(location);
	};
	return (
		<div className="location-wrap" onClick={() => handleClick(location)}>
			<h4 className="location-name">
				{location.properties.Location["Business Name"]}
			</h4>
			<h5>{location.properties.Location.Address}</h5>
		</div>
	);
}
