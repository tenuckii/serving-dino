# @tenucki/routing-dino

[![JSR](https://jsr.io/@tenucki/serving-dino)](https://jsr.io/@tenucki/serving-dino)

## Description

@tenucki/routing-dino facilitates the initialization of a tcp server

## Permissions

@tenucki/routing-dino does require one permissions.

--allow-net

## Installation

```bash
deno add jsr:@tenucki/serving-dino
```

### Usage and Examples

```ts
// in ./main.ts
import {Server} from "jsr:@tenucki/serving-dino";
//or
import {Server} from "@tenucki/serving-dino";

const server = Server.start() ;

server.get("/",async () => {
    return await Responses.html("./html/index.html")
})

import {Server, Responses} from "@tenucki/serving-dino";

const server = Server.start() ;

server.get("/",async () => {
    return await Responses.html("./html/index.html")
})

//get body in request
server.post("/helloWorld", async ({body}) => {
    let b = await body;
    console.log(b)
    return Responses.ok();
})
```

## License

MIT
