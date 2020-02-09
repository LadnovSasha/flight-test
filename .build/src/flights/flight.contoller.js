"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const flight_service_1 = require("../services/flight.service");
const flights = require('../../mock/flights.json');
class FlightController {
    getFlights(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = event.queryStringParameters;
            query.preferences = event.multiValueQueryStringParameters.preferences;
            if (!query.minDate || !query.maxDate) {
                return {
                    statusCode: 400,
                    message: 'Invalid params',
                };
            }
            const service = new flight_service_1.FlightService();
            const filteredFlights = service.getPreferredFlights(flights, Object.assign(Object.assign({}, query), { minDate: new Date(query.minDate), maxDate: new Date(query.maxDate) }));
            return {
                statusCode: 200,
                body: JSON.stringify(filteredFlights),
            };
        });
    }
}
exports.default = FlightController;
//# sourceMappingURL=flight.contoller.js.map