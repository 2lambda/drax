//! IMPORTANT
//! BACKUP CAN AND WILL MESS UP YOUR DATABASE IF YOU ARE NOT METHODICAL WITH IT
//! ONCE AGAIN, I AM **NOT** RESPONSIBLE FOR WHATEVER YOU DO
//! SEE README.MD'S Important SECTION FOR MORE INFORMATION
//! IMPORTANT
import moonrakerClient from "../index.ts";
import methods from "../util/constants.ts";
export default class File {
    constructor(private client: moonrakerClient) {}
    list() {
        return this.client.send({
            method: methods.database.list,
        });
    }

    item = {
        create: (namespace: string, key: string | string[], value: any) => {
            return this.client.send({
                method: methods.database.item.create,
                params: { namespace, key, value },
            });
        },

        delete: (namespace: string, key: string | string[]) => {
            return this.client.send({
                method: methods.database.item.delete,
                params: { namespace, key },
            });
        },
    };

    manage = {
        compact: () => {
            return this.client.send({
                method: methods.database.manage.compact,
            });
        },
        backup: {
            create: (filename: string) => {
                return this.client.send({
                    method: methods.database.manage.backup.backup,
                    params: {
                        filename,
                    },
                });
            },
            /**
             * BE CAREFUL WITH THIS!
             * THIS WILL RESTORE YOUR SQLITE DATABASE
             * @param filename {string} - Name of SQLiTE backup to restore
             */
            restore: (filename: string) => {
                return this.client.send({
                    method: methods.database.manage.backup.restore,
                    params: { filename },
                });
            },
            delete: (filename: string) => {
                return this.client.send({
                    method: methods.database.manage.backup.delete,
                    params: { filename },
                });
            },
        },
    };

    debug = {
        list: () => {
            return this.client.send({
                method: methods.database.debug.list,
            });
        },

        delete: (namespace: string, key: string | string[]) => {
            return this.client.send({
                method: methods.database.debug.delete,
                params: { namespace, key },
            });
        },

        add: (namespace: string, key: string | string[], value: any) => {
            return this.client.send({
                method: methods.database.debug.create,
                params: { namespace, key, value },
            });
        },

        get: (namespace: string, key: string | string[]) => {
            return this.client.send({
                method: methods.database.debug.get,
                params: { namespace, key },
            });
        },

        table: (table: string) => {
            return this.client.send({
                method: methods.database.debug.fetchTable,
                params: { table },
            });
        },
    };
}
