/**
 * @typedef {Object} ControlPoint
 * @property {number} x The X Coordinate
 * @property {number} opacity The Opacity
 * @property {string} color The Color
 */
/**
 * @typedef {Object} Lut
 * @property {Array.<number>} lut 256*4 element lookup table as array (maps scalar intensity to a rgb color plus alpha)
 * @property {Array.<ControlPoint>} controlPoints
 */
/**
 * Builds a histogram with 256 bins from a data array. Assume data is 8 bit single channel grayscale.
 * @class
 * @param {Array.<number>} data
 */
export default class Histogram {
    constructor(data: any);
    bins: Uint32Array;
    dataMin: number;
    dataMax: number;
    maxBin: number;
    nonzeroPixelCount: number;
    /**
     * Generate a Window/level lookup table
     * @return {Lut}
     * @param {number} wnd in 0..1 range
     * @param {number} lvl in 0..1 range
     */
    lutGenerator_windowLevel(wnd: number, lvl: number): Lut;
    /**
     * Generate a piecewise linear lookup table that ramps up from 0 to 1 over the b to e domain
     *  |
     * 1|               +---------+-----
     *  |              /
     *  |             /
     *  |            /
     *  |           /
     *  |          /
     * 0+=========+---------------+-----
     *  0         b    e          1
     * @return {Lut}
     * @param {number} b
     * @param {number} e
     */
    lutGenerator_minMax(b: number, e: number): Lut;
    /**
     * Generate a straight 0-1 linear identity lookup table
     * @return {Lut}
     */
    lutGenerator_fullRange(): Lut;
    /**
     * Generate a lookup table over the min to max range of the data values
     * @return {Lut}
     */
    lutGenerator_dataRange(): Lut;
    /**
     * Generate a lookup table based on histogram percentiles
     * @return {Lut}
     * @param {number} pmin
     * @param {number} pmax
     */
    lutGenerator_percentiles(pmin: number, pmax: number): Lut;
    /**
     * Generate a 10% / 90% lookup table
     * @return {Lut}
     */
    lutGenerator_bestFit(): Lut;
    /**
     * Generate a lookup table attempting to replicate ImageJ's "Auto" button
     * @return {Lut}
     */
    lutGenerator_auto2(): Lut;
    /**
     * Generate a lookup table using a percentile of the most commonly occurring value
     * @return {Lut}
     */
    lutGenerator_auto(): Lut;
    /**
     * Generate an "equalized" lookup table
     * @return {Lut}
     */
    lutGenerator_equalize(): Lut;
    lutGenerator_fromControlPoints(controlPoints: any): {
        lut: Uint8Array;
        controlPoints: any;
    };
}
export type ControlPoint = {
    /**
     * The X Coordinate
     */
    x: number;
    /**
     * The Opacity
     */
    opacity: number;
    /**
     * The Color
     */
    color: string;
};
export type Lut = {
    /**
     * 256*4 element lookup table as array (maps scalar intensity to a rgb color plus alpha)
     */
    lut: Array<number>;
    controlPoints: Array<ControlPoint>;
};
