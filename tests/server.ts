import { assert, assertEquals, assertFalse } from "@std/assert";
import { Server } from "../mod.ts";


const server: Server = Server.start();

Deno.test(function server_is_active() {
    assert(server.active())
});

Deno.test(function default_server_info() {
    assertEquals(server.info().port, 8000)
    assertEquals(server.info().hostname, "0.0.0.0")
});