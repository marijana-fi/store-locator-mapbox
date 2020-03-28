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

				<button
					className="button directions"
					onClick={() => {
						window.open(
							`https://www.google.com/maps?saddr=My+Location&daddr=${selected.geometry.coordinates[1]},${selected.geometry.coordinates[0]}`,
							"_blank"
						);
					}}
				>
					Get Directions
				</button>
				<button className="button view-store" onClick={handleClick}>
					View Store
				</button>
			</div>
		</Popup>
	);
}
