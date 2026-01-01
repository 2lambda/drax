import moonrakerClient from "../index";
import methods from "../util/constants";

export default class Extensions {
    constructor(private client: moonrakerClient) {}

    list() {
        return this.client.request({
            method: methods.extensions.list,
        });
    }

    call(agent: string, method: string, args: any[] | object) {
        return this.client.request({
            method: methods.extensions.call,
            params: {
                agent,
                method,
                arguments: args,
            },
        });
    }

    agent = {
        send: (event: string, data: any) => {
            return this.client.request({
                method: methods.extensions.agent.send,
                params: {
                    event,
                    data,
                },
            });
        },

        register: (method_name: string) => {
            return this.client.request({
                method: methods.extensions.agent.register,
                params: {
                    method_name,
                },
            });
        },
    };
}
