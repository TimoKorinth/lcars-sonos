System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var APP_CONFIG;
    return {
        setters:[],
        execute: function() {
            exports_1("APP_CONFIG", APP_CONFIG = {
                SONOS_API_SERVER: "http://minwinpc:5005/",
                SONOS_SOCKETIO_SERVER: "http://minwinpc:5008",
                USE_WEBSOCKET_EVENTS: true,
                FLICKR_API_KEY: "",
                FLICKR_SECRET: "",
                FLICKR_AUTH_TOKEN: ""
            });
        }
    }
});
//# sourceMappingURL=config.js.map