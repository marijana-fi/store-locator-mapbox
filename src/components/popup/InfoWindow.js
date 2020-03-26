import React from "react";
import "./info-window.scss";

import { Popup } from "react-map-gl";

export default function InfoWindow({
	selected,
	setSelected,
	openLocation,
	closeLocation
}) {
	const handleClick = () => {
		openLocation();
	};

	return (
		<Popup
			latitude={selected.geometry.coordinates[1]}
			longitude={selected.geometry.coordinates[0]}
			closeOnClick={false}
			onClose={() => {
				setSelected(null);
				closeLocation();
			}}
		>
			<div className="info-wrap">
				<h3 className="location-name">{selected.properties.Title}</h3>
				<h5>{selected.properties.Location.Address}</h5>
				<button className="view-store" onClick={handleClick}>
					view store
				</button>
			</div>
		</Popup>
	);
}
