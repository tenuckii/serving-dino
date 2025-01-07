export default class Responses {
	/**
	 * Initialize a response with html
	 * @param htmlPath path for the html file.
	 * @returns A Response
	 */
	static async html(htmlPath: string): Promise<Response> {
		return new Response(await Deno.readTextFile(htmlPath), {
			headers: {
				"Content-Type": "text/html; charset=UTF-8",
				"Access-Control-Request-Headers": "*",
				"Access-Control-Request-Method": "*",
				"Access-Control-Allow-Origin": "*",
			},
		});
	}

	/**
	 * Initialize a response code
	 * @returns A 200 status code
	 */
	static ok(): Response {
		return new Response("", { status: 200 });
	}

	/**
	 * Initialize a response code
	 * @returns A 403 status code
	 */
	static forbidden(): Response {
		return new Response("", { status: 403 });
	}

	/**
	 * Initialize a response code
	 * @returns A 404 status code
	 */
	static notFound(): Response {
		return new Response("", { status: 404 });
	}
}
