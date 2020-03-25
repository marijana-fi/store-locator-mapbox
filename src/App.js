import data from "./nike-stores.json";
import React, { useState, useEffect } from "react";
import ReactMapGl, { FlyToInterpolator } from "react-map-gl";
import "./App.scss";
import SingleLocation from "./components/single location/SingleLocation";
import Pins from "./components/pins/Pins";
import InfoWindow from "./components/popup/InfoWindow";

const MAPBOX_TOKEN = process.env.REACT_APP_TOKEN;

function App() {
	const [locations, setLocations] = useState(data.features);
	const [viewport, setViewport] = useState({
		latitude: 49.0555,
		longitude: 8.4376,
		zoom: 4,
		width: "50vw",
		height: "100vh"
	});
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		const listener = e => {
			if (e.key === "Escape") {
				setSelected(null);
			}
		};
		window.addEventListener("keydown", listener);
		return () => {
			window.removeEventListener("keydown", listener);
		};
	}, []);

	const onViewportChange = viewport => {
		setViewport(viewport);
	};

	const goToViewport = (latitude, longitude) => {
		onViewportChange({
			latitude,
			longitude,
			zoom: 5,
			width: "50vw",
			height: "100vh",
			transitionInterpolator: new FlyToInterpolator({ speed: 1.4 }),
			transitionDuration: "auto"
		});
	};
	return (
		<div className="layout">
			<ReactMapGl
				{...viewport}
				mapboxApiAccessToken={MAPBOX_TOKEN}
				mapStyle="mapbox://styles/majafl/ck85sl3p80gga1iqce1tsuef5"
				onViewportChange={onViewportChange}
			>
				<Pins
					locations={locations}
					setSelected={setSelected}
					goToViewport={goToViewport}
				/>

				{selected ? (
					<InfoWindow selected={selected} setSelected={setSelected} />
				) : null}
			</ReactMapGl>

			<div className="locations-wrap">
				{locations.map(location => {
					return (
						<SingleLocation
							location={location}
							setSelected={setSelected}
							key={location.geometry.coordinates}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
