export default class RayMarchedAtlasVolume {
    constructor(volume: any);
    volume: any;
    bounds: {
        bmin: any;
        bmax: any;
    };
    cube: any;
    cubeMesh: any;
    cubeTransformNode: any;
    uniforms: {
        iResolution: {
            type: string;
            value: any;
        };
        CLIP_NEAR: {
            type: string;
            value: number;
        };
        CLIP_FAR: {
            type: string;
            value: number;
        };
        maskAlpha: {
            type: string;
            value: number;
        };
        BRIGHTNESS: {
            type: string;
            value: number;
        };
        DENSITY: {
            type: string;
            value: number;
        };
        GAMMA_MIN: {
            type: string;
            value: number;
        };
        GAMMA_MAX: {
            type: string;
            value: number;
        };
        GAMMA_SCALE: {
            type: string;
            value: number;
        };
        BREAK_STEPS: {
            type: string;
            value: number;
        };
        ATLAS_X: {
            type: string;
            value: number;
        };
        ATLAS_Y: {
            type: string;
            value: number;
        };
        SLICES: {
            type: string;
            value: number;
        };
        isOrtho: {
            type: string;
            value: number;
        };
        orthoThickness: {
            type: string;
            value: number;
        };
        orthoScale: {
            type: string;
            value: number;
        };
        AABB_CLIP_MIN: {
            type: string;
            value: any;
        };
        AABB_CLIP_MAX: {
            type: string;
            value: any;
        };
        inverseModelViewMatrix: {
            type: string;
            value: any;
        };
        textureAtlas: {
            type: string;
            value: any;
        };
        textureAtlasMask: {
            type: string;
            value: any;
        };
        maxProject: {
            type: string;
            value: number;
        };
        flipVolume: {
            type: string;
            value: any;
        };
    };
    channelData: FusedChannelData;
    cleanup(): void;
    setVisible(isVisible: any): void;
    doRender(canvas: any): void;
    get3dObject(): any;
    onChannelData(batch: any): void;
    setScale(scale: any): void;
    scale: any;
    setRayStepSizes(primary: any, secondary: any): void;
    setTranslation(vec3xyz: any): void;
    setRotation(eulerXYZ: any): void;
    setOrthoScale(value: any): void;
    setResolution(x: any, y: any): void;
    setPixelSamplingRate(value: any): void;
    setDensity(density: any): void;
    setBrightness(brightness: any): void;
    setIsOrtho(isOrthoAxis: any): void;
    viewpointMoved(): void;
    setGamma(gmin: any, glevel: any, gmax: any): void;
    setMaxProjectMode(isMaxProject: any): void;
    setAxisClip(axis: any, minval: any, maxval: any, isOrthoAxis: any): void;
    setFlipAxes(flipX: any, flipY: any, flipZ: any): void;
    updateClipRegion(xmin: any, xmax: any, ymin: any, ymax: any, zmin: any, zmax: any): void;
    setChannelAsMask(channelIndex: any): boolean;
    setMaskAlpha(maskAlpha: any): void;
    setOrthoThickness(value: any): void;
    setUniform(name: any, value: any): void;
    fuse(channelcolors: any, channeldata: any): void;
}
import FusedChannelData from "./FusedChannelData.js";
