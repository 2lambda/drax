import methods from "../util/methods.ts";
import moonrakerClient from "../index.ts";

export default class System {
    constructor(private client: moonrakerClient) {}

    info() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.system.info,
            
        });
    }

    shutdown() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.system.shutdown,
            
        });
    }

    restart() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.system.restart,
            
        });
    }

    /**
     * Manage systemd services
     */
    service = {
        restart: (svc: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.system.service.restart,
                params: {
                    service: svc,
                },
            });
        },

        stop: (svc: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.system.service.stop,
                params: {
                    service: svc,
                },
            });
        },

        start: (svc: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.system.service.start,
                params: {
                    service: svc,
                },
            });
        },
    };

    statistics() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.system.stats,
            
        });
    }

    sudo = {
        info: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.system.sudo.info,
                
            });
        },
        /**
         * if i were you id definitely be careful with this
         * @param set
         */
        password: (set: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.system.sudo.password,
                params: { password: set },
            });
        },
    };

    peripherals = {
        usb: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.system.peripherals.usb,
            })
        },

        serial: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.system.peripherals.serial,
                
            });
        },

        video: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.system.peripherals.video,
                
            });
        },

        canbus: (cansocket: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.system.peripherals.canbus,
                params: {
                    interface: cansocket,
                },
                
            });
        },
    };
}

