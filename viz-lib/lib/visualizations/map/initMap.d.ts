import "leaflet.markercluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "beautifymarker";
import "beautifymarker/leaflet-beautify-marker-icon.css";
import "leaflet-fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
export default function initMap(container: any): {
    onBoundsChange: () => void;
    updateLayers: (groups: any, options: any) => void;
    updateBounds: (bounds: any) => void;
    destroy(): void;
};
