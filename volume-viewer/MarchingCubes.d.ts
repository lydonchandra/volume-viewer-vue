export default MarchingCubes;
export class MarchingCubes {
    constructor(resolution: any, material: any, enableUvs: any, enableColors: any, enableNormals: any, volumeFieldRef: any);
    vlist: Float32Array;
    nlist: Float32Array;
    enableUvs: boolean;
    enableColors: boolean;
    enableNormals: boolean;
    init(resolution: any, volumeFieldRef: any): void;
    dirty: boolean;
    resolution: any;
    isovalue: number;
    stepSizeX: number;
    stepSizeY: number;
    stepSizeZ: number;
    sizeX: any;
    sizeY: any;
    sizeZ: any;
    sizeXY: number;
    sizeXYZ: number;
    size3: number;
    halfsizeX: number;
    halfsizeY: number;
    halfsizeZ: number;
    deltaX: number;
    deltaY: number;
    deltaZ: number;
    yd: any;
    zd: number;
    field: any;
    normal_cache: Float32Array;
    maxCount: number;
    count: number;
    hasPositions: boolean;
    hasNormals: boolean;
    hasColors: boolean;
    hasUvs: boolean;
    positionArray: Float32Array;
    normalArray: Float32Array;
    uvArray: Float32Array;
    colorArray: Float32Array;
    lerp(a: any, b: any, t: any): any;
    VIntX(q: any, offset: any, isol: any, x: any, y: any, z: any, valp1: any, valp2: any): void;
    VIntY(q: any, offset: any, isol: any, x: any, y: any, z: any, valp1: any, valp2: any): void;
    VIntZ(q: any, offset: any, isol: any, x: any, y: any, z: any, valp1: any, valp2: any): void;
    compNorm(q: any): void;
    polygonize(fx: any, fy: any, fz: any, q: any, isol: any, renderCallback: any): number;
    posnormtriv(pos: any, norm: any, o1: any, o2: any, o3: any, renderCallback: any): void;
    begin(): void;
    end(renderCallback: any): void;
    addBall(ballx: any, bally: any, ballz: any, strength: any, subtract: any): void;
    addPlaneX(strength: any, subtract: any): void;
    addPlaneY(strength: any, subtract: any): void;
    addPlaneZ(strength: any, subtract: any): void;
    reset(): void;
    render2(renderCallback: any): void;
    generateGeometry(): any[];
}
export const edgeTable: Int32Array;
export const triTable: Int32Array;
