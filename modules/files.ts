import moonrakerClient from "../index.ts";
import methods from "../util/methods.ts";
export default class File {
    constructor(private client: moonrakerClient) {}

    list = {
        files: (root?: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.files.list.files,
                ...(root !== undefined ? { params: { root: root } } : {}),
                id: this.client.id,
            });
        },
        roots: () => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.files.list.roots,
                id: this.client.id,
            });
        },
    };

    gcode = {
        metadata: {
            get: (filename: string) => {
                this.client.send({
                    jsonrpc: "2.0",
                    method: methods.files.metadata.get,
                    params: {
                        filename,
                    },
                    id: this.client.id,
                });
            },
            scan: (filename: string) => {
                this.client.send({
                    jsonrpc: "2.0",
                    method: methods.files.metadata.scan,
                    params: {
                        filename,
                    },
                    id: this.client.id,
                });
            },
        },
        thumbnail: (filename: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.files.metadata.get,
                params: {
                    filename,
                },
                id: this.client.id,
            });
        },
    };
    directory = {
        info: (path:string="gcodes", extended:boolean=true) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.files.directory.get,
                params: {
                    path,
                    extended,
                },
                id: this.client.id,
            })
        },
        create: (path:string)=>{
            this.client.send({
                jsonrpc: "2.0",
                method: methods.files.directory.create,
                params: {
                    path
                },
                id: this.client.id,
            })
        },
        delete: (path:string,force:boolean=false)=>{
            this.client.send({
                jsonrpc: "2.0",
                method: methods.files.directory.delete,
                params: {path,force},
                id: this.client.id,
            })
        }
    }
    items = {
        copy: (source: string, dest: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.files.files.copy,
                params: {source,dest},
                id: this.client.id,
            })
        },
        move: (source: string, dest: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.files.files.move,
                params: {source,dest},
                id: this.client.id,
            })
        },
        zip: (files: string[], dest: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.files.files.zip,
                params: {
                    dest,
                    items: files
                },
                id: this.client.id,
            })
        }
    }
    file = {
        download: async (root:string, filename: string): Promise<string> => {
            try {
                const res = await fetch(`http://${this.client.host}/server/files/${root}/${filename}`, {method: "GET"})
                return await res.text();
            } catch (e) {
                throw new Error(`Error, ${e}`)
            }

        },
        upload: (file: Blob, root?: string, path?: string, checksum?: string, print?: boolean) => {
            const form = new FormData()
            form.append("file", file)
            if (root!==undefined) {form.append("root", root)}
            if (path!==undefined) {form.append("path", path)}
            if (checksum!==undefined) {form.append("checksum", checksum)}
            if (print!==undefined) {form.append("print", print?"true":"false")} //this is so stupid but i dont like seeing errors in my IDE
            const call = fetch(`http://${this.client.host}/server/files/upload`, {method: "POST", body: form})
            call.then((res) => {
                return {
                    ok: res.ok,
                    data: res.json,
                }
            })
        }
    }
}