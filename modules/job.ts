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

        add: (options: { filenames: string[]; reset?: boolean }) => {
            const params: { filename: string[]; reset: boolean } = {
                filename: options.filenames,
                reset: options.reset ?? false,
            };
            return this.client.request({
                method: methods.job.manage.create,
                params,
            });
        },

        remove: (
            options:
                | { all: true; job_ids?: never }
                | { all?: false; job_ids?: never },
        ) => {
            const all = options.all ?? false;
            const params = {};
            if (all) {
                Object.assign(params, { all });
            } else {
                Object.assign(params, { all });
                Object.assign(params, { job_ids: options.job_ids });
            }

            return this.client.request({
                method: methods.job.manage.delete,
                params,
            });
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

        jump: (options: { job_id: string }) => {
            return this.client.request({
                method: methods.job.queue.jump,
                params: {
                    job_id: options.job_id,
                },
            });
        },
    };
    history = {
        // list: (options: {
        //     limit?: number,
        //     start?: number,
        //     before?: number,
        //     since?: number,
        //     order?: "asc" | "desc" = "desc",
        // }) => {
        //     const params = {
        //
        //     }
        //
        //     this.client.request({
        //         method: methods.job.history.getList,
        //         params: {
        //             limit,
        //             start,
        //             ...(before !== undefined ? { params: { before } } : {}),
        //             ...(since !== undefined ? { params: { since } } : {}),
        //             order,
        //         },
        //     });
        // },

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
