import data from "./nike-stores.json";
import React, { useState, useEffect } from "react";
import ReactMapGl, {
	FlyToInterpolator,
	GeolocateControl,
	NavigationControl
} from "react-map-gl";
import "./App.scss";
import SingleLocation from "./components/single location list/SingleLocation";
import Pins from "./components/pins/Pins";
import InfoWindow from "./components/popup/InfoWindow";
import LocationDetails from "./components/location details/LocationDetails";

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
	const [open, setOpen] = useState(false);

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
			zoom: 6,
			width: "50vw",
			height: "100vh",
			transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
			transitionDuration: "auto"
		});
	};
	const openLocation = () => {
		setOpen(true);
	};
	const closeLocation = () => {
		setOpen(false);
	};
	return (
		<div className="layout">
			<ReactMapGl
				{...viewport}
				mapboxApiAccessToken={MAPBOX_TOKEN}
				mapStyle="mapbox://styles/majafl/ck89104040auz1ilj59832tld"
				onViewportChange={onViewportChange}
			>
				<div style={{ position: "absolute", right: 10, top: 10 }}>
					<NavigationControl />
				</div>
				<GeolocateControl
					positionOptions={{ enableHighAccuracy: true }}
					trackUserLocation={true}
					style={{ position: "absolute", left: 10, top: 10 }}
				/>
				<Pins
					locations={locations}
					setSelected={setSelected}
					goToViewport={goToViewport}
				/>
				{selected ? (
					<InfoWindow
						selected={selected}
						setSelected={setSelected}
						openLocation={openLocation}
						closeLocation={closeLocation}
					/>
				) : null}
			</ReactMapGl>

			<div className="locations-wrap">
				{locations.map(location => {
					return (
						<SingleLocation
							location={location}
							setSelected={setSelected}
							key={location.geometry.coordinates}
							goToViewport={goToViewport}
						/>
					);
				})}
			</div>
			<LocationDetails
				selected={selected}
				open={open}
				closeLocation={closeLocation}
			/>
		</div>
	);
}

export default App;
