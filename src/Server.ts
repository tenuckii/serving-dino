import { Methods } from "./Methods.ts";
import type { Options } from "./Options.ts";
import Route from "./Route.ts";

export default class Server {
	private static _instance: Server;
	private _route: Route;
	private http_server: Deno.HttpServer<Deno.NetAddr>;
	private running: boolean;

	public static start(
		options?: Deno.ServeTcpOptions,
	): Server {
		return this._instance || (this._instance = new this(options));
	}
	constructor(options?: Deno.ServeTcpOptions) {
		this._route = Route.route();
		this.running = true;
		if (options === undefined) {
			this.http_server = Deno.serve(
				this._route.handler.bind(this._route),
			);
		} else {
			this.http_server = Deno.serve(
				options,
				this._route.handler.bind(this._route),
			);
		}
	}

	public active(): boolean {
		return this.running;
	}

	public info(): Deno.NetAddr {
		return this.http_server.addr;
	}

	public shutdown() {
		this.http_server.shutdown();
		this.running = false;
	}

	public get(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.GET, func);
	}
	public post(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.POST, func);
	}
	public head(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.HEAD, func);
	}

	public put(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.PUT, func);
	}

	public delete(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.DELETE, func);
	}

	public connect(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.CONNECT, func);
	}

	public options(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.OPTIONS, func);
	}

	public trace(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.TRACE, func);
	}

	public patch(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.PATCH, func);
	}
}
