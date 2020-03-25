import React from "react";

import { Marker } from "react-map-gl";

export default function Pins({ locations, setSelected }) {
	return (
		<div>
			{locations.map(location => {
				return (
					<Marker
						key={location.properties.Address}
						latitude={location.geometry.coordinates[1]}
						longitude={location.geometry.coordinates[0]}
					>
						<button
							className="pin"
							onClick={e => {
								e.preventDefault();
								setSelected(location);
							}}
						>
							<img src="/img/pin-drop.svg" alt="store" />
						</button>
					</Marker>
				);
			})}
		</div>
	);
}
