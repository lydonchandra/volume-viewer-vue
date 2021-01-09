export const AREA_LIGHT: 0;
export const SKY_LIGHT: 1;
export class Light {
    constructor(type: any);
    m_theta: number;
    m_phi: number;
    m_width: number;
    m_height: number;
    m_distance: number;
    m_skyRadius: number;
    m_P: any;
    m_target: any;
    m_area: number;
    m_color: any;
    m_colorTop: any;
    m_colorMiddle: any;
    m_colorBottom: any;
    m_T: any;
    m_N: any;
    m_U: any;
    m_V: any;
    update(targetPoint: any, cameraMatrix: any): void;
    m_halfWidth: number;
    m_halfHeight: number;
    m_areaPdf: number;
}
