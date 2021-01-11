<template>
  <span>
    <div ref="view3d" id="view3d">view3d</div>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { View3d, Volume, VolumeLoader } from "../../volume-viewer";

@Component
export default class View3dVue extends Vue {
  @Prop() private msg!: string;
  view3dInst!: View3d;

  constructor() {
    super();
  }

  mounted() {
    console.log(this.$refs);
    // this.view3dInst = new View3d(document.getElementById("view3d")!, {})
    this.view3dInst = new View3d(this.$refs.view3d as HTMLElement, {});

    const AICS_CELL_URL =
      "https://s3-us-west-2.amazonaws.com/bisque.allencell.org/v1.4.0/Cell-Viewer_Thumbnails/AICS-11";
    const AICS_CELL_ID = "AICS-11_3136";

    const atlasUrl = `${AICS_CELL_URL}/${AICS_CELL_ID}_atlas.json`;

    fetch(atlasUrl)
      .then(value => value.json())
      .then(json => {
        const volume = new Volume(json);
        this.view3dInst.addVolume(volume);
        json.images = json.images.map((img: any) => ({
          ...img,
          name: `${AICS_CELL_URL}/${img.name}`
        }));

        VolumeLoader.loadVolumeAtlasData(
          volume,
          json.images,
          (url, channelIndex) => {
            volume.channels[channelIndex].lutGenerator_percentiles(0.5, 0.998);

            this.view3dInst.setVolumeChannelEnabled(
              volume,
              channelIndex,
              channelIndex < 3
            );
            this.view3dInst.updateActiveChannels(volume);

            this.view3dInst.updateLuts(volume);

            this.view3dInst.setCameraMode("3D");
            this.view3dInst.updateDensity(volume, 0.05);
            this.view3dInst.updateExposure(0.75);
          }
        );
      });
  }
}
</script>

<style scoped>
#view3d {
  width: 800px;
  height: 800px;
}
</style>
