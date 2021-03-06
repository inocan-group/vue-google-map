<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { IMarkerOptions, Marker, markerEvents } from '../map-types'
import GoogleMapExtension from './GoogleMapExtension.vue'
import { IDictionary } from 'common-types'
import isEqual from 'lodash.isequal'

@Component
export default class GoogleMapMarker extends GoogleMapExtension {
  @Prop() marker!: string | IMarkerOptions
  @Prop() callbacks?: IDictionary<(...arg: any[]) => void>

  /** the instantiated marker class */
  protected _marker?: Marker

  @Watch('marker', { deep: true, immediate: true })
  async onConfigChanged(oldConfig: IMarkerOptions, newConfig: IMarkerOptions) {
    if (!isEqual(oldConfig, newConfig)) {
      if (!this.map || !this.api) {
        await this.prep()
      }

      if (this._marker) {
        this.api.event.clearInstanceListeners(this._marker)
        this._marker.setMap(null)
      }

      let marker: IMarkerOptions

      if (!this.marker) {
        console.warn(`A GoogleMapMarker component was instantiated without any marker config!`, { context: this })
      }
      if (typeof this.marker === 'string') {
        try {
          marker = JSON.parse(this.marker) as IMarkerOptions
        } catch (e) {
          throw new Error(
            `A GoogleMapMarker component was passed a "string" value for the marker parameter. This is ok if it can be parsed by JSON but attempts to do this failed with the message: ${e.message}. The string value prior to parsing was: ${this.marker}`,
          )
        }
      } else {
        marker = this.marker
      }

      if (marker && !marker.position) {
        console.info(
          `A GoogleMapMarker component was added but didn't have any position info. This is typically a mistake.`,
          { marker },
        )
      }

      this.draw(marker)
    }
  }

  draw(marker: IMarkerOptions) {
    if (marker) {
      this._marker = new this.api.Marker({
        ...(marker as IMarkerOptions),
        map: this.map,
      }) as Marker
      markerEvents.forEach(evt => {
        if (this.callbacks && this.callbacks[evt]) {
          this.listeners[evt] = (this._marker as Marker).addListener(evt, this.callbacks[evt])
        }
        (this._marker as Marker).addListener(evt, () => this.$emit(evt.replace('_', ':')))
      })
    }
  }

  beforeDestroy() {
    if (this._marker) {
      // remove from map
      this.api.event.clearInstanceListeners(this._marker)
      this._marker.setMap(null)
    }
  }

  render() {}
}
</script>
