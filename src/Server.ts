import { Methods } from "./Methods.ts";
import type { Options } from "./Options.ts";
import Route from "./Route.ts";
import type ServeTcpOptions from "./ServeTcpOptions.ts";

/**
 * Initialise and run server.
 */
export default class Server {
	private static _instance: Server;
	private _route: Route;
	private _httpServer: Deno.HttpServer<Deno.NetAddr>;
	private running: boolean;

	/**
	 * start a static instance of the server.
	 *
	 * @param options Ability to set port, hostname, reuse port and transport protocol
	 * @returns An instance of the server.
	 */
	public static start(
		options?: ServeTcpOptions,
	): Server {
		return this._instance || (this._instance = new this(options));
	}

	/**
	 * start a base instance of the server.
	 *
	 * @param options Ability to set port, hostname, reuse port and transport protocol
	 * @returns An instance of the server.
	 */
	private constructor(options?: ServeTcpOptions) {
		this._route = Route.route();
		this.running = true;
		if (options === undefined) {
			this._httpServer = Deno.serve(
				this._route.handler.bind(this._route),
			);
		} else {
			this._httpServer = Deno.serve(
				options,
				this._route.handler.bind(this._route),
			);
		}
	}

	/**
	 * True if server actif, False if not.
	 *
	 * @returns A boolean.
	 */
	public active(): boolean {
		return this.running;
	}

	/**
	 * Information about the server.
	 *
	 * @returns port, hostname, reuse port and transport protocol
	 */
	public info(): Deno.NetAddr {
		return this._httpServer.addr;
	}

	/**
	 * Shutdown the server.
	 */
	public shutdown() {
		this._httpServer.shutdown();
		this.running = false;
	}

	/**
	 * Listen to a get request at a certain path
	 *
	 * @param path path to listen to
	 * @param func what to do when fonction is executed
	 * @returns void
	 */
	public get(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.GET, func);
	}

	/**
	 * Listen to a post request at a certain path
	 *
	 * @param path path to listen to
	 * @param func what to do when fonction is executed
	 * @returns void
	 */
	public post(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.POST, func);
	}

	/**
	 * Listen to a head request at a certain path
	 *
	 * @param path path to listen to
	 * @param func what to do when fonction is executed
	 * @returns void
	 */
	public head(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.HEAD, func);
	}

	/**
	 * Listen to a put request at a certain path
	 *
	 * @param path path to listen to
	 * @param func what to do when fonction is executed
	 * @returns void
	 */
	public put(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.PUT, func);
	}

	/**
	 * Listen to a delete request at a certain path
	 *
	 * @param path path to listen to
	 * @param func what to do when fonction is executed
	 * @returns void
	 */
	public delete(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.DELETE, func);
	}

	/**
	 * Listen to a connect request at a certain path
	 *
	 * @param path path to listen to
	 * @param func what to do when fonction is executed
	 * @returns void
	 */
	public connect(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.CONNECT, func);
	}

	/**
	 * Listen to a options request at a certain path
	 *
	 * @param path path to listen to
	 * @param func what to do when fonction is executed
	 * @returns void
	 */
	public options(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.OPTIONS, func);
	}

	/**
	 * Listen to a trace request at a certain path
	 *
	 * @param path path to listen to
	 * @param func what to do when fonction is executed
	 * @returns void
	 */
	public trace(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.TRACE, func);
	}

	/**
	 * Listen to a patch request at a certain path
	 *
	 * @param path path to listen to
	 * @param func what to do when fonction is executed
	 * @returns void
	 */
	public patch(
		path: string,
		func: (option: Options) => Response | Promise<Response>,
	): void {
		this._route.path(path, Methods.PATCH, func);
	}
}
