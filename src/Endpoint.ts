import type { Methods } from "./Methods.ts";
import type { Options } from "./Options.ts";

/**
 * Interface of each endpoints
 */
export interface Endpoint {
	method: Methods;
	fn: (option: Options) => Response | Promise<Response>;
}
