import React, { useState, useCallback, useMemo, useEffect } from 'react'
import logo from './logo.svg';
import ReactMapGL, { Source, Layer, NavigationControl } from 'react-map-gl';
import CovidData from './county_covid.json'
import styled from 'styled-components'
import './App.css';

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`

const MAPBOX_API =
  'pk.eyJ1IjoiZmxlZXRkZXYiLCJhIjoiY2tlajZiNGxnMDQ4aTJ0cGYxbDhqNjlxNiJ9.CIH6Wg04VnOtPIwWPBI31g'


const covidStyle = {
  id: 'covid',
  type: 'fill',
  beforeId: 'settlement-minor-label',
  paint: {
    'fill-color': [
      'interpolate',
      ['linear'],
      ['get', 'covid_cases_per_10k'],
      0,
      '#F2F12D',
      70,
      '#EED322',
      116,
      '#E6B71E',
      174,
      '#DA9C20',
      263,
      '#CA8323',
      1491,
      '#B86B25',
      ],
    'fill-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      3,
      0.8,
      10,
      0.5,
      15,
      0.3,
    ]
  },
}

function App() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 3,
    width: 100,
    height: 100,
    bearing: 0,
    pitch: 0,
    altitude: 0,
    maxZoom: 20,
    minZoom: 1,
    maxPitch: 60,
    minPitch: 0,
  })
  
  return (
    <AppContainer>
      <ReactMapGL
        {...viewport}
        width={'100%'}
        height={'100%'}
        scrollZoom={true}
        mapStyle={'mapbox://styles/fleetdev/ckek49ojw1x4o19odjvqn7k4p'}
        onViewportChange={(nextViewPort) => setViewport(nextViewPort)}
        mapboxApiAccessToken={MAPBOX_API}
      >
        <Source type={'geojson'} id={'covid'} data={CovidData}>
          <Layer {...covidStyle} />
        </Source>

      </ReactMapGL>
    </AppContainer>
  );
}

export default App;
