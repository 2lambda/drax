import methods from "../util/methods.ts";
import moonrakerClient from "../index.ts";
export default class Printer {
    constructor(private client: moonrakerClient) {}
    /**
     * Emergency stop printer
     */
    stop() {
        return this.client.send({
            method: methods.printer.stop,
        });
    }

    /**
     * Soft restart klipper
     */
    hostRestart() {
        return this.client.send({
            method: methods.printer.restart,
            id: this.client.id,
        });
    }

    /**
     * Restart klipper's firmware
     */
    fwRestart() {
        return this.client.send({
            method: methods.printer.firmwareRestart,
        });
    }

    /**
     * List printer objects
     */

    list() {
        return this.client.send({
            method: methods.printer.objects.list,
        });
    }

    /**
     * Query printer objects
     * @param objs
     */
    query(objs: Record<string, string[]>) {
        return this.client.send({
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
        return this.client.send({
            method: methods.printer.objects.subscribe,
            params: {
                objects: objs,
            },
        });
    }

    endstops() {
        return this.client.send({
            method: methods.printer.endstops,
        });
    }

    gcode = {
        run: (gcode: string) => {
            return this.client.send({
                method: methods.printer.gcode.run,
                params: {
                    script: gcode,
                },
            });
        },

        help: () => {
            return this.client.send({
                method: methods.printer.gcode.help,
            });
        },
    };

    job = {
        start: (name: string) => {
            return this.client.send({
                method: methods.printer.job.start,
                params: {
                    filename: name,
                },
            });
        },

        pause: () => {
            return this.client.send({
                method: methods.printer.job.pause,
            });
        },

        resume: () => {
            return this.client.send({
                method: methods.printer.job.resume,
            });
        },

        cancel: () => {
            return this.client.send({
                method: methods.printer.job.cancel,
            });
        },
    };
}
