export default class Route {
    public handler(_req: Request): Response {
        if (this.dict.size === 0)
            return new Response("Not Found", { status: 404 });

        const entry: endpoint = this.dict.get(new URL(_req.url).pathname)!;

        if ( !entry || entry.method != _req.method)
            return new Response(null, { status: 404 });

        return entry?.fn({ body: this.body(_req), headers: _req.headers, request: _req })
    }

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
    public path(str_path: string, method: Methods, fn: (...args: any) => Response) {
        this.dict.set(str_path, { method, fn })
    }

    public static route():Route {
        return this._instance || (this._instance = new this);
    }
    private constructor() {
        this.dict = new Map();
    }

    private static _instance: Route;
    private dict: Map<string, endpoint>;
}

export enum Methods {
    GET = "GET",
    HEAD = "HEAD",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    CONNECT = "CONNECT",
    OPTIONS = "OPTIONS",
    TRACE = "TRACE",
    PATCH = "PATCH"
}

export interface Options{
    body: Promise<JSON | string | undefined>,
    headers: Headers,
    request: Request
}

interface endpoint {
    method: Methods,
    fn: (...args: any) => Response
}