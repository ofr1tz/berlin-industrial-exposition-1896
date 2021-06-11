import React from 'react'

import OlMap from 'ol/Map'
import OlView from 'ol/View'
import OlLayerTile from 'ol/layer/Tile'
import OlSourceOsm from 'ol/source/OSM'
import OlSourceXYZ from 'ol/source/XYZ'
import OlLayerGroup from 'ol/layer/Group'
import {Zoom, Rotate, Attribution } from 'ol/control'

import './App.css'
import 'ol/ol.css'
import 'antd/dist/antd.css'
import './react-geo.css'

import { Titlebar, MapComponent, LayerTransparencySlider, LayerSwitcher } from '@terrestris/react-geo'

const accessToken = 'pk.eyJ1Ijoib2ZyMXR6IiwiYSI6ImNrOWEzajVzMzAzc24za284bnJlcjFjMWcifQ.8uvO3K-B9OkIZ55vfmCO4w'

const baseMaps = [
  new OlLayerTile({
    source: new OlSourceOsm(),
    name: 'OpenStreetMap',
    attributions: '© <a target="_blank" and rel="noopener noreferrer" href="http://openstreetmap.org/copyright">OpenStreetMap</a>" contributors"'
  }),
  new OlLayerTile({
    name: 'Mapbox Satellite',
    source: new OlSourceXYZ({ 
      url: 'https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=' + accessToken,
      attributions: 'Satellite Imagery © <a target="_blank" and rel="noopener noreferrer" href="http://mapbox.com">Mapbox</a>.'
    })
  })
]

const baseMapGroup = new OlLayerGroup({
  name: 'Base Maps',
  layers: baseMaps
})

const expoMap = new OlLayerTile({
  name: 'Expo Map',
  opacity: 0.67,
  source: new OlSourceXYZ({ 
    url: process.env.PUBLIC_URL + '/xyz/{z}/{x}/{y}.png',
    attributions: 
    'Expo Map: ' +
    '<a target="_blank" and rel="noopener noreferrer" href=https://commons.wikimedia.org/wiki/File:Berliner_Gewerbeausstellung_1896_02.jpg>Wikokk</a> ' +
    '<a target="_blank" and rel="noopener noreferrer" href=https://creativecommons.org/licenses/by-sa/4.0/>CC BY-SA 4.0</a>'
  })
})

const rotateMap = () => {
  const view = map.getView()
  if (!view) return
  const rotation = view.getRotation()
  
  if (rotation !== undefined) {
    if (rotation !== 0) { 
      view.animate({ rotation: 0, duration: 250})
    } else {
      view.animate({ rotation: -.6385, duration: 250 })
    }
  }
}

const rotateControl = new Rotate({
  tipLabel: 'Toggle rotation',
  autoHide: false,
  resetNorth: rotateMap
})

const attributionControl = new Attribution({ 
  collapsible: true, 
  collapsed: true
})

const map = new OlMap({
  controls: [ 
    new Zoom(), 
    attributionControl, 
    rotateControl 
  ],
  view: new OlView({
    center: [1499369, 6888900],
    zoom: 15,
    maxZoom: 18
  }),
  layers: [baseMapGroup, expoMap]
})

function App() {

  return (
    <div className="App">
      <Titlebar style={{ position: 'absolute', width: '100%', zIndex: 2 }}>1896 Berlin Industrial Expo Map</Titlebar>
      <MapComponent map={map}/>
      <LayerSwitcher style={{ position: 'absolute', bottom: '1em', left: '.5em', zIndex: 2 }} map={map} layers={baseMaps}/>
      <LayerTransparencySlider style={{ width: '5em', position: 'absolute', bottom: '7.5em', left: '.5em', zIndex: 2 }} layer={expoMap}/>
    </div>
  )
}

export default App
