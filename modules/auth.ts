import moonrakerClient from "../index.ts";
import methods from "../util/constants.ts";
export default class Auth {
    constructor(private client: moonrakerClient) {}

    login(params: {username: string, password: string, source?: string }) {
        const {username, password, source} = params;
        return this.client.request({
            method: methods.auth.login,
            params: {
                username,
                password,
                ...(source !== undefined && { source }),
            },
        });
    }

    logout() {
        return this.client.request({
            method: methods.auth.logout,
        });
    }

    getuser() {
        return this.client.request({
            method: methods.auth.user.current,
        });
    }

    usermod = {
        create: (params: {username: string, password: string}) => {
            const {username, password} = params;
            return this.client.request({
                method: methods.auth.manage.create,
                params: {
                    username,
                    password,
                },
            });
        },

        delete: (params: {username: string}) => {
            const {username} = params;
            return this.client.request({
                method: methods.auth.manage.create,
                params: {
                    username,
                },
            });
        },
    };

    available() {
        return this.client.request({
            method: methods.auth.list,
        });
    }

    resetPassword(params: {password: string, newPassword: string}) {
        return this.client.request({
            method: methods.auth.manage.resetPassword,
            params
        })
    }
}
