import moonrakerClient from "../index.ts";
import methods from "../util/constants.ts";
export default class File {
    constructor(private client: moonrakerClient) {}

    list = {
        files: (params: {root?: string
    }) => {
            return this.client.request({
                method: methods.files.list.files,
                ...(params !== undefined ? { params } : {}),
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
            get: (params: {filename: string}) => {
                return this.client.request({
                    method: methods.files.metadata.get,
                    params,
                });
            },
            scan: (params: {filename: string}) => {
                return this.client.request({
                    method: methods.files.metadata.scan,
                    params
                });
            },
        },
        thumbnail: (params: {filename: string}) => {
            return this.client.request({
                method: methods.files.metadata.get,
                params
            });
        },
    };
    directory = {
        info: (params: {path: string, extended: boolean}) => {
            const {path="gcodes", extended=true} = params;
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
        delete: (params: {path: string, force: boolean }) => {
            const {path, force=false} = params;
            return this.client.request({
                method: methods.files.directory.delete,
                params: { path, force },
            });
        },
    };
    items = {
        copy: (params: { source: string, dest: string }) => {
            return this.client.request({
                method: methods.files.files.copy,
                params,
            });
        },
        move: (params: { source: string, dest: string }) => {
            return this.client.request({
                method: methods.files.files.move,
                params,
            });
        },
        zip: (params: {files: string[], dest: string}) => {
            const {files, dest} = params;
            return this.client.request({
                method: methods.files.files.zip,
                params: {
                    dest,
                    items: files,
                },
            });
        },
    };
    //todo: update this
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
