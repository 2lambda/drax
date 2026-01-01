import moonrakerClient from "../index.ts";
import methods from "../util/constants.ts";
export default class Job {
    constructor(private client: moonrakerClient) {}
    queue = {
        status: () => {
            return this.client.request({
                method: methods.job.queue.status,
            });
        },

        add: (filenames: string[], reset: boolean = false) => {
            return this.client.request({
                method: methods.job.manage.create,
                params: {
                    filenames,
                    reset,
                },
            });
        },

        remove: (job_ids?: string[], all?: boolean) => {
            if (job_ids.length === 0 && !all) {
                throw new Error("invalid options");
            } else {
                if (all) {
                    return this.client.request({
                        method: methods.job.manage.delete,
                        params: {
                            all,
                        },
                    });
                } else {
                    return this.client.request({
                        method: methods.job.manage.delete,
                        params: {
                            job_ids: job_ids,
                            all,
                        },
                    });
                }
            }
        },

        pause: () => {
            return this.client.request({
                method: methods.job.queue.pause,
            });
        },

        start: () => {
            return this.client.request({
                method: methods.job.queue.start,
            });
        },

        jump: (job_id: string) => {
            return this.client.request({
                method: methods.job.queue.jump,
                params: {
                    job_id,
                },
            });
        },
    };
    history = {
        list: (
            limit: number = 50,
            start: number = 0,
            before?: number,
            since?: number,
            order: "asc" | "desc" = "desc",
        ) => {
            this.client.request({
                method: methods.job.history.getList,
                params: {
                    limit,
                    start,
                    ...(before !== undefined ? { params: { before } } : {}),
                    ...(since !== undefined ? { params: { since } } : {}),
                    order,
                },
            });
        },

        totals: {
            get: () => {
                return this.client.request({
                    method: methods.job.history.totals.get,
                });
            },
            reset: () => {
                return this.client.request({
                    method: methods.job.history.totals.reset,
                });
            },
        },

        get: (uid: string) => {
            return this.client.request({
                method: methods.job.history.job.get,
                params: { uid },
            });
        },

        delete: (uid: string) => {
            return this.client.request({
                method: methods.job.history.job.delete,
                params: { uid },
            });
        },
    };
}
