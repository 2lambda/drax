import moonrakerClient from "../index";
import methods from "../util/constants";

export default class Integrations {
    constructor(private client: moonrakerClient) {}
    apprise = {
        list: () => {
            return this.client.request({
                method: methods.apprise.list,
            });
        },

        test: (params: {name: string}) => {
            return this.client.request({
                method: methods.apprise.test,
                params,
            });
        },
    };
    spoolman = {
        status: () => {
            return this.client.request({
                method: methods.spoolman.status,
            });
        },

        set: (params: {spool_id: number | null
}) => {
            return this.client.request({
                method: methods.spoolman.set,
                params,
            });
        },

        get: () => {
            return this.client.request({
                method: methods.spoolman.get,
            });
        },
        proxy: (options: {
            use_v2_response?: boolean;
            request_method: string;
            path: string;
            query?: string;
            body?: string;
        }) => {
            const params = {
                ...(options.use_v2_response !== undefined && {
                    qos: options.use_v2_response,
                }),
                request_method: options.request_method,
                path: options.path,
                ...(options.query !== undefined && { qos: options.query }),
                ...(options.body !== undefined && { body: options.body }),
            };

            return this.client.request({
                method: methods.spoolman.proxy,
                params,
            });
        },
    };

    estimator = {
        get: () => {
            return this.client.request({
                method: methods.estimate.status,
            });
        },

        preform: (params: {filename: string, estimator_config?: string
    }) => {
            const { filename, estimator_config } = params;
            return this.client.request({
                method: methods.estimate.estimate,
                params: {
                    filename,
                    ...(estimator_config !== undefined
                        ? { estimator_config }
                        : {}),
                },
            });
        },

        process: (params:{
            filename: string,
            estimator_config?: string,
            force?: boolean,}
        ) => {
            const {filename, estimator_config, force} = params;
            return this.client.request({
                method: methods.estimate.process,
                params: {
                    filename,
                    ...(estimator_config !== undefined
                        ? { estimator_config }
                        : {}),
                    ...(force !== undefined ? { force } : {}),
                },
            });
        },

        dump: (params: {dest_config?: string
    }) => {
            const {dest_config} = params;
            return this.client.request({
                method: methods.estimate.DUMP,
                ...(dest_config !== undefined
                    ? { params: { dest_config } }
                    : {}),
            });
        },
    };

    td1 = {
        get: () => {
            return this.client.request({
                method: methods.td1.get,
            });
        },
        reset: (params: {serial: string}) => {
            return this.client.request({
                method: methods.td1.reset,
                params,
            });
        },
    };
}
