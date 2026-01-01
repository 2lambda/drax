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

    /**
     * Query printer objects
     * @param objs
     */
    query(objs: Record<string, string[]>) {
        return this.client.request({
            method: methods.printer.objects.query,
            params: {
                objects: objs,
            },
        });
    }

    /**
     * Subscribe to printer objects
     * @param objs
     */
    subscribe(objs: Record<string, string[]>) {
        return this.client.request({
            method: methods.printer.objects.subscribe,
            params: {
                objects: objs,
            },
        });
    }

    endstops() {
        return this.client.request({
            method: methods.printer.endstops,
        });
    }

    gcode = {
        run: (gcode: string) => {
            return this.client.request({
                method: methods.printer.gcode.run,
                params: {
                    script: gcode,
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
        start: (name: string) => {
            return this.client.request({
                method: methods.printer.job.start,
                params: {
                    filename: name,
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
