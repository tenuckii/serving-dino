export default class Responses {
    static async html(htmlPath: string): Promise<Response>{
        return new Response(await Deno.readTextFile(htmlPath), {
            headers: {
                "Content-Type": "text/html; charset=UTF-8",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
                "Access-Control-Allow-Origin": "*"
            },
        });
    }

    static ok():Response {
        return new Response("", { status: 200 })
    }

    static forbidden(): Response {
        return new Response("", { status: 403 })
    }

    static notFound(): Response {
        return new Response("", { status: 404 })
    }

}