import moonrakerClient from "../index.ts";
import methods from "../util/constants.ts";
export default class Auth {
    constructor(private client: moonrakerClient) {}

    login(username: string, password: string, source?: string) {
        return this.client.send({
            method: methods.auth.login,
            params: {
                username,
                password,
                ...(source !== undefined ? { source } : {}),
            },
        });
    }

    logout() {
        return this.client.send({
            method: methods.auth.logout,
        });
    }

    getuser() {
        return this.client.send({
            method: methods.auth.user.current,
        });
    }

    usermod = {
        create: (username: string, password: string) => {
            return this.client.send({
                method: methods.auth.manage.create,
                params: {
                    username,
                    password,
                },
            });
        },

        delete: (username: string) => {
            return this.client.send({
                method: methods.auth.manage.create,
                params: {
                    username,
                },
            });
        },
    };

    available() {
        return this.client.send({
            methods: methods.auth.list,
        });
    }

    resetPassword(password: string, newPassword: string) {}
}
