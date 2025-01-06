import { Methods } from "./Methods.ts";
import {Options} from "./Options.ts";
import Route from "./Route.ts";

export default class Server {
    private static _instance: Server;
    private _route: Route;


    public static start(): Server {
        return this._instance || (this._instance = new this);
    }
    constructor() {
        this._route = Route.route();
        Deno.serve(this._route.handler.bind(this._route));
    }

    public get(path: string, func: (option: Options) => Response): void {
        this._route.path(path, Methods.GET, func)
    }
    public post(path: string, func: (option: Options) => Response): void {
        this._route.path(path, Methods.POST, func)
    }
    public head(path: string, func: (option: Options) => Response): void {
        this._route.path(path, Methods.HEAD, func)
    }

    public put(path: string, func: (option: Options) => Response): void {
        this._route.path(path, Methods.PUT, func)
    }

    public delete(path: string, func: (option: Options) => Response): void {
        this._route.path(path, Methods.DELETE, func)
    }

    public connect(path: string, func: (option: Options) => Response): void {
        this._route.path(path, Methods.CONNECT, func)
    }

    public options(path: string, func: (option: Options) => Response): void {
        this._route.path(path, Methods.OPTIONS, func)
    }

    public trace(path: string, func: (option: Options) => Response): void {
        this._route.path(path, Methods.TRACE, func)
    }

    public patch(path: string, func: (option: Options) => Response): void {
        this._route.path(path, Methods.PATCH, func)
    }
}