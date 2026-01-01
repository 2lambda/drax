import moonrakerClient from "../index";
import methods from "../util/constants";
export default class Webcam {
    constructor(private client: moonrakerClient) {}

    list() {
        return this.client.request({
            method: methods.webcam.list,
        });
    }

    info(uid: string) {
        return this.client.request({
            method: methods.webcam.individual.get,
            params: { uid },
        });
    }

    post(options: {
        uid?: string;
        name: string;
        location?: string;
        icon?: string;
        enabled?: boolean;
        service?: string;
        target_fps?: number;
        target_fps_idle?: number;
        stream_url: string;
        snapshot_url?: string;
        flip_horizontal?: boolean;
        flip_vertical?: boolean;
        rotation?: number;
        aspect_ratio?: string;
        extra_data?: object;
    }) {
        let parameters: Record<string, unknown> = {};
        for (const [i, v] of Object.entries(options)) {
            if (v !== undefined) {
                parameters[i] = v;
            }
        }
        return this.client.request({
            method: methods.webcam.individual.post,
            params: parameters,
        });
    }

    delete(uid: string) {
        return this.client.request({
            method: methods.webcam.individual.delete,
            params: { uid },
        });
    }

    test(uid: string) {
        return this.client.request({
            method: methods.webcam.individual.test,
            params: { uid },
        });
    }
}
