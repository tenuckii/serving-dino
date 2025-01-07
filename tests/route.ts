import { assert, assertEquals, assertFalse } from "@std/assert";
import { Methods } from "../src/Methods.ts";
import Route from "../src/Route.ts";

const route: Route = Route.route();

Deno.serve(route.handler.bind(route));


Deno.test(async function noRoute() {
    const response = await fetch("http://localhost:8000/noRoute");
    assertEquals(response.status, 404, "This test if the route is in the hashmap");
    assertFalse(response.ok)
    await response.text();
});

route.path("/wrongMethod", Methods.POST, () => {
    return new Response("this path use a Post as a method");
})

Deno.test(async function wronMethod() {
    let response = await fetch("http://localhost:8000/wrongMethod",{method:"POST"});
    assertEquals(response.status, 200, "receive a 200");
    assert(response.ok)
    await response.text();

    response = await fetch("http://localhost:8000/wronMethod"); //Get by default
    assertEquals(response.status, 404, "receive a 404");
    assertFalse(response.ok)
    await response.text();
})
