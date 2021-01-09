export function createShaderMaterial(id: any): any;
export namespace fresnelShaderSettings {
    const bias: number;
    const power: number;
    const scale: number;
}
export namespace defaultMaterialSettings {
    const shininess: number;
    const specularColor: number;
}
export namespace transparentMaterialSettings {
    const shininess_1: number;
    export { shininess_1 as shininess };
    const specularColor_1: number;
    export { specularColor_1 as specularColor };
    export namespace transparency {
        const bias_1: number;
        export { bias_1 as bias };
        const power_1: number;
        export { power_1 as power };
        const scale_1: number;
        export { scale_1 as scale };
    }
}
export namespace ShaderLibrary {
    namespace fresnel {
        namespace uniforms {
            export namespace bias_2 {
                const value: number;
            }
            export { bias_2 as bias };
            export namespace power_2 {
                const value_1: number;
                export { value_1 as value };
            }
            export { power_2 as power };
            export namespace scale_2 {
                const value_2: number;
                export { value_2 as value };
            }
            export { scale_2 as scale };
            export namespace uBaseColor {
                const value_3: any;
                export { value_3 as value };
            }
        }
        const vertexShader: string;
        const fragmentShader: string;
    }
}
