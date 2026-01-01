import moonrakerClient from "../index.ts";
import methods from "../util/constants.ts";
export default class File {
    constructor(private client: moonrakerClient) {}

    list = {
        files: (root?: string) => {
            return this.client.request({
                method: methods.files.list.files,
                ...(root !== undefined ? { params: { root: root } } : {}),
            });
        },
        roots: () => {
            return this.client.request({
                method: methods.files.list.roots,
            });
        },
    };

    gcode = {
        metadata: {
            get: (filename: string) => {
                return this.client.request({
                    method: methods.files.metadata.get,
                    params: {
                        filename,
                    },
                });
            },
            scan: (filename: string) => {
                return this.client.request({
                    method: methods.files.metadata.scan,
                    params: {
                        filename,
                    },
                });
            },
        },
        thumbnail: (filename: string) => {
            return this.client.request({
                method: methods.files.metadata.get,
                params: {
                    filename,
                },
            });
        },
    };
    directory = {
        info: (path: string = "gcodes", extended: boolean = true) => {
            return this.client.request({
                method: methods.files.directory.get,
                params: {
                    path,
                    extended,
                },
            });
        },
        create: (path: string) => {
            return this.client.request({
                method: methods.files.directory.create,
                params: {
                    path,
                },
            });
        },
        delete: (path: string, force: boolean = false) => {
            return this.client.request({
                method: methods.files.directory.delete,
                params: { path, force },
            });
        },
    };
    items = {
        copy: (source: string, dest: string) => {
            return this.client.request({
                method: methods.files.files.copy,
                params: { source, dest },
            });
        },
        move: (source: string, dest: string) => {
            return this.client.request({
                method: methods.files.files.move,
                params: { source, dest },
            });
        },
        zip: (files: string[], dest: string) => {
            return this.client.request({
                method: methods.files.files.zip,
                params: {
                    dest,
                    items: files,
                },
            });
        },
    };
    file = {
        download: async (root: string, filename: string): Promise<Blob> => {
            try {
                const res = await fetch(
                    `http://${this.client.host}/server/files/${root}/${filename}`,
                    { method: "GET" },
                );
                return await res.blob();
            } catch (e) {
                throw new Error(`Error\n${e}`);
            }
        },
        upload: (
            file: Blob,
            root?: string,
            path?: string,
            checksum?: string,
            print?: boolean,
        ) => {
            const form = new FormData();
            form.append("file", file);
            if (root !== undefined) {
                form.append("root", root);
            }
            if (path !== undefined) {
                form.append("path", path);
            }
            if (checksum !== undefined) {
                form.append("checksum", checksum);
            }
            if (print !== undefined) {
                form.append("print", print ? "true" : "false");
            } //this is so stupid but i dont like seeing errors in my IDE
            const call = fetch(
                `${this.client.accesspoints.http}server/files/upload`,
                { method: "POST", body: form },
            );
            call.then((res) => {
                return {
                    ok: res.ok,
                    data: res.json,
                };
            });
        },
    };
}
