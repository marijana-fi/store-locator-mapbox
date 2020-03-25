import React from "react";
import "./info-window.scss";

import { Popup } from "react-map-gl";

export default function InfoWindow({ selected, setSelected }) {
	console.log(selected.geometry.coordinates[1].toFixed(2));

	return (
		<Popup
			latitude={selected.geometry.coordinates[1]}
			longitude={selected.geometry.coordinates[0]}
			onClose={() => {
				setSelected(null);
			}}
		>
			<div className="info-wrap">
				<h4 className="location-name">
					{selected.properties.Location["Business Name"]}
				</h4>
				<h5>{selected.properties.Location.Address}</h5>
				<button className="view-store">view store</button>
			</div>
		</Popup>
	);
}
