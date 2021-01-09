export default TrackballControls;
declare class TrackballControls {
    constructor(object: any, domElement: any);
    STATE: {
        NONE: number;
        ROTATE: number;
        ZOOM: number;
        PAN: number;
        TOUCH_ROTATE: number;
        TOUCH_ZOOM_PAN: number;
    };
    object: any;
    domElement: any;
    enabled: boolean;
    screen: {
        left: number;
        top: number;
        width: number;
        height: number;
    };
    scale: number;
    aspect: number;
    rotateSpeed: number;
    zoomSpeed: number;
    panSpeed: number;
    noRotate: boolean;
    noZoom: boolean;
    noPan: boolean;
    staticMoving: boolean;
    dynamicDampingFactor: number;
    minDistance: number;
    maxDistance: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    keys: number[];
    target: any;
    EPS: number;
    lastPosition: any;
    _state: number;
    _prevState: number;
    _eye: any;
    _movePrev: any;
    _moveCurr: any;
    _lastAxis: any;
    _lastAngle: number;
    _zoomStart: any;
    _zoomEnd: any;
    _touchZoomDistanceStart: number;
    _touchZoomDistanceEnd: number;
    _panStart: any;
    _panEnd: any;
    target0: any;
    position0: any;
    up0: any;
    changeEvent: {
        type: string;
    };
    startEvent: {
        type: string;
    };
    endEvent: {
        type: string;
    };
    handleResize(): void;
    getMouseOnScreen(pageX: any, pageY: any): any;
    getMouseOnCircle(pageX: any, pageY: any): any;
    getAutoRotationAngle(delta: any): number;
    rotateCamera(delta: any): void;
    zoomCamera(): void;
    panCamera(): () => void;
    checkDistances(): void;
    update(delta: any): void;
    reset(): void;
    keydown(event: any): void;
    keyup(event: any): void;
    mousedown(event: any): void;
    mousemove(event: any): void;
    mouseup(event: any): void;
    mousewheel(event: any): void;
    touchstart(event: any): void;
    touchmove(event: any): void;
    touchend(event: any): void;
    contextmenu(event: any): void;
    dispose(): void;
}