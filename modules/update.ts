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

        refresh: (name?: string) => {
            return this.client.request({
                method: methods.update.status.refresh,
                ...(name !== undefined ? { params: { name } } : {}),
            });
        },
    };

    upgrade(name?: string) {
        return this.client.request({
            method: methods.update.upgrade,
            ...(name !== undefined ? { params: { name } } : {}),
        });
    }

    rollback(name: string) {
        return this.client.request({
            method: methods.update.rollback,
            params: { name },
        });
    }
}
