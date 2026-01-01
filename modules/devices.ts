import moonrakerClient from "../index";
import methods from "../util/constants";

type wledAction = "on" | "off" | "toggle" | "control";

export default class Devices {
    constructor(private client: moonrakerClient) {}

    power = {
        list: () => {
            return this.client.request({
                method: methods.devices.power.list,
            });
        },

        state: {
            get: (device: string) => {
                return this.client.request({
                    method: methods.devices.power.state.get,
                    params: {
                        device,
                    },
                });
            },

            set: (device: string, action: string) => {
                return this.client.request({
                    method: methods.devices.power.state.set,
                    params: {
                        device,
                        action,
                    },
                });
            },
        },

        batch: {
            status: (devices: string[]) => {
                return this.client.request({
                    method: methods.devices.power.batch.get,
                    params: Object.fromEntries(devices.map((i) => [i, null])),
                });
            },
            power: {
                on: (devices: string[]) => {
                    return this.client.request({
                        method: methods.devices.power.batch.on,
                        params: Object.fromEntries(
                            devices.map((i) => [i, null]),
                        ),
                    });
                },

                off: (devices: string[]) => {
                    return this.client.request({
                        method: methods.devices.power.batch.off,
                        params: Object.fromEntries(
                            devices.map((i) => [i, null]),
                        ),
                    });
                },
            },
        },
    };

    wled = {
        get: {
            strips: () => {
                return this.client.request({
                    method: methods.devices.wled.list,
                });
            },

            status: (devices: string[]) => {
                return this.client.request({
                    method: methods.devices.wled.status,
                    params: Object.fromEntries(devices.map((i) => [i, null])),
                });
            },
        },

        control: {
            on: (devices: string[]) => {
                return this.client.request({
                    method: methods.devices.wled.on,
                    params: Object.fromEntries(devices.map((i) => [i, null])),
                });
            },
            off: (devices: string[]) => {
                return this.client.request({
                    method: methods.devices.wled.off,
                    params: Object.fromEntries(devices.map((i) => [i, null])),
                });
            },
            toggle: (devices: string[]) => {
                return this.client.request({
                    method: methods.devices.wled.toggle,
                    params: Object.fromEntries(devices.map((i) => [i, null])),
                });
            },
        },

        individual: {
            get: (strip: string) => {
                return this.client.request({
                    method: methods.devices.wled.get,
                    params: {
                        strip,
                    },
                });
            },

            control: (options: {
                strip: string;
                action: wledAction;
                preset?: number;
                brightness?: number;
                intensity?: number;
                speed?: number;
            }) => {
                let parameters: Record<string, unknown> = {};
                for (const [i, v] of Object.entries(options)) {
                    if (v !== undefined) {
                        parameters[i] = v;
                    }
                }
                return this.client.request({
                    method: methods.devices.wled.control,
                    params: parameters,
                });
            },
        },
    };

    sensor = {
        list: (extended: boolean = false) => {
            return this.client.request({
                method: methods.devices.sensor.list,
                params: { extended },
            });
        },

        information: (sensor: string, extended: boolean = false) => {
            return this.client.request({
                method: methods.devices.sensor.info,
                params: {
                    sensor,
                    extended,
                },
            });
        },

        measurements: (sensor?: string) => {
            if (sensor !== undefined) {
                return this.client.request({
                    method: methods.devices.sensor.measurements,
                    params: {
                        sensor,
                    },
                });
            } else {
                return this.client.request({
                    method: methods.devices.sensor.measurements,
                });
            }
        },
    };

    mqtt = {
        publish: (options: {
            topic: string;
            payload?: any;
            qos?: 0 | 1 | 2;
            retain?: boolean;
            timeout?: number;
        }) => {
            const parameters = {
                topic: options.topic,
                ...(options.payload !== undefined && {
                    payload: options.payload,
                }),
                ...(options.qos !== undefined && { qos: options.qos }),
                ...(options.retain !== undefined && { retain: options.retain }),
                ...(options.timeout !== undefined && {
                    timeout: options.timeout,
                }),
            };

            return this.client.request({
                method: methods.devices.mqtt.publish,
                params: parameters,
            });
        },
        subscribe: (options: {
            topic: string;
            qos?: number;
            timeout?: number;
        }) => {
            const parameters = {
                topic: options.topic,
                ...(options.qos !== undefined && { qos: options.qos }),
                ...(options.timeout !== undefined && {
                    timeout: options.timeout,
                }),
            };
        },
    };
}
