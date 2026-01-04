//! IMPORTANT
//! BACKUP CAN AND WILL MESS UP YOUR DATABASE IF YOU ARE NOT METHODICAL WITH IT
//! ONCE AGAIN, I AM **NOT** RESPONSIBLE FOR WHATEVER YOU DO
//! SEE README.MD'S Important SECTION FOR MORE INFORMATION
//! IMPORTANT
import moonrakerClient from "../index.ts";
import methods from "../util/constants.ts";
export default class Database {
    constructor(private client: moonrakerClient) {}
    list() {
        return this.client.request({
            method: methods.database.list,
        });
    }

    item = {
        create: (params: {
            namespace: string;
            key: string | string[];
            value: unknown;
        }) => {
            return this.client.request({
                method: methods.database.item.create,
                params,
            });
        },

        delete: (params: { namespace: string; key: string | string[] }) => {
            return this.client.request({
                method: methods.database.item.delete,
                params,
            });
        },
    };

    manage = {
        compact: () => {
            return this.client.request({
                method: methods.database.manage.compact,
            });
        },
        backup: {
            create: (params: { filename: string }) => {
                return this.client.request({
                    method: methods.database.manage.backup.backup,
                    params,
                });
            },
            /**
             * BE CAREFUL WITH THIS!
             * THIS WILL RESTORE YOUR SQLITE DATABASE
             * @param filename {string} - Name of SQLiTE backup to restore
             */
            restore: (params: { filename: string }) => {
                return this.client.request({
                    method: methods.database.manage.backup.restore,
                    params,
                });
            },
            delete: (params: { filename: string }) => {
                return this.client.request({
                    method: methods.database.manage.backup.delete,
                    params,
                });
            },
        },
    };

    debug = {
        list: () => {
            return this.client.request({
                method: methods.database.debug.list,
            });
        },

        delete: (namespace: string, key: string | string[]) => {
            return this.client.request({
                method: methods.database.debug.delete,
                params: { namespace, key },
            });
        },

        add: (params: {
            namespace: string;
            key: string | string[];
            value: any;
        }) => {
            return this.client.request({
                method: methods.database.debug.create,
                params,
            });
        },

        get: (params: { namespace: string; key: string | string[] }) => {
            return this.client.request({
                method: methods.database.debug.get,
                params,
            });
        },

        table: (params: { table: string }) => {
            return this.client.request({
                method: methods.database.debug.fetchTable,
                params,
            });
        },
    };
}
