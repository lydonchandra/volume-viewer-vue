declare namespace _default {
    export { spotlightSettings };
    export { ambientLightSettings };
    export { reflectedLightSettings };
    export { fillLightSettings };
}
export default _default;
declare const spotlightSettings: Readonly<{
    angle: number;
    castShadow: boolean;
    color: number;
    intensity: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
}>;
declare const ambientLightSettings: Readonly<{
    color: number;
    intensity: number;
}>;
declare const reflectedLightSettings: Readonly<{
    castShadow: boolean;
    color: number;
    intensity: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
}>;
declare const fillLightSettings: Readonly<{
    castShadow: boolean;
    color: number;
    intensity: number;
    position: {
        x: number;
        y: number;
        z: number;
    };
}>;
