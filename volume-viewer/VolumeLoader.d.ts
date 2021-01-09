export default VolumeLoader;
export type PerChannelCallback = (imageurl: string, channelindex: number) => any;
declare namespace VolumeLoader {
    function loadVolumeAtlasData(volume: any, imageArray: {
        name: string;
        channels: number[];
    }[], callback: PerChannelCallback): {
        [x: string]: new (width?: number, height?: number) => HTMLImageElement;
    };
}
