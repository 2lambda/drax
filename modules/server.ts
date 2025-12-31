import methods from "../util/methods.ts";
import moonrakerClient from "../index.ts";
import type { appType } from "../util/types.ts";

export default class Server {
    constructor(private client: moonrakerClient) {}

    /**
     * Get information about the server
     */
    info = () => {
        return this.client.send({
            method: methods.server.info,
        });
    };

    /**
     * Get moonraker.conf (or cfg, im not sure which it is)
     */
    config = () => {
        return this.client.send({
            method: methods.server.config,
        });
    };

    /**
     * Get cached data
     */
    cached = {
        /**
         * Get cached temperature data
         * @param include_monitors - Im not sure
         */
        temperature: (include_monitors: boolean = false) => {
            return this.client.send({
                method: methods.server.cached.temperature,
                params: {
                    include_monitors: include_monitors,
                },
            });
        },
        /**
         * Get cached gcode data
         * @param count  	The number of cached gcode responses to return. The default is to return all cached items.
         */
        gcode: (count?: number) => {
            return this.client.send({
                method: methods.server.cached.gcode,
                params: {
                    count: count,
                },
                ...(count !== undefined ? { params: { count } } : {}),
            });
        },
    };

    /**
     * Requests a manual rollover for log files registered with Moonraker's log management facility. Currently these are limited to moonraker.log and klippy.log.
     * @param app
     */
    rollover = (app: "moonraker" | "klipper" | "all" = "all") => {
        return this.client.send({
            method: methods.server.rollover,
            params: {
                application: app,
            },
        });
    };

    /**
     * Restart server
     *
     */
    restart = () => {
        return this.client.send({
            method: methods.server.restart,
        });
    };

    /**
     * Identify this client to Moonraker
     * @param {string} name - Application name
     * @param {string} [version] - Application version
     * @param appType - What the type of the application is.
     * @param {string} url - Application URL
     * @param {string} [token] - Optional access token
     * @param {string} [key] - Optional API key
     */
    identify = (
        name: string,
        version: string,
        appType: appType /** what type of application your app is */,
        url: string,
        token?: string /** */,
        key?: string,
    ) => {
        return this.client.send({
            method: methods.server.id,
            params: {
                client_name: name,
                version: version,
                type: appType,
                url: url,
                ...(token !== undefined && { access_token: token }),
                ...(key !== undefined && { api_key: key }),
            },
        });
    };
}
