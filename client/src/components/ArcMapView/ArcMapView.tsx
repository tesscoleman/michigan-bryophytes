import { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView"
import EsriMap from "@arcgis/core/Map";


import "./ArcMapView.css";
import { MapViewContext } from "../../contexts/MapViewContext";


interface IArcMapViewProps {
    children?: React.ReactNode;
}

export const ArcMapView = (props: IArcMapViewProps) => {
    const {children} = props; // ArcMapView has children (Its Graphics Layer)

    const mapRef = useRef(null); 
    const [view, setView] = useState<__esri.MapView | undefined>();
    useEffect(()=> {

        if(!mapRef?.current) return;

        const map = new EsriMap({
            basemap: "topo-vector"
        });

        const _view = new MapView({
            container: mapRef.current,
            map: map,
            zoom: 10,
            constraints: {minZoom: 3}
        });

        _view.when(function() {
            // MapView is now ready for display and can be used. Here we will
            // use goTo to view a particular location at a given zoom level and center
            _view.goTo({
              center: [-98, 44],
              zoom: 4
            });
          })
          .catch(function(err) {
            // A rejected view indicates a fatal error making it unable to display.
            // Use the errback function to handle when the view doesn't load properly
            console.error("MapView rejected:", err);
          });

          setView(_view);
          return () => _view && _view.destroy(); // To clean up and avoid memory leak.
    },[]);


    return (
            <div ref={mapRef} className="viewDiv"><MapViewContext.Provider value={{view}}>{children}</MapViewContext.Provider></div>
    )
}