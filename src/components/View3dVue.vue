<template>
    <div ref="view3d" id="view3d" :style="styleCss"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { View3d, Volume, VolumeLoader } from "../../volume-viewer";

@Component
export default class View3dVue extends Vue {
  view3d!: View3d;

  constructor() {
    super();
  }

  get width() {
    const buffer = 30;
    return window.innerWidth - buffer ;
  }

  get height() {
    const buffer = 300;
    return window.innerHeight - buffer;
  }

  get styleCss() {
    return {
      width : `${this.width}px`,
      height: `${this.height}px`,
    }
  }

  mounted() {

    this.view3d = new View3d(this.$refs.view3d as HTMLElement, {});

    const AICS_CELL_URL =
      "https://s3-us-west-2.amazonaws.com/bisque.allencell.org/v1.4.0/Cell-Viewer_Thumbnails/AICS-11";
    const AICS_CELL_ID = "AICS-11_3136";

    const atlasUrl = `${AICS_CELL_URL}/${AICS_CELL_ID}_atlas.json`;

    fetch(atlasUrl)
      .then(value => value.json())
      .then(json => {
        const volume = new Volume(json);
        this.view3d.addVolume(volume);
        json.images = json.images.map((img: any) => ({
          ...img,
          name: `${AICS_CELL_URL}/${img.name}`
        }));

        VolumeLoader.loadVolumeAtlasData(
          volume,
          json.images,
          (url, channelIndex) => {
            volume.channels[channelIndex].lutGenerator_percentiles(0.5, 0.998);

            this.view3d.setVolumeChannelEnabled(
              volume,
              channelIndex,
              channelIndex < 3
            );
            this.view3d.updateActiveChannels(volume);

            this.view3d.updateLuts(volume);

            this.view3d.setCameraMode("3D");
            this.view3d.updateDensity(volume, 0.05);
            this.view3d.updateExposure(0.75);
            this.view3d.setAutoRotate(true)
          }
        );
      });
  }
}
</script>

<style scoped>

</style>
