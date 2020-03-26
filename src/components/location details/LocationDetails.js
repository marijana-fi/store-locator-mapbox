import React from "react";
import "./location-detail.scss";

export default function LocationDetails({ selected, open, closeLocation }) {
	const handleClick = () => {
		closeLocation();
	};

	return selected ? (
		<div className={`details-wrap ${open ? "open" : ""} `}>
			<button className="close" onClick={handleClick}>
				&times;
			</button>
			<h2 className="location-name">{selected.properties.Title}</h2>
			<div className="store-info">
				<div className="address">
					<h3>Location:</h3>
					<h4>{selected.properties.Location.Address}</h4>
				</div>
				<div className="hours">
					<h3>Store Hours:</h3>
					<h4>
						{selected.properties.hours.startTime} -
						{selected.properties.hours.endTime}
					</h4>
				</div>
			</div>
			<div>
				<img src="img/nike-store.webp" alt="" />
			</div>
		</div>
	) : null;
}
