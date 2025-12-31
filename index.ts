import File from "./modules/files.ts";
import Printer from "./modules/printer.ts";
import Server from "./modules/server.ts";
import System from "./modules/system.ts";
import { rng } from "./util/functions.ts";
import type { request } from "./util/types";
//todo users need to use await in their functions

export default class moonrakerClient {
    /**
     * debug
     * will turn on extra messages
     * @internal
     * @private
     */
    private debug = false;
    /** @internal */
    socket: WebSocket;
    /** @internal */
    public host: string;
    /** @internal */
    public ready: boolean = false;
    /** @internal */
    private used = new Set<number>();
    /**
     * @internal
     */
    private pending = new Map<
        number,
        {
            resolve: (data: any) => void;
            reject: (reason: any) => void;
        }
    >();

    public server: Server;
    public printer: Printer;
    public file: File;
    public system: System;
    /** @internal */
    public accesspoints: {
        ws: string;
        http: string;
    } = {
        ws: "",
        http: "",
    };

    /**
     * @private
     */
    /***************/

    /***********/
    private onReady(): Promise<void> {
        return new Promise((res) => {
            if (this.ready) {
                res();
            } else {
                this.socket.addEventListener("open", () => {
                    res();
                });
            }
        });
    }

    /**
     * send data
     * @param data
     */

    async send(data: request) {
        await this.onReady();
        const id = this.id();
        const message = {
            id,
            ...data,
        };
        this.socket.send(JSON.stringify(data));

        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject });
        });
    }

    /**
     * give socket id number
     */
    id = () => {
        let x: number;
        if (this.used.size >= 9999 - 5) {
            console.warn("[DRAX] overflow of ids\n[DRAX] reinitalizing ws");
            this.rebase("all out of ids :(");
        }
        do {
            x = rng(5, 9999);
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
    private eightysix(reason: string, time: number) {
        this.ready = false;
        this.socket.close(1000, reason);
        setTimeout(() => {
            //websocket has 5 seconds to close
            if (this.socket.readyState !== WebSocket.CLOSED) {
                console.warn(
                    "[DRAX] websocket refused to close by itself, measures taken",
                );
                this.socket.terminate(); // code editors say this will error, it will not
            }
        }, time * 1000);
    }
    /**
     * Reinit websocket
     * @param reason
     * @private
     */
    private rebase(reason: string) {
        this.eightysix(reason, 5);
        this.used.clear();
        this.pending.clear();
        this.socket = new WebSocket(`ws://${this.host}/websocket`);
    }
    /**
     *
     * @param {`${string}:${number}`} host - Moonraker host, should be something like 127.0.0.1:7125
     * @param secure - is this a secure server? if so, the rest server must be HTTPS, and the websocket server must be WSS.
     * @param options - extra options
     */
    constructor(
        host: string,
        secure: boolean = false,
        options?: {
            /**
             * @internal
             */
            debug?: boolean;
        }) {
        if (options?.debug) {
            this.debug = true;
        }
        this.host = `${host}`;
        this.accesspoints.ws = secure
            ? `wss://${this.host}/websocket`
            : `ws://${this.host}/websocket`;
        this.accesspoints.http = secure
            ? `https://${this.host}/`
            : `http://${this.host}`;
        console.log(`connecting to ${this.accesspoints.ws}`);
        this.socket = new WebSocket(
            !secure
                ? `ws://${this.host}/websocket`
                : `wss://${this.host}/websocket`,
        );
        this.socket.addEventListener("open", () => {
            this.ready = true;
            console.log(`connected to moonraker`);
        });
        this.server = new Server(this);
        this.printer = new Printer(this);
        this.file = new File(this);
        this.system = new System(this);
        this.socket.addEventListener("message", (message) => {
            const data = JSON.parse(message.data);
            const pending = this.pending.get(data.id);
            if (pending) {
                pending.resolve(data);
            }
            if (this.debug&&data.id){
                console.log(`moonraker has sent a message`)
            }
        });
    }
}

const client = new moonrakerClient("vanilla.local:7125", false, {debug: true});
const a = await client.server.identify(
    "drax",
    "beta",
    "other",
    "https://github.com/2lambda/drax/tree/main",
);
const x = await client.printer.list()
console.log(a, x);
