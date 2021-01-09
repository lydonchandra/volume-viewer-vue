export function rayMarchingShaderUniforms(): {
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
export const rayMarchingVertexShaderSrc: string;
export const rayMarchingFragmentShaderSrc: string;
