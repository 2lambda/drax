import File from "./modules/files.ts";
import Printer from "./modules/printer.ts";
import Server from "./modules/server.ts";
import System from "./modules/system.ts";
import Auth from "./modules/auth.ts";
import Database from "./modules/database.ts";
import Job from "./modules/job.ts";
import Announcement from "./modules/announcements.ts";
import Devices from "./modules/devices.ts";
import Extensions from "./modules/extensions.ts";
import Integrations from "./modules/integrations.ts";

import { rng } from "./util/functions.ts";
import type { request } from "./util/types";

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
    public auth: Auth;
    public database: Database;
    public job: Job;
    public announcement: Announcement;
    public devices: Devices;
    public extensions: Extensions;
    public integrations: Integrations;
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

    private debugLog(message: string): void {
        if (this.debug) {
            console.log(message);
        }
    }

    /**
     * Request and send data from the websocket.
     * @param data
     */

    async request(data: request) {
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
     * Send is the same as Request, except it basically just fires something and forgets.
     * @param data
     */
    send(data: request) {
        this.socket.send(JSON.stringify(data));
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
        },
    ) {
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
        this.debugLog(`connecting to ${this.accesspoints.ws}`);
        this.socket = new WebSocket(
            !secure
                ? `ws://${this.host}/websocket`
                : `wss://${this.host}/websocket`,
        );
        this.socket.addEventListener("open", () => {
            this.ready = true;
            this.debugLog(`${this.accesspoints.ws} connected`);
        });

        this.server = new Server(this);
        this.printer = new Printer(this);
        this.file = new File(this);
        this.system = new System(this);
        this.auth = new Auth(this);
        this.database = new Database(this);
        this.job = new Job(this);
        this.announcement = new Announcement(this);
        this.devices = new Devices(this);
        this.extensions = new Extensions(this);
        this.integrations = new Integrations(this);

        this.socket.addEventListener("message", (message) => {
            const data = JSON.parse(message.data);
            const pending = this.pending.get(data.id);
            if (pending) {
                pending.resolve(data);
            }
            this.debugLog("moonraker has sent a message");
        });
    }
}
