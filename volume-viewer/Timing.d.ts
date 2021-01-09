export default class Timing {
    beginTime: number;
    prevTime: number;
    frames: number;
    lastFrameMs: number;
    lastFPS: number;
    begin(): void;
    end(): number;
    update(): void;
}
