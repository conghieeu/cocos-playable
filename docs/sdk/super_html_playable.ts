/**
 * super-html playable adapter
 * @help https://store.cocos.com/app/detail/3657
 * @home https://github.com/magician-f/cocos-playable-demo
 * @author https://github.com/magician-f
 */
export class super_html_playable {
    game_start() {
        console.log("game start");
        //@ts-ignore
        window.super_html && super_html.game_start();
    }

    download() {
        console.log("download");
        //@ts-ignore
        window.super_html && super_html.download();
    }

    game_end() {
        console.log("game end");
        //@ts-ignore
        window.super_html && super_html.game_end();
    }

    /**
     * Có ẩn nút tải xuống hay không, nghĩa là sử dụng nút tải xuống do nền tảng chèn vào
     * channel : google
     */
    is_hide_download() {
        //@ts-ignore
        if (window.super_html && super_html.is_hide_download) {
            //@ts-ignore
            return super_html.is_hide_download();
        }
        return false
    }

    /**
     * Thiết lập địa chỉ cửa hàng
     * channel : unity
     * @param url https://play.google.com/store/apps/details?id=com.unity3d.auicreativetestapp
     */
    set_google_play_url(url: string) {
        //@ts-ignore
        window.super_html && (super_html.google_play_url = url);
    }

    /**
    * Thiết lập địa chỉ cửa hàng
    * channel : unity
    * @param url https://apps.apple.com/us/app/ad-testing/id1463016906
    */
    set_app_store_url(url: string) {
        //@ts-ignore
        window.super_html && (super_html.appstore_url = url);
    }

    /**
    * Có bật âm thanh hay không
    * channel : ironsource
    */
    is_audio() {
        //@ts-ignore
        return (window.super_html && super_html.is_audio()) || true;
    }


}
export default new super_html_playable();
