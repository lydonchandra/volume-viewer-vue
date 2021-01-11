<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <View3dVue />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import View3dVue from "@/components/View3dVue.vue";


@Component({
  components: {
    View3dVue
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: darkcyan;
  margin-top: 60px;
}
</style>
