import methods from "../util/constants.ts";
import moonrakerClient from "../index.ts";
export default class Printer {
    constructor(private client: moonrakerClient) {}
    /**
     * Emergency stop printer
     */
    stop() {
        return this.client.request({
            method: methods.printer.stop,
        });
    }

    /**
     * Soft restart klipper
     */
    hostRestart() {
        return this.client.request({
            method: methods.printer.restart,
        });
    }

    /**
     * Restart klipper's firmware
     */
    fwRestart() {
        return this.client.request({
            method: methods.printer.firmwareRestart,
        });
    }

    /**
     * List printer objects
     */

    list() {
        return this.client.request({
            method: methods.printer.objects.list,
        });
    }

    query(params: { objects: Record<string, string[]> }) {
        return this.client.request({
            method: methods.printer.objects.query,
            params,
        });
    }

    /**
     * Subscribe to printer objects
     * @param params
     */
    subscribe(params: { objects: Record<string, string[]> }) {
        return this.client.request({
            method: methods.printer.objects.subscribe,
            params,
        });
    }

    endstops() {
        return this.client.request({
            method: methods.printer.endstops,
        });
    }

    gcode = {
        run: (params: { gcode: string }) => {
            return this.client.request({
                method: methods.printer.gcode.run,
                params: {
                    script: params.gcode,
                },
            });
        },

        help: () => {
            return this.client.request({
                method: methods.printer.gcode.help,
            });
        },
    };

    job = {
        start: (params: { name: string }) => {
            return this.client.request({
                method: methods.printer.job.start,
                params: {
                    filename: params.name,
                },
            });
        },

        pause: () => {
            return this.client.request({
                method: methods.printer.job.pause,
            });
        },

        resume: () => {
            return this.client.request({
                method: methods.printer.job.resume,
            });
        },

        cancel: () => {
            return this.client.request({
                method: methods.printer.job.cancel,
            });
        },
    };
}
