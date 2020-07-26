import React from "react";
import "./pins.scss";

import { Marker } from "react-map-gl";

export default function Pins({ locations, setSelected, goToViewport }) {
	return (
		<div>
			{locations.map((location) => {
				return (
					<Marker
						key={location.properties.Location.Address}
						latitude={location.geometry.coordinates[1]}
						longitude={location.geometry.coordinates[0]}
					>
						<button
							className="pin"
							onClick={(e) => {
								e.preventDefault();
								setSelected(location);

								goToViewport(
									location.geometry.coordinates[1],
									location.geometry.coordinates[0]
								);
							}}
						>
							<img src="img/pin.svg" alt="" />
						</button>
					</Marker>
				);
			})}
		</div>
	);
}
