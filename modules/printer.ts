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
            
        });
    }

    /**
     * List printer objects
     */

    list() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.printer.objects.list,
            
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
            
        });
    }

    endstops() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.printer.endstops,
            
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
                
            });
        },

        help: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.printer.gcode.help,
                
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
                
            });
        },

        pause: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.printer.job.pause,
                
            });
        },

        resume: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.printer.job.resume,
                
            });
        },

        cancel: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.printer.job.cancel,
                
            });
        },
    };
}