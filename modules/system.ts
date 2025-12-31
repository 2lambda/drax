import methods from "../util/methods.ts";
import moonrakerClient from "../index.ts";

export default class System {
    constructor(private client: moonrakerClient) {}

    info() {
        return this.client.send({
            jsonrpc: "2.0",
            method: methods.system.info,
            
        });
    }

    shutdown() {
        return this.client.send({
            jsonrpc: "2.0",
            method: methods.system.shutdown,
            
        });
    }

    restart() {
        return this.client.send({
            jsonrpc: "2.0",
            method: methods.system.restart,
            
        });
    }

    /**
     * Manage systemd services
     */
    service = {
        restart: (svc: string) => {
            return this.client.send({
                jsonrpc: "2.0",
                method: methods.system.service.restart,
                params: {
                    service: svc,
                },
            });
        },

        stop: (svc: string) => {
            return this.client.send({
                jsonrpc: "2.0",
                method: methods.system.service.stop,
                params: {
                    service: svc,
                },
            });
        },

        start: (svc: string) => {
            return this.client.send({
                jsonrpc: "2.0",
                method: methods.system.service.start,
                params: {
                    service: svc,
                },
            });
        },
    };

    statistics() {
        return this.client.send({
            jsonrpc: "2.0",
            method: methods.system.stats,
            
        });
    }

    sudo = {
        info: () => {
            return this.client.send({
                jsonrpc: "2.0",
                method: methods.system.sudo.info,
                
            });
        },
        /**
         * if i were you id definitely be careful with this
         * @param set
         */
        password: (set: string) => {
            return this.client.send({
                jsonrpc: "2.0",
                method: methods.system.sudo.password,
                params: { password: set },
            });
        },
    };

    peripherals = {
        usb: () => {
            return this.client.send({
                jsonrpc: "2.0",
                method: methods.system.peripherals.usb,
            })
        },

        serial: () => {
            return this.client.send({
                jsonrpc: "2.0",
                method: methods.system.peripherals.serial,
                
            });
        },

        video: () => {
            return this.client.send({
                jsonrpc: "2.0",
                method: methods.system.peripherals.video,
                
            });
        },

        canbus: (cansocket: string) => {
            return this.client.send({
                jsonrpc: "2.0",
                method: methods.system.peripherals.canbus,
                params: {
                    interface: cansocket,
                },
                
            });
        },
    };
}

