/**
 * Provide dimensions of the volume data, including dimensions for texture atlas data in which the volume z slices
 * are tiled across a single large 2d image plane.
 * @typedef {Object} imageInfo
 * @property {string} name Base name of image
 * @property {string} version schema version preferably in semver format.
 * @property {number} width Width of original volumetric data prior to downsampling
 * @property {number} height Height of original volumetric data prior to downsampling
 * @property {number} channels Number of channels
 * @property {number} tiles Number of tiles, which must be equal to the number of z-slices in original volumetric data
 * @property {number} pixel_size_x Size of pixel in volumetric data to be rendered, in x-dimension, unitless
 * @property {number} pixel_size_y Size of pixel in volumetric data to be rendered, in y-dimension, unitless
 * @property {number} pixel_size_z Size of pixel in volumetric data to be rendered, in z-dimension, unitless
 * @property {Array.<string>} channel_names Names of each of the channels to be rendered, in order. Unique identifier expected
 * @property {number} rows Number of rows in tile array in each image.  Note tiles <= rows*cols
 * @property {number} cols Number of columns in tile array in each image.  Note tiles <= rows*cols
 * @property {number} tile_width Width of each tile in volumetric dataset to be rendered, in pixels
 * @property {number} tile_height Height of each tile in volumetric dataset to be rendered, in pixels
 * @property {number} atlas_width Total width of image containing all the tiles, in pixels.  Note atlas_width === cols*tile_width
 * @property {number} atlas_height Total height of image containing all the tiles, in pixels. Note atlas_height === rows*tile_height
 * @property {Object} transform translation and rotation as arrays of 3 numbers. Translation is in voxels (to be multiplied by pixel_size values). Rotation is Euler angles in radians, appled in XYZ order.
 * @example let imgdata = {
  "width": 306,
  "height": 494,
  "channels": 9,
  "channel_names": ["DRAQ5", "EGFP", "Hoechst 33258", "TL Brightfield", "SEG_STRUCT", "SEG_Memb", "SEG_DNA", "CON_Memb", "CON_DNA"],
  "rows": 7,
  "cols": 10,
  "tiles": 65,
  "tile_width": 204,
  "tile_height": 292,
  // for webgl reasons, it is best for atlas_width and atlas_height to be <= 2048
  // and ideally a power of 2.  This generally implies downsampling the original volume data for display in this viewer.
  "atlas_width": 2040,
  "atlas_height": 2044,
  "pixel_size_x": 0.065,
  "pixel_size_y": 0.065,
  "pixel_size_z": 0.29,
  "name": "AICS-10_5_5",
  "status": "OK",
  "version": "0.0.0",
  "aicsImageVersion": "0.3.0",
  "transform": {
    "translation": [5, 5, 1],
    "rotation": [0, 3.14159, 1.57]
  }
  };
 */
/**
 * A renderable multichannel volume image with 8-bits per channel intensity values.
 * @class
 * @param {imageInfo} imageInfo
 */
export default class Volume {
    constructor(imageInfo: any);
    imageInfo: any;
    name: any;
    pixel_size: any[];
    x: any;
    y: any;
    z: any;
    t: number;
    num_channels: any;
    channel_names: any;
    channel_colors_default: any;
    atlasSize: any[];
    volumeSize: any[];
    channels: Channel[];
    volumeDataObservers: any[];
    setScale(scale: any): void;
    scale: any;
    currentScale: any;
    setVoxelSize(values: any): void;
    physicalSize: any;
    normalizedPhysicalSize: any;
    cleanup(): void;
    /**
     * @return a reference to the list of channel names
     */
    channelNames(): any;
    getChannel(channelIndex: any): Channel;
    onChannelLoaded(batch: any): void;
    loaded: boolean;
    /**
     * Assign volume data via a 2d array containing the z slices as tiles across it.  Assumes that the incoming data is consistent with the image's pre-existing imageInfo tile metadata.
     * @param {number} channelIndex
     * @param {Uint8Array} atlasdata
     * @param {number} atlaswidth
     * @param {number} atlasheight
     */
    setChannelDataFromAtlas(channelIndex: number, atlasdata: Uint8Array, atlaswidth: number, atlasheight: number): void;
    /**
     * Assign volume data as a 3d array ordered x,y,z. The xy size must be equal to tilewidth*tileheight from the imageInfo used to construct this Volume.  Assumes that the incoming data is consistent with the image's pre-existing imageInfo tile metadata.
     * @param {number} channelIndex
     * @param {Uint8Array} volumeData
     */
    setChannelDataFromVolume(channelIndex: number, volumeData: Uint8Array): void;
    /**
     * Add a new channel ready to receive data from one of the setChannelDataFrom* calls.
     * Name and color will be defaulted if not provided. For now, leave imageInfo alone as the "original" data
     * @param {string} name
     * @param {Array.<number>} color [r,g,b]
     */
    appendEmptyChannel(name: string, color: Array<number>): any;
    /**
     * Get a value from the volume data
     * @return {number} the intensity value from the given channel at the given xyz location
     * @param {number} c The channel index
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    getIntensity(c: number, x: number, y: number, z: number): number;
    /**
     * Get the 256-bin histogram for the given channel
     * @return {Histogram} the histogram
     * @param {number} c The channel index
     */
    getHistogram(c: number): any;
    /**
     * Set the lut for the given channel
     * @param {number} c The channel index
     * @param {Array.<number>} lut The lut as a 256 element array
     */
    setLut(c: number, lut: Array<number>): void;
    /**
     * Return the intrinsic rotation associated with this volume (radians)
     * @return {Array.<number>} the xyz Euler angles (radians)
     */
    getRotation(): Array<number>;
    /**
     * Return the intrinsic translation (pivot center delta) associated with this volume, in normalized volume units
     * @return {Array.<number>} the xyz translation in normalized volume units
     */
    getTranslation(): Array<number>;
    /**
     * Return a translation in normalized volume units, given a translation in image voxels
     * @return {Array.<number>} the xyz translation in normalized volume units
     */
    voxelsToWorldSpace(xyz: any): Array<number>;
    addVolumeDataObserver(o: any): void;
    removeVolumeDataObserver(o: any): void;
    removeAllVolumeDataObservers(): void;
}
/**
 * Provide dimensions of the volume data, including dimensions for texture atlas data in which the volume z slices
 * are tiled across a single large 2d image plane.
 */
export type imageInfo = {
    /**
     * Base name of image
     */
    name: string;
    /**
     * schema version preferably in semver format.
     */
    version: string;
    /**
     * Width of original volumetric data prior to downsampling
     */
    width: number;
    /**
     * Height of original volumetric data prior to downsampling
     */
    height: number;
    /**
     * Number of channels
     */
    channels: number;
    /**
     * Number of tiles, which must be equal to the number of z-slices in original volumetric data
     */
    tiles: number;
    /**
     * Size of pixel in volumetric data to be rendered, in x-dimension, unitless
     */
    pixel_size_x: number;
    /**
     * Size of pixel in volumetric data to be rendered, in y-dimension, unitless
     */
    pixel_size_y: number;
    /**
     * Size of pixel in volumetric data to be rendered, in z-dimension, unitless
     */
    pixel_size_z: number;
    /**
     * Names of each of the channels to be rendered, in order. Unique identifier expected
     */
    channel_names: Array<string>;
    /**
     * Number of rows in tile array in each image.  Note tiles <= rows*cols
     */
    rows: number;
    /**
     * Number of columns in tile array in each image.  Note tiles <= rows*cols
     */
    cols: number;
    /**
     * Width of each tile in volumetric dataset to be rendered, in pixels
     */
    tile_width: number;
    /**
     * Height of each tile in volumetric dataset to be rendered, in pixels
     */
    tile_height: number;
    /**
     * Total width of image containing all the tiles, in pixels.  Note atlas_width === cols*tile_width
     */
    atlas_width: number;
    /**
     * Total height of image containing all the tiles, in pixels. Note atlas_height === rows*tile_height
     */
    atlas_height: number;
    /**
     * translation and rotation as arrays of 3 numbers. Translation is in voxels (to be multiplied by pixel_size values). Rotation is Euler angles in radians, appled in XYZ order.
     */
    transform: any;
};
import Channel from "./Channel.js";
