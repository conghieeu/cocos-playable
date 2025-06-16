import { _decorator, Component, screen, view, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScreenResizeHandler')
export class ScreenResizeHandler extends Component {
    private _listeners: Map<string, Function[]> = new Map();

    onLoad() {
        view.setResizeCallback(() => {
            this.onWindowResize();
        });
        this.onWindowResize();
    }

    // Đăng ký callback
    public addResizeListener(callback: Function, context?: any): string {
        const id = `listener_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const boundCallback = context ? callback.bind(context) : callback;

        if (!this._listeners.has('resize')) {
            this._listeners.set('resize', []);
        }

        this._listeners.get('resize').push(boundCallback);
        return id;
    }

    // Hủy đăng ký callback
    public removeResizeListener(callback: Function): void {
        if (!this._listeners.has('resize')) return;

        const listeners = this._listeners.get('resize');
        const index = listeners.indexOf(callback);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    }

    // Kích hoạt sự kiện
    private triggerResizeEvent(): void {
        if (!this._listeners.has('resize')) return;

        const size = this.getSize();
        const listeners = this._listeners.get('resize');
        listeners.forEach(callback => callback(size));
    }

    public getRatio() {
        let ratio = this.node.getComponent(UITransform).width / this.node.getComponent(UITransform).height;
        return ratio;
    }

    onWindowResize() {
        let size = this.getSize();
        this.node.getComponent(UITransform).setContentSize(size.width, size.height);
        this.triggerResizeEvent();
    }

    public getSize() {
        let screenSize = screen.windowSize;
        let designResolution = view.getVisibleSize();

        let ScreenRatio = screenSize.width / screenSize.height;
        let DesignRatio = designResolution.height / designResolution.width;

        if (ScreenRatio > DesignRatio) {
            designResolution.height = designResolution.width * ScreenRatio;
        }
        else {
            designResolution.width = designResolution.height * (1 / ScreenRatio);
        }

        return {
            width: designResolution.height,
            height: designResolution.width
        }
    }
}
