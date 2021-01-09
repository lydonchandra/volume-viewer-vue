export default class Channel {
    constructor(name: any);
    loaded: boolean;
    imgData: {
        data: any;
        width: any;
        height: any;
    };
    name: any;
    getHistogram(): Histogram;
    getIntensity(x: any, y: any, z: any): any;
    getIntensityFromAtlas(x: any, y: any, z: any): any;
    setBits(bitsArray: any, w: any, h: any): void;
    histogram: Histogram;
    unpackVolumeFromAtlas(x: any, y: any, z: any): void;
    dims: any[];
    volumeData: any;
    setFromVolumeData(bitsArray: any, vx: any, vy: any, vz: any, ax: any, ay: any): void;
    packToAtlas(vx: any, vy: any, vz: any, ax: any, ay: any): void;
    setLut(lut: any): void;
    lut: any;
    lutGenerator_windowLevel(wnd: any, lvl: any): void;
    lutGenerator_fullRange(): void;
    lutGenerator_dataRange(): void;
    lutGenerator_bestFit(): void;
    lutGenerator_auto2(): void;
    lutGenerator_auto(): void;
    lutGenerator_equalize(): void;
    lutGenerator_percentiles(lo: any, hi: any): void;
}
import Histogram from "./Histogram";
