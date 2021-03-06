export default class VolumeDrawable {
    constructor(volume: any, options: any);
    PT: boolean;
    volume: any;
    onChannelDataReadyCallback: any;
    translation: any;
    rotation: any;
    flipX: number;
    flipY: number;
    flipZ: number;
    maskChannelIndex: number;
    maskAlpha: number;
    gammaMin: number;
    gammaLevel: number;
    gammaMax: number;
    channel_colors: any;
    channelOptions: any[];
    fusion: any;
    specular: any[];
    emissive: any[];
    glossiness: any[];
    sceneRoot: any;
    meshVolume: MeshVolume;
    primaryRayStepSize: number;
    secondaryRayStepSize: number;
    volumeRendering: PathTracedVolume | RayMarchedAtlasVolume;
    pathTracedVolume: PathTracedVolume;
    rayMarchedAtlasVolume: RayMarchedAtlasVolume;
    bounds: {
        bmin: any;
        bmax: any;
    };
    setOptions(options: any): void;
    setChannelOptions(channelIndex: any, options: any): void;
    setRayStepSizes(primary: any, secondary: any): void;
    setScale(scale: any): void;
    scale: any;
    currentScale: any;
    setOrthoScale(value: any): void;
    setResolution(viewObj: any): void;
    setAxisClip(axis: any, minval: any, maxval: any, isOrthoAxis: any): void;
    setIsOrtho(isOrtho: any): void;
    setOrthoThickness(value: any): void;
    setGamma(gmin: any, glevel: any, gmax: any): void;
    setFlipAxes(flipX: any, flipY: any, flipZ: any): void;
    setMaxProjectMode(isMaxProject: any): void;
    onAnimate(canvas: any): void;
    updateIsovalue(channel: any, value: any): void;
    getIsovalue(channel: any): any;
    updateOpacity(channel: any, value: any): void;
    hasIsosurface(channel: any): boolean;
    createIsosurface(channel: any, value: any, alpha: any, transp: any): void;
    destroyIsosurface(channel: any): void;
    fuse(): void;
    setRenderUpdateListener(callback: any): void;
    renderUpdateListener: any;
    updateMaterial(): void;
    updateLuts(): void;
    setVoxelSize(values: any): void;
    cleanup(): void;
    getChannel(channelIndex: any): any;
    onChannelLoaded(batch: any): void;
    onChannelAdded(newChannelIndex: any): void;
    saveChannelIsosurface(channelIndex: any, type: any): void;
    setVolumeChannelEnabled(channelIndex: any, enabled: any): void;
    isVolumeChannelEnabled(channelIndex: any): boolean;
    updateChannelColor(channelIndex: any, colorrgb: any): void;
    updateMeshColors(): void;
    getChannelColor(channelIndex: any): any;
    updateChannelMaterial(channelIndex: any, colorrgb: any, specularrgb: any, emissivergb: any, glossiness: any): void;
    setDensity(density: any): void;
    density: any;
    /**
     * Get the global density of the volume data
     */
    getDensity(): any;
    setBrightness(brightness: any): void;
    brightness: any;
    getBrightness(): any;
    setChannelAsMask(channelIndex: any): boolean;
    setMaskAlpha(maskAlpha: any): void;
    getIntensity(c: any, x: any, y: any, z: any): any;
    onStartControls(): void;
    onChangeControls(): void;
    onEndControls(): void;
    onResetCamera(): void;
    onCameraChanged(fov: any, focalDistance: any, apertureSize: any): void;
    updateClipRegion(xmin: any, xmax: any, ymin: any, ymax: any, zmin: any, zmax: any): void;
    updateLights(state: any): void;
    setPixelSamplingRate(value: any): void;
    setVolumeRendering(is_pathtrace: any): void;
    setTranslation(xyz: any): void;
    setRotation(eulerXYZ: any): void;
}
import MeshVolume from "./MeshVolume.js";
import PathTracedVolume from "./PathTracedVolume.js";
import RayMarchedAtlasVolume from "./RayMarchedAtlasVolume.js";
