declare namespace _default {
    export { SurfaceNets as surfaceNets };
    export { ConstructTHREEGeometry as constructTHREEGeometry };
}
export default _default;
declare function SurfaceNets(data: any, dims: any, isovalue: any): {
    vertices: number[][];
    faces: number[][];
};
declare function ConstructTHREEGeometry(surfaceNetResult: any): any[];
