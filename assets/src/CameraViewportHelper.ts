import { ScreenResizeHandler } from './ScreenResizeHandler';
import { _decorator, Component, Camera, Vec3, UITransform, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CameraViewportHelper')
export class CameraViewportHelper extends Component {
    @property({
        type: Camera,
    })
    camera: Camera = null;

    @property({
        type: ScreenResizeHandler,
    })
    screenResizeHandler: ScreenResizeHandler = null;

    start() {
        if (!this.screenResizeHandler) {
            this.screenResizeHandler = this.node.scene.getComponentInChildren(ScreenResizeHandler);
        }
        if (this.screenResizeHandler) {
            this.screenResizeHandler.addResizeListener(this.OnWindowResize, this);
            this.OnWindowResize();
        }
    }

    OnWindowResize() {
        if (!this.camera) return;
        let visibleSize = this.screenResizeHandler.getSize();
        let ratio = this.screenResizeHandler.getRatio();
        const horizontalRatio = 1336 / 750;
        const verticalRatio = 750 / 1336;
        if (ratio >= horizontalRatio) {
            this.camera.orthoHeight = 375
        }
        else if (ratio >= 1 && ratio < horizontalRatio) {
            this.camera.orthoHeight = 666 * (1 / ratio);
        }
        else if (ratio < 1 && ratio >= verticalRatio) {
            this.camera.orthoHeight = 666
        }
    }
}