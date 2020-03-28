import React, { useRef, useEffect } from "react";

import "./single-location.scss";
import { dateObj } from "./../../helpers.js";
export default function SingleLocation({
	selected,
	location,
	setSelected,
	goToViewport,
	handleFocusChange
}) {
	const handleClick = location => {
		setSelected(location);
		goToViewport(
			location.geometry.coordinates[1],
			location.geometry.coordinates[0]
		);
	};
	const locationWrap = useRef(null);

	useEffect(() => {
		if (location === selected) {
			handleFocusChange(locationWrap);
			locationWrap.current.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
		}
	}, [selected, setSelected]);

	const startTime = location.properties.hours.startTime;
	const endTime = location.properties.hours.endTime;
	const now = new Date();

	let startDate = dateObj(startTime); // get date objects
	let endDate = dateObj(endTime);

	if (startDate > endDate) {
		// check if start comes before end
		const temp = startDate; // if so, assume it's across midnight
		startDate = endDate; // and swap the dates
		endDate = temp;
	}

	const time = now < endDate && now > startDate ? "open" : "closed"; // compare

	const open = now < endDate && now > startDate; // compare
	const closed = now > endDate && now < startDate;

	return (
		<div
			className="location-wrap "
			tabIndex="0"
			role="button"
			aria-pressed="true"
			ref={locationWrap}
			onClick={() => handleClick(location)}
			onKeyDown={e => (e.keyCode === 13 ? handleClick(location) : null)}
		>
			<div className="info">
				<h2 className="location-name">{location.properties.Title}</h2>
				<div className="hours-wrap">
					<h4>
						Working hours:{" "}
						<span>
							{location.properties.hours.startTime} -{" "}
							{location.properties.hours.endTime}
						</span>
					</h4>
					<div className={`hours ${open ? "open" : ""} `}>
						{open ? "open" : "closed"}
					</div>
				</div>
			</div>
		</div>
	);
}
