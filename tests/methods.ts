
import { Methods } from "../mod.ts";
import { assertNotEquals } from "@std/assert/not-equals";
import { assertEquals } from "@std/assert/equals";


Deno.test(function equal_to_there_value() {
    assertEquals(Methods.GET, "GET");
    assertEquals(Methods.POST, "POST");
    assertEquals(Methods.PATCH, "PATCH");
    assertEquals(Methods.PUT, "PUT");
    assertEquals(Methods.DELETE, "DELETE");
    assertEquals(Methods.CONNECT, "CONNECT");
    assertEquals(Methods.HEAD, "HEAD");
    assertEquals(Methods.OPTIONS, "OPTIONS");
    assertEquals(Methods.TRACE, "TRACE");
});

Deno.test(function not_equal_to_there_value() {
    assertNotEquals(Methods.GET, "GET1");
    assertNotEquals(Methods.POST, "POST2");
    assertNotEquals(Methods.PATCH, "PATCH3");
    assertNotEquals(Methods.PUT, "PUT4");
    assertNotEquals(Methods.DELETE, "DELETE5");
    assertNotEquals(Methods.CONNECT, "CONNECT6");
    assertNotEquals(Methods.HEAD, "HEAD7");
    assertNotEquals(Methods.OPTIONS, "OPTION8");
    assertNotEquals(Methods.TRACE, "TRACE9");
});