"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flight_contoller_1 = require("./flight.contoller");
const instance = new flight_contoller_1.default();
module.exports = {
    getFlights(event, ctx) {
        return instance.getFlights(event, ctx);
    }
};
//# sourceMappingURL=handler.js.map