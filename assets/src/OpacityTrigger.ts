import { _decorator, Component, Enum, UIOpacity, CCFloat, } from "cc";
import { ScreenResizeHandler } from "./ScreenResizeHandler";
const { ccclass, property } = _decorator;

@ccclass("OpacityTrigger")
export class OpacityTrigger extends Component {
  @property({
    type: UIOpacity,
  })
  opacityVertical: UIOpacity = null;

  @property({
    type: UIOpacity,
  })
  opacityHorizontal: UIOpacity = null;

  screenResizeHandler: ScreenResizeHandler = null;
  uiOpacity: UIOpacity = null;

  start() {
    this.uiOpacity = this.node.getComponent(UIOpacity);
    this.screenResizeHandler =
      this.node.scene.getComponentInChildren(ScreenResizeHandler);

    if (this.screenResizeHandler) {
      this.screenResizeHandler.addResizeListener(this.onResize, this);
      this.onResize();
    }
  }

  onResize() {
    const ratio = this.screenResizeHandler.getRatio();
    if (ratio >= 1) {
      if (this.opacityVertical) this.opacityVertical.opacity = 0;
      if (this.opacityHorizontal) this.opacityHorizontal.opacity = 255;
    } else {
      if (this.opacityVertical) this.opacityVertical.opacity = 255;
      if (this.opacityHorizontal) this.opacityHorizontal.opacity = 0;
    }
  }
}
