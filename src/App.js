import data from "./nike-stores.json";
import React, { useState, useEffect } from "react";
import ReactMapGl from "react-map-gl";
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

	return (
		<div className="layout">
			<ReactMapGl
				{...viewport}
				mapboxApiAccessToken={MAPBOX_TOKEN}
				mapStyle="mapbox://styles/majafl/ck85sl3p80gga1iqce1tsuef5"
				onViewportChange={viewport => {
					setViewport(viewport);
				}}
			>
				<Pins locations={locations} setSelected={setSelected} />

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
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
