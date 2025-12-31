function post(parameters: {
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
    console.log(p);
}


post({name: "x", stream_url: "xyz", aspect_ratio: "4:3"})