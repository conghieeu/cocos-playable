import { _decorator, UITransform, Widget, Enum, __private, Node, view, Vec2, CCFloat } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property, executeInEditMode } = _decorator;

enum AspectMode {
    None = 0,
    FollowHeight = 1,
    FollowWidth = 2
}

@ccclass('AspectWidget')
@executeInEditMode
export class AspectWidget extends Widget {
    @property({
        type: Enum(AspectMode),
    })
    aspectMode: AspectMode = AspectMode.None;

    @property({
        type: CCFloat,
    })
    ratio: number = 0;
    size: Vec2 = new Vec2(0, 0);

    @property
    hasAdjusted = false;

    update() {
        const size = this.node.getComponent(UITransform);

        if (!this.hasAdjusted) {
            this.ratio = size.width / size.height;
            this.hasAdjusted = true;
        }
        if ((this.size.x != size.width || this.size.y != size.height) && this.hasAdjusted) {
            this.adjustSize();
            this.size = new Vec2(size.width, size.height);
        }
    }

    adjustSize() {
        const nodeTransform = this.getComponent(UITransform);

        if (this.aspectMode === AspectMode.FollowHeight) {
            nodeTransform.setContentSize(nodeTransform.height * this.ratio, nodeTransform.height);
        }
        else if (this.aspectMode === AspectMode.FollowWidth) {
            nodeTransform.setContentSize(nodeTransform.width, nodeTransform.width / this.ratio);
        }
    }
}
