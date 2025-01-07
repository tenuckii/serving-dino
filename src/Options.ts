/**
 * Options interface for incoming request
 */
export interface Options {
	body: Promise<JSON | string | undefined>;
	headers: Headers;
	request: Request;
}
