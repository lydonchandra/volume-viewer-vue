export const RENDERMODE_RAYMARCH: 0;
export const RENDERMODE_PATHTRACE: 1;
/**
 * Provide options to control the visual appearance of a Volume
 * @typedef {Object} VolumeChannelDisplayOptions
 * @property {boolean} enabled array of boolean per channel
 * @property {<Array.<number>} color array of rgb per channel
 * @property {<Array.<number>} specularColor array of rgb per channel
 * @property {<Array.<number>} emissiveColor array of rgb per channel
 * @property {number} glossiness array of float per channel
 * @property {boolean} isosurfaceEnabled array of boolean per channel
 * @property {number} isovalue array of number per channel
 * @property {number} isosurfaceOpacity array of number per channel
 * @example let options = {
   };
 */
/**
 * Provide options to control the visual appearance of a Volume
 * @typedef {Object} VolumeDisplayOptions
 * @property {Array.<VolumeChannelDisplayOptions>} channels array of channel display options
 * @property {number} density
 * @property {Array.<number>} translation xyz
 * @property {Array.<number>} rotation xyz angles in radians
 * @property {number} maskChannelIndex
 * @property {number} maskAlpha
 * @property {Array.<number>} clipBounds [xmin, xmax, ymin, ymax, zmin, zmax] all range from 0 to 1 as a percentage of the volume on that axis
 * @property {Array.<number>} scale xyz voxel size scaling
 * @property {boolean} maxProjection true or false (ray marching)
 * @property {number} renderMode 0 for raymarch, 1 for pathtrace
 * @property {number} shadingMethod 0 for phase, 1 for brdf, 2 for hybrid (path tracer)
 * @property {Array.<number>} gamma [min, max, scale]
 * @property {number} primaryRayStepSize in voxels
 * @property {number} secondaryRayStepSize in voxels
 * @example let options = {
   };
 */
/**
 * @class
 */
export class View3d {
    /**
     * @param {HTMLElement} parentElement the 3d display will try to fill the parent element.
     * @param {Object} options This is an optional param. The only option is currently boolean {useWebGL2:true} which defaults to true.
     */
    constructor(parentElement: HTMLElement, options: any);
    canvas3d: ThreeJsPanel;
    /**
     * Force a redraw.
     */
    redraw(): void;
    scene: any;
    backgroundColor: number;
    pixelSamplingRate: number;
    exposure: number;
    volumeRenderMode: number;
    renderUpdateListener: Function;
    loaded: boolean;
    parentEl: HTMLElement;
    preRender(): void;
    /**
     * Capture the contents of this canvas to a data url
     * @param {Object} dataurlcallback function to call when data url is ready; function accepts dataurl as string arg
     */
    capture(dataurlcallback: any): void;
    unsetImage(): any;
    /**
     * Add a new volume image to the viewer.  (The viewer currently only supports a single image at a time - adding repeatedly, without removing in between, is a potential resource leak)
     * @param {Volume} volume
     * @param {VolumeDisplayOptions} options
     */
    addVolume(volume: any, options?: VolumeDisplayOptions): void;
    /**
     * Apply a set of display options to a given channel of a volume
     * @param {Volume} volume
     * @param {number} channelIndex the channel index
     * @param {VolumeChannelDisplayOptions} options
     */
    setVolumeChannelOptions(volume: any, channelIndex: number, options: VolumeChannelDisplayOptions): void;
    /**
     * Apply a set of display options to the given volume
     * @param {Volume} volume
     * @param {VolumeDisplayOptions} options
     */
    setVolumeDisplayOptions(volume: any, options: VolumeDisplayOptions): void;
    /**
     * Remove a volume image from the viewer.  This will clean up the View3D's resources for the current volume
     * @param {Volume} volume
     */
    removeVolume(volume: any): void;
    /**
     * Remove all volume images from the viewer.
     */
    removeAllVolumes(): void;
    /**
     * @param {function} callback a function that will receive the number of render iterations when it changes
     */
    setRenderUpdateListener(callback: Function): void;
    onVolumeData(volume: any, channels: any): void;
    onVolumeChannelAdded(volume: any, newChannelIndex: any): void;
    /**
     * Assign a channel index as a mask channel (will multiply its color against the entire visible volume)
     * @param {Object} volume
     * @param {number} mask_channel_index
     */
    setVolumeChannelAsMask(volume: any, mask_channel_index: number): void;
    /**
     * Set voxel dimensions - controls volume scaling. For example, the physical measurements of the voxels from a biological data set
     * @param {Object} volume
     * @param {number} values Array of x,y,z floating point values for the physical voxel size scaling
     */
    setVoxelSize(volume: any, values: number): void;
    setRayStepSizes(volume: any, primary: any, secondary: any): void;
    /**
     * If an isosurface is not already created, then create one.  Otherwise change the isovalue of the existing isosurface.
     * @param {Object} volume
     * @param {number} channel
     * @param {number} isovalue isovalue
     * @param {number=} alpha Opacity
     */
    createIsosurface(volume: any, channel: number, isovalue: number, alpha?: number | undefined): void;
    /**
     * Is an isosurface already created for this channel?
     * @param {Object} volume
     * @param {number} channel
     * @return true if there is currently a mesh isosurface for this channel
     */
    hasIsosurface(volume: any, channel: number): any;
    /**
     * If an isosurface exists, update its isovalue and regenerate the surface. Otherwise do nothing.
     * @param {Object} volume
     * @param {number} channel
     * @param {number} isovalue
     */
    updateIsosurface(volume: any, channel: number, isovalue: number): void;
    /**
     * Set opacity for isosurface
     * @param {Object} volume
     * @param {number} channel
     * @param {number} opacity Opacity
     */
    updateOpacity(volume: any, channel: number, opacity: number): void;
    /**
     * If an isosurface exists for this channel, hide it now
     * @param {Object} volume
     * @param {number} channel
     */
    clearIsosurface(volume: any, channel: number): void;
    /**
     * Save a channel's isosurface as a triangle mesh to either STL or GLTF2 format.  File will be named automatically, using image name and channel name.
     * @param {Object} volume
     * @param {number} channelIndex
     * @param {string} type Either 'GLTF' or 'STL'
     */
    saveChannelIsosurface(volume: any, channelIndex: number, type: string): void;
    setImage(img: any): any;
    image: any;
    onStartControls(): void;
    onChangeControls(): void;
    onEndControls(): void;
    buildScene(): void;
    oldScale: any;
    currentScale: any;
    lights: any[];
    lightContainer: any;
    ambientLight: any;
    spotLight: any;
    reflectedLight: any;
    fillLight: any;
    /**
     * Change the camera projection to look along an axis, or to view in a 3d perspective camera.
     * @param {string} mode Mode can be "3D", or "XY" or "Z", or "YZ" or "X", or "XZ" or "Y".  3D is a perspective view, and all the others are orthographic projections
     */
    setCameraMode(mode: string): void;
    /**
     * Enable or disable 3d axis display at lower left.
     * @param {boolean} autorotate
     */
    setShowAxis(showAxis: any): void;
    /**
     * Enable or disable a turntable rotation mode. The display will continuously spin about the vertical screen axis.
     * @param {boolean} autorotate
     */
    setAutoRotate(autorotate: boolean): void;
    /**
     * Invert axes of volume. -1 to invert, +1 NOT to invert.
     * @param {Object} volume
     * @param {number} flipX x axis sense
     * @param {number} flipY y axis sense
     * @param {number} flipZ z axis sense
     */
    setFlipVolume(volume: any, flipX: number, flipY: number, flipZ: number): void;
    /**
     * Notify the view that it has been resized.  This will automatically be connected to the window when the View3d is created.
     * @param {HTMLElement=} comp Ignored.
     * @param {number=} w Width, or parent element's offsetWidth if not specified.
     * @param {number=} h Height, or parent element's offsetHeight if not specified.
     * @param {number=} ow Ignored.
     * @param {number=} oh Ignored.
     * @param {Object=} eOpts Ignored.
     */
    resize(comp?: HTMLElement | undefined, w?: number | undefined, h?: number | undefined, ow?: number | undefined, oh?: number | undefined, eOpts?: any | undefined): void;
    /**
     * Set the volume scattering density
     * @param {Object} volume
     * @param {number} density 0..1 UI slider value
     */
    updateDensity(volume: any, density: number): void;
    /**
     * Set the shading method - applies to pathtraced render mode only
     * @param {Object} volume
     * @param {number} isbrdf 0: brdf, 1: isotropic phase function, 2: mixed
     */
    updateShadingMethod(volume: any, isbrdf: number): void;
    /**
     * Set gamma levels: this affects the transparency and brightness of the single pass ray march volume render
     * @param {Object} volume
     * @param {number} gmin
     * @param {number} glevel
     * @param {number} gmax
     */
    setGamma(volume: any, gmin: number, glevel: number, gmax: number): void;
    /**
     * Set max projection on or off - applies to single pass raymarch render mode only
     * @param {Object} volume
     * @param {boolean} isMaxProject true for max project, false for regular volume ray march integration
     */
    setMaxProjectMode(volume: any, isMaxProject: boolean): void;
    /**
     * Notify the view that the set of active volume channels has been modified.
     * @param {Object} volume
     */
    updateActiveChannels(volume: any): void;
    /**
     * Notify the view that transfer function lookup table data has been modified.
     * @param {Object} volume
     */
    updateLuts(volume: any): void;
    /**
     * Notify the view that color and appearance settings have been modified.
     * @param {Object} volume
     */
    updateMaterial(volume: any): void;
    /**
     * Increase or decrease the overall brightness of the rendered image
     * @param {number} e 0..1
     */
    updateExposure(e: number): void;
    /**
     * Set camera focus properties.
     * @param {number} fov Vertical field of view in degrees
     * @param {number} focalDistance view-space units for center of focus
     * @param {number} apertureSize view-space units for radius of camera aperture
     */
    updateCamera(fov: number, focalDistance: number, apertureSize: number): void;
    /**
     * Set clipping range (between 0 and 1, relative to bounds) for the current volume.
     * @param {Object} volume
     * @param {number} xmin 0..1, should be less than xmax
     * @param {number} xmax 0..1, should be greater than xmin
     * @param {number} ymin 0..1, should be less than ymax
     * @param {number} ymax 0..1, should be greater than ymin
     * @param {number} zmin 0..1, should be less than zmax
     * @param {number} zmax 0..1, should be greater than zmin
     */
    updateClipRegion(volume: any, xmin: number, xmax: number, ymin: number, ymax: number, zmin: number, zmax: number): void;
    /**
     * Set clipping range (between 0 and 1) for a given axis.
     * Calling this allows the rendering to compensate for changes in thickness in orthographic views that affect how bright the volume is.
     * @param {Object} volume
     * @param {number} axis 0, 1, or 2 for x, y, or z axis
     * @param {number} minval 0..1, should be less than maxval
     * @param {number} maxval 0..1, should be greater than minval
     * @param {boolean} isOrthoAxis is this an orthographic projection or just a clipping of the range for perspective view
     */
    setAxisClip(volume: any, axis: number, minval: number, maxval: number, isOrthoAxis: boolean): void;
    /**
     * Update lights
     * @param {Array} state array of Lights
     */
    updateLights(state: any[]): void;
    /**
     * Set a sampling rate to trade performance for quality.
     * @param {number} value (+epsilon..1) 1 is max quality, ~0.1 for lowest quality and highest speed
     */
    updatePixelSamplingRate(value: number): void;
    /**
     * Set the opacity of the mask channel
     * @param {Object} volume
     * @param {number} value (0..1) 0 for full transparent, 1 for fully opaque
     */
    updateMaskAlpha(volume: any, value: number): void;
    /**
     * Show / hide volume channels
     * @param {Object} volume
     * @param {number} channel
     * @param {boolean} enabled
     */
    setVolumeChannelEnabled(volume: any, channel: number, enabled: boolean): void;
    /**
     * Set the material for a channel
     * @param {Object} volume
     * @param {number} channelIndex
     * @param {Array.<number>} colorrgb [r,g,b]
     * @param {Array.<number>} specularrgb [r,g,b]
     * @param {Array.<number>} emissivergb [r,g,b]
     * @param {number} glossiness
     */
    updateChannelMaterial(volume: any, channelIndex: number, colorrgb: Array<number>, specularrgb: Array<number>, emissivergb: Array<number>, glossiness: number): void;
    /**
     * Set the color for a channel
     * @param {Object} volume
     * @param {number} channelIndex
     * @param {Array.<number>} colorrgb [r,g,b]
     */
    updateChannelColor(volume: any, channelIndex: number, colorrgb: Array<number>): void;
    /**
     * Switch between single pass ray-marched volume rendering and progressive path traced rendering.
     * @param {number} mode 0 for single pass ray march, 1 for progressive path trace
     */
    setVolumeRenderMode(mode: number): void;
    /**
     *
     * @param {Object} volume
     * @param {Array.<number>} xyz
     */
    setVolumeTranslation(volume: any, xyz: Array<number>): void;
    /**
     *
     * @param {Object} volume
     * @param {Array.<number>} eulerXYZ
     */
    setVolumeRotation(volume: any, eulerXYZ: Array<number>): void;
    /**
     * Reset the camera to its default position
     */
    resetCamera(): void;
}
/**
 * Provide options to control the visual appearance of a Volume
 */
export type VolumeChannelDisplayOptions = {
    /**
     * array of boolean per channel
     */
    enabled: boolean;
    /**
     * array of rgb per channel
     */
    color: <Array_1>() => <number>() => any;
    /**
     * array of rgb per channel
     */
    specularColor: <Array_2>() => <number_1>() => any;
    /**
     * array of rgb per channel
     */
    emissiveColor: <Array_3>() => <number_2>() => any;
    /**
     * array of float per channel
     */
    glossiness: number;
    /**
     * array of boolean per channel
     */
    isosurfaceEnabled: boolean;
    /**
     * array of number per channel
     */
    isovalue: number;
    /**
     * array of number per channel
     */
    isosurfaceOpacity: number;
};
/**
 * Provide options to control the visual appearance of a Volume
 */
export type VolumeDisplayOptions = {
    /**
     * array of channel display options
     */
    channels: Array<VolumeChannelDisplayOptions>;
    density: number;
    /**
     * xyz
     */
    translation: Array<number>;
    /**
     * xyz angles in radians
     */
    rotation: Array<number>;
    maskChannelIndex: number;
    maskAlpha: number;
    /**
     * [xmin, xmax, ymin, ymax, zmin, zmax] all range from 0 to 1 as a percentage of the volume on that axis
     */
    clipBounds: Array<number>;
    /**
     * xyz voxel size scaling
     */
    scale: Array<number>;
    /**
     * true or false (ray marching)
     */
    maxProjection: boolean;
    /**
     * 0 for raymarch, 1 for pathtrace
     */
    renderMode: number;
    /**
     * 0 for phase, 1 for brdf, 2 for hybrid (path tracer)
     */
    shadingMethod: number;
    /**
     * [min, max, scale]
     */
    gamma: Array<number>;
    /**
     * in voxels
     */
    primaryRayStepSize: number;
    /**
     * in voxels
     */
    secondaryRayStepSize: number;
};
import { ThreeJsPanel } from "./ThreeJsPanel.js";
