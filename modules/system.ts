import methods from "../util/constants.ts";
import moonrakerClient from "../index.ts";

export default class System {
    constructor(private client: moonrakerClient) {}

    info() {
        return this.client.request({
            method: methods.system.info,
        });
    }

    shutdown() {
        return this.client.request({
            method: methods.system.shutdown,
        });
    }

    restart() {
        return this.client.request({
            method: methods.system.restart,
        });
    }

    /**
     * Manage systemd services
     */
    service = {
        restart: (params: {service: string}) => {
            return this.client.request({
                method: methods.system.service.restart,
                params
            });
        },

        stop: (params: {service: string}) => {
            return this.client.request({
                method: methods.system.service.stop,
                params,
            });
        },

        start: (params: {service: string}) => {
            return this.client.request({
                method: methods.system.service.start,
                params,
            });
        },
    };

    statistics() {
        return this.client.request({
            method: methods.system.stats,
        });
    }

    sudo = {
        info: () => {
            return this.client.request({
                method: methods.system.sudo.info,
            });
        },
        /**
         * if i were you id definitely be careful with this
         */
        password: (params: {password: string}) => {
            return this.client.request({
                method: methods.system.sudo.password,
                params,
            });
        },
    };

    peripherals = {
        usb: () => {
            return this.client.request({
                method: methods.system.peripherals.usb,
            });
        },

        serial: () => {
            return this.client.request({
                method: methods.system.peripherals.serial,
            });
        },

        video: () => {
            return this.client.request({
                method: methods.system.peripherals.video,
            });
        },

        canbus: (params: {interface: string}) => {
            return this.client.request({
                method: methods.system.peripherals.canbus,
                params
            });
        },
    };
}
