import type { Methods } from "./Methods.ts";
import type { Options } from "./Options.ts";

/** */
export interface Endpoint {
	method: Methods;
	fn: (option: Options) => Response | Promise<Response>;
}
