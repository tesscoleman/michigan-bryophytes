import { useContext, useEffect, useState } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { MapViewContext } from "../../contexts/MapViewContext";
import Occurrence from "../../interfaces/Occurrence";

interface Props {
  occurrences?: Occurrence[];
}

export const ArcGraphicsLayer = ({ occurrences }: Props) => {
  const { view } = useContext(MapViewContext);
  const [graphicsLayer, setGraphicsLayer] = useState<
    __esri.GraphicsLayer | undefined
  >();

  useEffect(() => {
    const _graphicsLayer = new GraphicsLayer();
    setGraphicsLayer(_graphicsLayer);
    occurrences?.forEach((occurrence) => {
      // First create a point geometry
      let point = new Point({
        longitude: occurrence.decimalLongitude,
        latitude: occurrence.decimalLatitude,
      });

      // Create a symbol for drawing the point
      let markerSymbol = new SimpleMarkerSymbol({
        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        color: [226, 119, 40],
      });
      const graphicPoint = new Graphic({
        geometry: point,
        symbol: markerSymbol,
      });
      console.log(point)
      _graphicsLayer.add(graphicPoint);
    });



  }, []);

  useEffect(() => {
    if (!view || !graphicsLayer) return;
    view.map.add(graphicsLayer);
  }, [view, graphicsLayer]);

  return <></>;
};
