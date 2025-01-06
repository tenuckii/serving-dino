import {Endpoint} from "./Endpoint.ts";
import { Methods } from "./Methods.ts";
import {Options} from "./Options.ts";
/**
 * A class to represent all available routes
 */
export default class Route {
    /** Singlethon instance of the class */
    private static _instance: Route;

    /** Hashmap containing all available routes */
    private dict: Map<string, Endpoint>;
  
    /**
     * Handle all incoming request and execute the correct fonction depending on the request
     * @param _req incomming http request.
     */
    public handler(_req: Request): Response {
        if (this.dict.size === 0)
            return new Response("Not Found", { status: 404 });

        const entry: Endpoint = this.dict.get(new URL(_req.url).pathname)!;

        if ( !entry || entry.method != _req.method)
            return new Response(null, { status: 404 });

        return entry?.fn({ body: this.body(_req), headers: _req.headers, request: _req })
    }

    /**
     * Gets the available format for the body
     * @param _req incomming http request.
     */
    private async body(req: Request): Promise<JSON | string | undefined> {
        const contentType = req.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            try {
                return await req.json();
            } catch (_e) {
                return;
            }
        } else {
            return await req.text();
        }

    }

    /**
     * Update path hashmap with new routes
     * @param strPath path
     * @param method method used by the request.
     * @param fn the function needed for the request.
     */
    public path(strPath: string, method: Methods, fn: (option: Options) => Response) {
        this.dict.set(strPath, { method, fn })
    }

    /**
     * Initializing of the singlethon
     */
    public static route():Route {
        return this._instance || (this._instance = new this);
    }
    private constructor() {
        this.dict = new Map();
    }
}