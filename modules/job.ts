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
        list: (params: {
            limit?: number,
            start?: number,
            before?: number,
            since?: number,
            order?: "asc" | "desc"
        }) => {
            const {limit=50,start=0, order="desc", before, since} = params;

            this.client.request({
                method: methods.job.history.getList,
                params: {
                    limit,
                    start,
                    ...(before !== undefined && { before }),
                    ...(since !== undefined && { since }),
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

        get: (params: {uid: string}) => {
            return this.client.request({
                method: methods.job.history.job.get,
                params,
            });
        },

        delete: (params: {uid: string}) => {
            return this.client.request({
                method: methods.job.history.job.delete,
                params,
            });
        },
    };
}
