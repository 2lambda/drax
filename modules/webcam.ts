import moonrakerClient from "../index";
import methods from "../util/constants";
export default class Webcam {
    constructor(private client: moonrakerClient) {}

    list(){
        return this.client.send({
            method: methods.webcam.list
        })
    }

    info(uid: string){
        return this.client.send({
            method: methods.webcam.individual.get,
            params: {uid}
        })
    }

    post(parameters: {
        uid?: string,
        name: string,
        location?: string,
        icon?: string,
        enabled?: boolean,
        service?:string,
        target_fps?: number,
        target_fps_idle?: number,
        stream_url:string,
        snapshot_url?:string,
        flip_horizontal?:boolean,
        flip_vertical?:boolean,
        rotation?:number,
        aspect_ratio?:string,
        extra_data?: object
    }){
        let p: Record<string, unknown> = {}
        for (const [i, v] of Object.entries(parameters)) {
            if(v !== undefined){
                p[i] = v;
            }
        }
        return this.client.send({
            method: methods.webcam.individual.post,
            params: p
        })
    }

    delete(uid: string){
        return this.client.send({
            method: methods.webcam.individual.delete,
            params: {uid}
        })
    }

    test(uid: string){
        return this.client.send({
            method: methods.webcam.individual.test,
            params: {uid}
        })
    }
}
