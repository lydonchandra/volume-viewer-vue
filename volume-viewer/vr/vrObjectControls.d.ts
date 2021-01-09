export class vrObjectControls {
    constructor(renderer: any, scene: any, object: any);
    controller1: any;
    controller2: any;
    object: any;
    trigger1Down: any;
    trigger2Down: any;
    scale: any;
    previousDist: any;
    currentChannel: number[];
    scene: any;
    pushObjectState(obj: any): void;
    vrRestoreState: {
        brightness: any;
        density: any;
        isPathTrace: any;
        enabled: any[];
    };
    popObjectState(obj: any): void;
    onEnterVR(): void;
    onMenu1: any;
    onMenu2: any;
    onAxisChange(obj: any): void;
    onLeaveVR(): void;
    cycleChannels(i: any): void;
    update(deltaT: any): void;
    VRrotate: boolean;
    VRrotateStartPos: any;
    VRzoom: boolean;
    VRzoomStart: number;
    VRzoomdist: any;
    wasZooming: any;
}
export default vrObjectControls;
