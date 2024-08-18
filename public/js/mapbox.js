/* eslint-disable*/

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibmlraGlsMTgxOSIsImEiOiJjbHpxM284ZG0xZzVkMmlvY2dvaW95a2tjIn0.TYIszn71Kb3AfneG0A-jfA';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nikhil1819/clzq41j6000c501qg8cuif8fa',
    scrollZoom: false,
    // center: [-117.67495, 34.004887],
    // zoom: 10,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
