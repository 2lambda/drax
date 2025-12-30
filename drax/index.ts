import methods from "./util/methods.ts";
import File from "./modules/files.ts";
import Printer from "./modules/printer.ts";
import Server from "./modules/server.ts";
import System from "./modules/system.ts";
import {rng} from "./util/functions.ts";
export default class moonrakerClient {
    socket: WebSocket;
    public host: string;
    public ready: boolean = false;
    private used = new Set<number>();
    private queue : object[] = []
    public server: Server;
    public printer: Printer;
    public file: File;
    public system: System;

    send(data: object) {
        if(!this.ready){
            this.queue.push(data)
        }
        this.socket.send(JSON.stringify(data));
    }

    /**
     * give socket identification number
     */
    id = () => {
        let x : number;
        if (this.used.size>=9999-5){
            console.warn("[DRAX] overflow of ids\n[DRAX] reinitalizing ws")
            this.rebase("all out of ids :(")
        }
        do {
            x = rng(5,9999)
        } while (this.used.has(x));
        this.used.add(x);
        return x;
    };
    /**
     * https://en.wikipedia.org/wiki/86_(term)
     * @param reason
     * @param time
     * @private
     */
    private eightysix(reason: string, time: number){
        this.ready = false;
        this.socket.close(1000, reason)
        setTimeout(()=>{ //websocket has 5 seconds to close
            if (this.socket.readyState !== WebSocket.CLOSED){
                console.warn("[DRAX] websocket refused to close by itself, measures taken")
                this.socket.terminate()
            }
        },time*1000)
    }
    /**
     * Reinit websocket
     * @param reason
     * @private
     */
    private rebase(reason: string){
        this.eightysix(reason, 5)
        this.used.clear()
        this.socket = new WebSocket(`ws://${this.host}/websocket`);
    }
    /**
     *
     * @param {`${string}:${number}`} host - Moonraker host, should be something like 127.0.0.1:7125
     */
    constructor(host: string) {
        this.host = `${host}`;
        this.socket = new WebSocket(`ws://${host}/websocket`);
        this.socket.addEventListener("open", ()=>{
            this.ready = true;
        })
        this.server = new Server(this);
        this.printer = new Printer(this);
        this.file = new File(this);
        this.system = new System(this);
    }
}

