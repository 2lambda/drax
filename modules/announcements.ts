import moonrakerClient from "../index";
import methods from "../util/constants";

export default class Announcement {
    constructor(private client: moonrakerClient) {}
    list(params:{include_dismissed?: boolean}) {
        return this.client.request({
            method: methods.announcement.list,
            ...(params.include_dismissed !== undefined && { params }),
        });
    }

    update() {
        return this.client.request({
            method: methods.announcement.update,
        });
    }

    dismiss(params: {entry_id: string, wake_time?: number }) {
        const { entry_id, wake_time } = params;
        return this.client.request({
            method: methods.announcement.dismiss,
            params: {
                entry_id,
                ...(wake_time !== undefined && { wake_time }),
            },
        });
    }

    feed = {
        list: () => {
            return this.client.request({
                method: methods.announcement.feeds.get,
            });
        },
        subscribe: (params: {name: string}) => {
            return this.client.request({
                method: methods.announcement.feeds.get,
                params,
            });
        },
        remove: (params: {name: string}) => {
            return this.client.request({
                method: methods.announcement.feeds.remove,
                params,
            });
        },
    };
}
