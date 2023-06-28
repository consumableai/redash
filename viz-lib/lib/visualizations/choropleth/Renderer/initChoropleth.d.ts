import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
export default function initChoropleth(container: any, onBoundsChange: any): {
    updateLayers: (geoJson: any, data: any, options: any) => void;
    updateBounds: (bounds: any) => void;
    destroy(): void;
};
