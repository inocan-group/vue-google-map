import { POINT_MARKER_ICON_CONFIG } from './map-defaults'

// import '@types/googlemaps/index.d.ts'

export interface IZipFeatureCollection {
  type: 'FeatureCollection'
  features: IZipFeature[]
}

export interface IZipFeature {
  type: string
  properties: {
    zipCode: string
    country: string
    city: string
    county: string
    state: string
  }
  geometry: {
    type: 'MultiPolygon' | string
    coordinates: any
  }
}

export interface IMapRectangle {
  id: string
  bounds: google.maps.LatLngBoundsLiteral
}

export type IMapTypeStyle = google.maps.MapTypeStyle
export type IMapsCoordinate = google.maps.LatLngLiteral
export type IMapsLatLng = google.maps.LatLng
export type IMap = google.maps.Map
export type IMapApi = typeof google.maps
export type IMapsEventListener = google.maps.MapsEventListener

/**
 * The Google **Marker** class which extends an `MVCObject`
 *
 * **Ref:**: [url](https://developers.google.com/maps/documentation/javascript/reference/marker#Marker)
 */
export type Marker = google.maps.Marker
/**
 * The options that can be sent into a `Marker`'s constructor
 */
export type IMarkerOptions = google.maps.MarkerOptions
/**
 * The options that can be sent into a `Marker`'s constructor,
 * _plus_ an identifying `id` for tracking, matching and event mgmt
 */
export type MarkerOptionsWithId = IMarkerOptions & { id: string }

export type Polyline = google.maps.Polyline
export type IPolylineOptions = google.maps.PolylineOptions
export type PolylineOptionsWithId = IPolylineOptions & { id: string }

export type InfoWindow = google.maps.InfoWindow
export type IInfoWindowOptions = google.maps.InfoWindowOptions
export type InfoWindowOptionsWithId = IInfoWindowOptions & { id: string }

/**
 * A data point entry for a heatmap. This is a geographical data
 * point with a weight attribute.
 *
 * **Note:** you must load the `visualizations` library which is
 * separate from the base _maps_ library
 *
 * **REF:** [url](https://developers.google.com/maps/documentation/javascript/reference/visualization#WeightedLocation)
 */
export interface IWeightedLocation {
  location: IMapsCoordinate | IMapsLatLng
  weight: number
}

export const markerEvents = [
  'click',
  'dblclick',
  'rightclick',
  'dragstart',
  'dragend',
  'drag',
  'mouseover',
  'draggable_changed',
  'clickable_changed',
  'zindex_changed',
  'icon_changed',
  'position_changed',
  'shape_changed',
  'title_changed',
  'visible_changed',
]

export type IMarkerEvent = typeof markerEvents & string

/**
 * Symbol paths defined by Google
 */
export enum SymbolPath {
  BACKWARD_CLOSED_ARROW = 3,
  BACKWARD_OPEN_ARROW = 4,
  CIRCLE = 0,
  FORWARD_CLOSED_ARROW = 1,
  FORWARD_OPEN_ARROW = 2,
}
