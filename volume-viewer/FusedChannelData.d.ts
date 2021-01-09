export default class FusedChannelData {
    static onFuseComplete(): void;
    static setOnFuseComplete(onFuseComplete: any): void;
    constructor(atlasX: any, atlasY: any);
    width: any;
    height: any;
    fused: Uint8Array;
    fusedTexture: any;
    maskTexture: any;
    useSingleThread: boolean;
    fuseWorkersWorking: number;
    cleanup(): void;
    workers: any[];
    workersCount: number;
    setupWorkers(): void;
    onChannelLoaded(batch: any, channels: any): void;
    appendEmptyChannel(name: any): void;
    fuse(combination: any, fuseMethod: any, channels: any): void;
    fuseRequested: any;
    channelsDataToFuse: any;
    fuseMethodRequested: any;
    isFusing: boolean;
    singleThreadedFuse(combination: any, channels: any): void;
    fusedData: {
        data: Uint8Array;
        width: any;
        height: any;
    };
    setChannelAsMask(idx: any, channel: any): boolean;
    maskChannelLoaded: boolean;
    maskChannelIndex: any;
}
