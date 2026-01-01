import moonrakerClient from "../index";
import methods from "../util/constants";

export default class Announcement {
    constructor(private client: moonrakerClient) {}
    list(include_dismissed: true) {
        return this.client.request({
            method: methods.announcement.list,
            params: { include_dismissed },
        });
    }

    update() {
        return this.client.request({
            method: methods.announcement.update,
        });
    }

    dismiss(entry_id: string, wake_time: number | null = null) {
        return this.client.request({
            method: methods.announcement.dismiss,
            params: {
                entry_id,
                wake_time,
            },
        });
    }

    feed = {
        list: () => {
            return this.client.request({
                method: methods.announcement.feeds.get,
            });
        },
        subscribe: (name: string) => {
            return this.client.request({
                method: methods.announcement.feeds.get,
                params: { name },
            });
        },
        remove: (name: string) => {
            return this.client.request({
                method: methods.announcement.feeds.remove,
                params: { name },
            });
        },
    };
}
