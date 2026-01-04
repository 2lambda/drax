import moonrakerClient from "../index";
import methods from "../util/constants";
export default class Update {
    constructor(private client: moonrakerClient) {}

    status = {
        get: () => {
            return this.client.request({
                method: methods.update.status.get,
            });
        },

        refresh: (params: {name?: string
    }) => {
            return this.client.request({
                method: methods.update.status.refresh,
                ...(params.name !== undefined ? { params } : {}),
            });
        },
    };

    upgrade(params: {name?: string}) {
        return this.client.request({
            method: methods.update.upgrade,
            ...(params.name !== undefined ? { params } : {}),
        });
    }

    rollback(params: {name: string}) {
        return this.client.request({
            method: methods.update.rollback,
            params,
        });
    }
}
