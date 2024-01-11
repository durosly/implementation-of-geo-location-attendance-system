"use client";
import { icon } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function MapDisplay() {
	return (
		<MapContainer
			center={[5.567815256141947, 5.838884152823986]}
			zoom={13}
			scrollWheelZoom={false}
			// style={{ height: 500 }}
			className="h-[500px]"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker
				icon={icon({
					iconUrl: "/pointer.png",
					iconSize: [38, 38],
					iconAnchor: [22, 94],
					popupAnchor: [-3, -76],
				})}
				position={[5.567815256141947, 5.838884152823986]}
			>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
}

export default MapDisplay;
