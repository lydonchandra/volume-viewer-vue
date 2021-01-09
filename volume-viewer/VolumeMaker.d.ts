export default VolumeMaker;
declare namespace VolumeMaker {
    function createVolume(vx: number, vy: number, vz: number, sdFunc: Function): Uint8Array;
    function createSphere(vx: number, vy: number, vz: number, radius: number): Uint8Array;
    function createCylinder(vx: number, vy: number, vz: number, hx: number, hy: number): Uint8Array;
    function createTorus(vx: number, vy: number, vz: number, tx: number, ty: number): Uint8Array;
    function createCone(vx: number, vy: number, vz: number, cx: number, cy: number): Uint8Array;
}
