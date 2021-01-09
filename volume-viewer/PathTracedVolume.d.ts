export default class PathTracedVolume {
    constructor(volume: any);
    volume: any;
    viewChannels: number[];
    scale: any;
    translation: any;
    rotation: any;
    pixelSamplingRate: number;
    pathTracingUniforms: {
        tPreviousTexture: {
            type: string;
            value: any;
        };
        uSampleCounter: {
            type: string;
            value: number;
        };
        uFrameCounter: {
            type: string;
            value: number;
        };
        uResolution: {
            type: string;
            value: any;
        };
        gClippedAaBbMin: {
            type: string;
            value: any;
        };
        gClippedAaBbMax: {
            type: string;
            value: any;
        };
        gDensityScale: {
            type: string;
            value: number;
        };
        gStepSize: {
            type: string;
            value: number;
        };
        gStepSizeShadow: {
            type: string;
            value: number;
        };
        gInvAaBbMax: {
            type: string;
            value: any;
        };
        g_nChannels: {
            type: string;
            value: number;
        };
        gShadingType: {
            type: string;
            value: number;
        };
        gGradientDeltaX: {
            type: string;
            value: any;
        };
        gGradientDeltaY: {
            type: string;
            value: any;
        };
        gGradientDeltaZ: {
            type: string;
            value: any;
        };
        gInvGradientDelta: {
            type: string;
            value: number;
        };
        gGradientFactor: {
            type: string;
            value: number;
        };
        gCamera: {
            value: {
                m_from: any;
                m_U: any;
                m_V: any;
                m_N: any;
                m_screen: any;
                m_invScreen: any;
                m_focalDistance: number;
                m_apertureSize: number;
                m_isOrtho: number;
            };
        };
        gLights: {
            value: import("./Light.js").Light[];
        };
        volumeTexture: {
            type: string;
            value: any;
        };
        g_lutTexture: {
            type: string;
            value: any;
        };
        g_intensityMax: {
            type: string;
            value: any;
        };
        g_intensityMin: {
            type: string;
            value: any;
        };
        g_opacity: {
            type: string;
            value: number[];
        };
        g_emissive: {
            type: string;
            value: any[];
        };
        g_diffuse: {
            type: string;
            value: any[];
        };
        g_specular: {
            type: string;
            value: any[];
        };
        g_glossiness: {
            type: string;
            value: number[];
        };
        uShowLights: {
            type: string;
            value: number;
        };
        flipVolume: {
            type: string;
            value: any;
        };
    };
    volumeTexture: any;
    maskChannelIndex: number;
    maskAlpha: number;
    bounds: {
        bmin: any;
        bmax: any;
    };
    cameraIsMoving: boolean;
    sampleCounter: number;
    frameCounter: number;
    stepSizePrimaryRayVoxels: number;
    stepSizeSecondaryRayVoxels: number;
    pathTracingScene: any;
    screenTextureScene: any;
    quadCamera: any;
    fullTargetResolution: any;
    pathTracingRenderTarget: any;
    screenTextureRenderTarget: any;
    screenTextureShader: {
        uniforms: any;
        vertexShader: string;
        fragmentShader: string;
    };
    screenOutputShader: {
        uniforms: any;
        vertexShader: string;
        fragmentShader: string;
    };
    pathTracingGeometry: any;
    pathTracingMaterial: any;
    pathTracingMesh: any;
    screenTextureGeometry: any;
    screenTextureMaterial: any;
    screenTextureMesh: any;
    screenOutputGeometry: any;
    screenOutputMaterial: any;
    denoiseShaderUniforms: any;
    screenOutputDenoiseMaterial: any;
    screenOutputMesh: any;
    gradientDelta: number;
    cleanup(): void;
    setRenderUpdateListener(callback: any): void;
    renderUpdateListener: any;
    resetProgress(): void;
    setVisible(isVisible: any): void;
    doRender(canvas: any): void;
    get3dObject(): any;
    onChannelData(batch: any): void;
    setScale(scale: any): void;
    setRayStepSizes(primary: any, secondary: any): void;
    setTranslation(vec3xyz: any): void;
    setRotation(eulerXYZ: any): void;
    setOrthoScale(value: any): void;
    setGamma(gmin: any, glevel: any, gmax: any): void;
    setFlipAxes(flipX: any, flipY: any, flipZ: any): void;
    setResolution(x: any, y: any): void;
    setPixelSamplingRate(rate: any): void;
    setDensity(density: any): void;
    setBrightness(brightness: any): void;
    setAxisClip(axis: any, minval: any, maxval: any, isOrthoAxis: any): void;
    setChannelAsMask(channelIndex: any): boolean;
    setMaskAlpha(maskAlpha: any): void;
    setOrthoThickness(value: any): void;
    setIsOrtho(isOrthoAxis: any): void;
    onStartControls(): void;
    onChangeControls(): void;
    onEndControls(): void;
    viewpointMoved(): void;
    updateActiveChannels(image: any): void;
    updateVolumeData4(): void;
    updateLuts(): void;
    updateMaterial(image: any): void;
    updateShadingMethod(brdf: any): void;
    updateShowLights(showlights: any): void;
    updateExposure(e: any): void;
    updateCamera(fov: any, focalDistance: any, apertureSize: any): void;
    updateLights(state: any): void;
    updateLightsSecondary(cameraMatrix: any): void;
    updateClipRegion(xmin: any, xmax: any, ymin: any, ymax: any, zmin: any, zmax: any): void;
}
