import methods from "../util/constants.ts";
import moonrakerClient from "../index.ts";
import type { appType } from "../util/types.ts";

export default class Server {
    constructor(private client: moonrakerClient) {}

    /**
     * Get information about the server
     */
    info = () => {
        return this.client.request({
            method: methods.server.info,
        });
    };

    /**
     * Get moonraker.conf (or cfg, im not sure which it is)
     */
    config = () => {
        return this.client.request({
            method: methods.server.config,
        });
    };

    /**
     * Get cached data
     */
    cached = {
        /**
         * Get cached temperature data
         * @param params
         */
        temperature: (params: { include_monitors?: boolean }) => {
            const { include_monitors = false } = params;
            return this.client.request({
                method: methods.server.cached.temperature,
                params: {
                    include_monitors,
                },
            });
        },

        gcode: (params: { count: number }) => {
            return this.client.request({
                method: methods.server.cached.gcode,
                params: {
                    count: params.count,
                },
            });
        },
    };

    /**
     * Requests a manual rollover for log files registered with Moonraker's log management facility. Currently these are limited to moonraker.log and klippy.log.
     * @param params
     */
    rollover = (params: { app: "moonraker" | "klipper" | "all" }) => {
        return this.client.request({
            method: methods.server.rollover,
            params: {
                application: params.app,
            },
        });
    };

    /**
     * Restart server
     *
     */
    restart = () => {
        return this.client.request({
            method: methods.server.restart,
        });
    };

    /**
     * Identify this client to Moonraker
     * @param params
     */
    identify = (params: {
        name: string;
        version: string;
        appType: appType /** what type of application your app is */;
        url: string;
        token?: string /** */;
        key?: string;
    }) => {
        return this.client.request({
            method: methods.server.id,
            params: {
                client_name: params.name,
                version: params.version,
                type: params.appType,
                url: params.url,
                ...(params.token !== undefined && {
                    access_token: params.token,
                }),
                ...(params.key !== undefined && { api_key: params.key }),
            },
        });
    };
}
