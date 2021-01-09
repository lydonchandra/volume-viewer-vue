(function() {
  if (!Math.clamp) {
    Math.clamp = function(val, cmin, cmax) {
      return Math.min(Math.max(cmin, val), cmax);
    };
  }
})();

function controlPointToRGBA(controlPoint) {
  return [controlPoint.color[0], controlPoint.color[1], controlPoint.color[2], controlPoint.opacity * 255];
}

function lerp(xmin, xmax, a) {
  return a * (xmax - xmin) + xmin;
}

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
  constructor(data) {
    // no more than 2^32 pixels of any one intensity in the data!?!?!
    this.bins = new Uint32Array(256);
    this.bins.fill(0);
    this.dataMin = 255;
    this.dataMax = 0;
    this.maxBin = 0;

    // build up the histogram
    for (let i = 0; i < data.length; ++i) {
      this.bins[data[i]]++;
    }
    // track the first and last nonzero bins with at least 1 sample
    for (let i = 1; i < this.bins.length; i++) {
      if (this.bins[i] > 0) {
        this.dataMin = i;
        break;
      }
    }
    for (let i = this.bins.length - 1; i >= 1; i--) {
      if (this.bins[i] > 0) {
        this.dataMax = i;
        break;
      }
    }

    // total number of pixels minus the number of zero pixels
    this.nonzeroPixelCount = data.length - this.bins[0];

    // get the bin with the most frequently occurring NONZERO value
    this.maxBin = 1;
    let max = this.bins[1];
    for (let i = 1; i < this.bins.length; i++) {
      if (this.bins[i] > max) {
        this.maxBin = i;
        max = this.bins[i];
      }
    }
  }

  /**
   * Generate a Window/level lookup table
   * @return {Lut}
   * @param {number} wnd in 0..1 range
   * @param {number} lvl in 0..1 range
   */
  lutGenerator_windowLevel(wnd, lvl) {
    // simple linear mapping for actual range
    var b = lvl - wnd * 0.5;
    var e = lvl + wnd * 0.5;
    return this.lutGenerator_minMax(b * 256, e * 256);
  }

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
  lutGenerator_minMax(b, e) {
    var lut = new Uint8Array(256 * 4);
    let range = e - b;
    if (range < 1) {
      range = 256;
    }
    for (var x = 0; x < lut.length / 4; ++x) {
      lut[x * 4 + 0] = 255;
      lut[x * 4 + 1] = 255;
      lut[x * 4 + 2] = 255;
      lut[x * 4 + 3] = Math.clamp(((x - b) * 256) / range, 0, 255);
    }
    return {
      lut: lut,
      controlPoints: [
        { x: 0, opacity: 0, color: [255, 255, 255] },
        { x: b, opacity: 0, color: [255, 255, 255] },
        { x: e, opacity: 1, color: [255, 255, 255] },
        { x: 255, opacity: 1, color: [255, 255, 255] },
      ],
    };
  }

  /**
   * Generate a straight 0-1 linear identity lookup table
   * @return {Lut}
   */
  lutGenerator_fullRange() {
    var lut = new Uint8Array(256);

    // simple linear mapping for actual range
    for (var x = 0; x < lut.length / 4; ++x) {
      lut[x * 4 + 0] = 255;
      lut[x * 4 + 1] = 255;
      lut[x * 4 + 2] = 255;
      lut[x * 4 + 3] = x;
    }

    return {
      lut: lut,
      controlPoints: [
        { x: 0, opacity: 0, color: [255, 255, 255] },
        { x: 255, opacity: 1, color: [255, 255, 255] },
      ],
    };
  }

  /**
   * Generate a lookup table over the min to max range of the data values
   * @return {Lut}
   */
  lutGenerator_dataRange() {
    // simple linear mapping for actual range
    var b = this.dataMin;
    var e = this.dataMax;
    return this.lutGenerator_minMax(b, e);
  }

  /**
   * Generate a lookup table based on histogram percentiles
   * @return {Lut}
   * @param {number} pmin
   * @param {number} pmax
   */
  lutGenerator_percentiles(pmin, pmax) {
    // e.g. 0.50, 0.983 starts from 50th percentile bucket and ends at 98.3 percentile bucket.

    const pixcount = this.nonzeroPixelCount + this.bins[0];
    //const pixcount = this.imgData.data.length;
    const lowlimit = pixcount * pmin;
    const hilimit = pixcount * pmax;

    var i = 0;
    var count = 0;
    for (i = 0; i < this.bins.length; ++i) {
      count += this.bins[i];
      if (count > lowlimit) {
        break;
      }
    }
    var hmin = i;

    count = 0;
    for (i = 0; i < this.bins.length; ++i) {
      count += this.bins[i];
      if (count > hilimit) {
        break;
      }
    }
    var hmax = i;

    return this.lutGenerator_minMax(hmin, hmax);
  }

  /**
   * Generate a 10% / 90% lookup table
   * @return {Lut}
   */
  lutGenerator_bestFit() {
    const pixcount = this.nonzeroPixelCount;
    //const pixcount = this.imgData.data.length;
    const limit = pixcount / 10;

    var i = 0;
    var count = 0;
    for (i = 1; i < this.bins.length; ++i) {
      count += this.bins[i];
      if (count > limit) {
        break;
      }
    }
    var hmin = i;

    count = 0;
    for (i = this.bins.length - 1; i >= 1; --i) {
      count += this.bins[i];
      if (count > limit) {
        break;
      }
    }
    var hmax = i;

    return this.lutGenerator_minMax(hmin, hmax);
  }

  /**
   * Generate a lookup table attempting to replicate ImageJ's "Auto" button
   * @return {Lut}
   */
  lutGenerator_auto2() {
    const AUTO_THRESHOLD = 5000;
    const pixcount = this.nonzeroPixelCount;
    //  const pixcount = this.imgData.data.length;
    const limit = pixcount / 10;
    const threshold = pixcount / AUTO_THRESHOLD;

    // this will skip the "zero" bin which contains pixels of zero intensity.
    var hmin = this.bins.length - 1;
    var hmax = 1;
    for (let i = 1; i < this.bins.length; ++i) {
      if (this.bins[i] > threshold && this.bins[i] <= limit) {
        hmin = i;
        break;
      }
    }
    for (let i = this.bins.length - 1; i >= 1; --i) {
      if (this.bins[i] > threshold && this.bins[i] <= limit) {
        hmax = i;
        break;
      }
    }

    if (hmax < hmin) {
      // just reset to whole range in this case.
      return this.lutGenerator_fullRange();
    } else {
      return this.lutGenerator_minMax(hmin, hmax);
    }
  }

  /**
   * Generate a lookup table using a percentile of the most commonly occurring value
   * @return {Lut}
   */
  lutGenerator_auto() {
    // simple linear mapping cutting elements with small appearence
    // get 10% threshold
    var PERCENTAGE = 0.1;
    var th = Math.floor(this.bins[this.maxBin] * PERCENTAGE);
    var b = 0;
    var e = this.bins.length - 1;
    for (let x = 1; x < this.bins.length; ++x) {
      if (this.bins[x] > th) {
        b = x;
        break;
      }
    }
    for (let x = this.bins.length - 1; x >= 1; --x) {
      if (this.bins[x] > th) {
        e = x;
        break;
      }
    }

    return this.lutGenerator_minMax(b, e);
  }

  /**
   * Generate an "equalized" lookup table
   * @return {Lut}
   */
  lutGenerator_equalize() {
    var map = [];
    for (let i = 0; i < this.bins.length; ++i) {
      map[i] = 0;
    }

    // summed area table?
    map[0] = this.bins[0];
    for (let i = 1; i < this.bins.length; ++i) {
      map[i] = map[i - 1] + this.bins[i];
    }

    var div = map[map.length - 1] - map[0];
    if (div > 0) {
      var lut = new Uint8Array(256 * 4);

      // compute lut as if continuous
      for (let i = 0; i < lut.length / 4; ++i) {
        lut[i * 4 + 0] = 255;
        lut[i * 4 + 1] = 255;
        lut[i * 4 + 2] = 255;
        lut[i * 4 + 3] = Math.clamp(255 * ((map[i] - map[0]) / div), 0, 255);
      }

      // compute control points piecewise linear.
      const lutControlPoints = [{ x: 0, opacity: 0, color: [255, 255, 255] }];
      // read up to the first nonzero.
      let i = 1;
      for (i = 1; i < map.length; ++i) {
        if (map[i] > 0) {
          lutControlPoints.push({
            x: i - 1,
            opacity: 0,
            color: [255, 255, 255],
          });
          break;
        }
      }

      var lastOpac = 0;
      var opac = 0;
      for (var j = i; j < map.length; ++j) {
        opac = (map[j] - map[0]) / div;
        if (j % 8 === 0) {
          if (Math.floor(opac * 255) !== Math.floor(lastOpac * 255)) {
            lutControlPoints.push({
              x: j,
              opacity: opac,
              color: [255, 255, 255],
            });
          }
        }
        lastOpac = opac;
      }
      lutControlPoints.push({ x: 255, opacity: 1, color: [255, 255, 255] });

      return {
        lut: lut,
        controlPoints: lutControlPoints,
      };
    } else {
      // just reset to whole range in this case...?
      return this.lutGenerator_fullRange();
    }
  }

  // @param {Object[]} controlPoints - array of {x:number 0..255, opacity:number 0..1, color:array of 3 numbers 0..255}
  // @return {Uint8Array} array of length 256*4 representing the rgba values of the gradient
  lutGenerator_fromControlPoints(controlPoints) {
    const lut = new Uint8Array(256 * 4).fill(0);
    if (controlPoints.length === 0) {
      return { lut: lut, controlPoints: controlPoints };
    }

    // ensure they are sorted in ascending order of x
    controlPoints.sort((a, b) => (a.x > b.x ? 1 : -1));

    // special case only one control point.
    if (controlPoints.length === 1) {
      const rgba = controlPointToRGBA(controlPoints[0]);
      // copy val from x to 255.
      for (let x = controlPoints[0].x; x < 256; ++x) {
        lut[x * 4 + 0] = rgba[0];
        lut[x * 4 + 1] = rgba[1];
        lut[x * 4 + 2] = rgba[2];
        lut[x * 4 + 3] = rgba[3];
      }
      return { lut: lut, controlPoints: controlPoints };
    }

    let c0 = controlPoints[0];
    let c1 = controlPoints[1];
    let color0 = controlPointToRGBA(c0);
    let color1 = controlPointToRGBA(c1);
    let lastIndex = 1;
    let a = 0;
    // if the first control point is after 0, act like there are 0s going all the way up to it.
    // or lerp up to the first point?
    for (let x = c0.x; x < 256; ++x) {
      if (x > c1.x) {
        // advance control points
        c0 = c1;
        color0 = color1;
        lastIndex++;
        if (lastIndex >= controlPoints.length) {
          // if the last control point is before 255, then we want to continue its value all the way to 255.
          c1 = { x: 255, color: c1.color, opacity: c1.opacity };
        } else {
          c1 = controlPoints[lastIndex];
        }
        color1 = controlPointToRGBA(c1);
      }
      a = (x - c0.x) / (c1.x - c0.x);
      // lerp the colors
      lut[x * 4 + 0] = lerp(color0[0], color1[0], a);
      lut[x * 4 + 1] = lerp(color0[1], color1[1], a);
      lut[x * 4 + 2] = lerp(color0[2], color1[2], a);
      lut[x * 4 + 3] = lerp(color0[3], color1[3], a);
    }
    return { lut: lut, controlPoints: controlPoints };
  }
}
