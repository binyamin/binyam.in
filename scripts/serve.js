const handler = require("serve-handler");
const http = require("http");

class serve {
    #server;
    constructor(dir) {
        this.#server = http.createServer((request, response) => {
            return handler(request, response, { public: dir })
        })

        this.#server.on("close", () => {
            process.exit();
        })
    }

    start(port=3000) {
        this.#server.listen(port, () => {
            console.log(`Server listening on localhost:${port}`);
        })
    }

    stop() {
        this.#server.close();
    }
}

// module.exports = serve;
const srv = new serve("dist");
srv.start();
