import { Methods } from "./Methods.ts";
import {Options} from "./Options.ts";

/**
 * 
 */
export interface Endpoint {
    method: Methods,
    fn: (option: Options) => Response
}