import methods from "../util/methods.ts";
import moonrakerClient from "../index.ts";

export default class System {
    constructor(private client: moonrakerClient) {}

    info() {
        return this.client.send({
            method: methods.system.info,
        });
    }

    shutdown() {
        return this.client.send({
            method: methods.system.shutdown,
        });
    }

    restart() {
        return this.client.send({
            method: methods.system.restart,
        });
    }

    /**
     * Manage systemd services
     */
    service = {
        restart: (service: string) => {
            return this.client.send({
                method: methods.system.service.restart,
                params: {
                    service: service,
                },
            });
        },

        stop: (service: string) => {
            return this.client.send({
                method: methods.system.service.stop,
                params: {
                    service: service,
                },
            });
        },

        start: (service: string) => {
            return this.client.send({
                method: methods.system.service.start,
                params: {
                    service: service,
                },
            });
        },
    };

    statistics() {
        return this.client.send({
            method: methods.system.stats,
        });
    }

    sudo = {
        info: () => {
            return this.client.send({
                method: methods.system.sudo.info,
            });
        },
        /**
         * if i were you id definitely be careful with this
         * @param set
         */
        password: (set: string) => {
            return this.client.send({
                method: methods.system.sudo.password,
                params: { password: set },
            });
        },
    };

    peripherals = {
        usb: () => {
            return this.client.send({
                method: methods.system.peripherals.usb,
            });
        },

        serial: () => {
            return this.client.send({
                method: methods.system.peripherals.serial,
            });
        },

        video: () => {
            return this.client.send({
                method: methods.system.peripherals.video,
            });
        },

        canbus: (cansocket: string) => {
            return this.client.send({
                method: methods.system.peripherals.canbus,
                params: {
                    interface: cansocket,
                },
            });
        },
    };
}
