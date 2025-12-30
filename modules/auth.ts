import moonrakerClient from "../index.ts";
import methods from "../util/methods.ts";
export default class Auth {
    constructor(private client: moonrakerClient) {}

    login(username: string, password: string, source?: string) {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.auth.login,
            params: {
                username, password,
                ...(source!==undefined? {source}:{})
            }
        })
    }


    logout() {
        this.client.send({
            jsonrpc: "2.0",
            method: methods.auth.logout
        })
    }

    getuser(){
        this.client.send({
            jsonrpc: "2.0",
            method: methods.auth.user.current
        })
    }

    usermod = {
        create: (username: string, password: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.auth.manage.create,
                params: {
                    username, password
                }
            })
        },

        delete: (username: string) => {
            this.client.send({
                jsonrpc: "2.0",
                method: methods.auth.manage.create,
                params: {
                    username
                }
            })
        }
    }

    available(){
        this.client.send({
            jsonrpc: "2.0",

        })
    }

}



