import moonrakerClient from "../index.ts";
import methods from "../util/methods.ts";
export default class Job {
    constructor(private client: moonrakerClient) {}
    queue = {
        status: () => {
            return this.client.send({});
        },
    };
    history = {};
}
