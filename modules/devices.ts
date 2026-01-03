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
            get: (params: {device: string}) => {
                return this.client.request({
                    method: methods.devices.power.state.get,
                    params,
                });
            },

            set: (params: {device: string, action: string}) => {
                return this.client.request({
                    method: methods.devices.power.state.set,
                    params,
                });
            },
        },

        batch: {
            status: (params: {devices: string[]}) => {
                return this.client.request({
                    method: methods.devices.power.batch.get,
                    params: Object.fromEntries(params.devices.map((i) => [i, null])),
                });
            },
            power: {
                on: (params: {devices: string[]}) => {
                    return this.client.request({
                        method: methods.devices.power.batch.on,
                        params: Object.fromEntries(
                            params.devices.map((i) => [i, null]),
                        ),
                    });
                },

                off: (params: {devices: string[]}) => {
                    return this.client.request({
                        method: methods.devices.power.batch.off,
                        params: Object.fromEntries(
                            params.devices.map((i) => [i, null]),
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

            status: (params: {devices: string[]}) => {
                return this.client.request({
                    method: methods.devices.wled.status,
                    params: Object.fromEntries(params.devices.map((i) => [i, null])),
                });
            },
        },

        control: {
            on: (params: {devices: string[]}) => {
                return this.client.request({
                    method: methods.devices.wled.on,
                    params: Object.fromEntries(params.devices.map((i) => [i, null])),
                });
            },
            off: (params: {devices: string[]}) => {
                return this.client.request({
                    method: methods.devices.wled.off,
                    params: Object.fromEntries(params.devices.map((i) => [i, null])),
                });
            },
            toggle: (params: {devices: string[]}) => {
                return this.client.request({
                    method: methods.devices.wled.toggle,
                    params: Object.fromEntries(params.devices.map((i) => [i, null])),
                });
            },
        },

        individual: {
            get: (params: {strip: string}) => {
                return this.client.request({
                    method: methods.devices.wled.get,
                    params,
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
        list: (params: {extended: boolean}) => {
            return this.client.request({
                method: methods.devices.sensor.list,
                ...(params.extended !== undefined && { params }),
            });
        },

        information: (params: {sensor: string, extended?: boolean}) => {
            const { sensor, extended=false } = params;
            return this.client.request({
                method: methods.devices.sensor.info,
                params: {
                    sensor,
                    extended,
                },
            });
        },

        measurements: (params: {sensor?: string    }) => {
            return this.client.request({
                method: methods.devices.sensor.measurements,
                ...(params.sensor !== undefined && { params }),
            });
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
