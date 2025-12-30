import methods from "../util/methods.ts";
import moonrakerClient from "../index.ts";
export default class Printer {
    constructor(private client: moonrakerClient) {}
    /**
     * Emergency stop printer
     */
    stop() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.printer.stop,
            id: this.client.id,
        });
    }

    /**
     * Soft restart klipper
     */
    hostRestart() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.printer.restart,
            id: this.client.id
        });
    }

    /**
     * Restart klipper's firmware
     */
    fwRestart() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.printer.firmwareRestart,
            id: this.client.id,
        });
    }

    /**
     * List printer objects
     */

    list() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.printer.objects.list,
            id: this.client.id,
        });
    }

    /**
     * Query printer objects
     * @param objs
     */
    query(objs: Record<string, string[]>) {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.printer.objects.query,
            params: {
                objects: objs,
            },
            id: this.client.id,
        });
    }

    /**
     * Subscribe to printer objects
     * @param objs
     */
    subscribe(objs: Record<string, string[]>) {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.printer.objects.subscribe,
            params: {
                objects: objs,
            },
            id: this.client.id,
        });
    }

    endstops() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.printer.endstops,
            id: this.client.id,
        });
    }

    gcode = {
        run: (gcode: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.printer.gcode.run,
                params: {
                    script: gcode,
                },
                id: this.client.id,
            });
        },

        help: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.printer.gcode.help,
                id: this.client.id,
            });
        },
    };

    job = {
        start: (name: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.printer.job.start,
                params: {
                    filename: name,
                },
                id: this.client.id,
            });
        },

        pause: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.printer.job.pause,
                id: this.client.id,
            });
        },

        resume: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.printer.job.resume,
                id: this.client.id,
            });
        },

        cancel: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.printer.job.cancel,
                id: this.client.id,
            });
        },
    };
}