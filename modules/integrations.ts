import moonrakerClient from "../index";
import methods from "../util/constants";

export default class Integrations {
    constructor(private client: moonrakerClient) {}
    apprise = {
        list: () => {
            return this.client.send({
                method: methods.apprise.list,
            });
        },

        test: (name: string) => {
            return this.client.send({
                method: methods.apprise.test,
                params: { name },
            });
        },
    };
    spoolman = {
        status: () => {
            return this.client.send({
                method: methods.spoolman.status,
            });
        },

        set: (spool_id: number | null) => {
            return this.client.send({
                method: methods.spoolman.set,
                params: { spool_id },
            });
        },

        get: () => {
            return this.client.send({
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

            return this.client.send({
                method: methods.spoolman.proxy,
                params: params,
            });
        },
    };

    estimator = {
        get: () => {
            return this.client.send({
                method: methods.estimate.status,
            });
        },

        preform: (filename: string, estimator_config?: string) => {
            return this.client.send({
                method: methods.estimate.estimate,
                params: {
                    filename,
                    ...(estimator_config !== undefined
                        ? { estimator_config }
                        : {}),
                },
            });
        },

        process: (
            filename: string,
            estimator_config?: string,
            force?: boolean,
        ) => {
            return this.client.send({
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

        dump: (dest_config?: string) => {
            return this.client.send({
                method: methods.estimate.DUMP,
                ...(dest_config !== undefined
                    ? { params: { dest_config } }
                    : {}),
            });
        },
    };

    td1 = {
        get: () => {
            return this.client.send({
                method: methods.td1.get,
            });
        },
        reset: (serial: string) => {
            return this.client.send({
                method: methods.td1.reset,
                params: { serial },
            });
        },
    };
}
