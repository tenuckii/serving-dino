export interface Options {
	body: Promise<JSON | string | undefined>;
	headers: Headers;
	request: Request;
}
