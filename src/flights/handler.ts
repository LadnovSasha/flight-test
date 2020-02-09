import FlightController from './flight.contoller';
import { APIGatewayEvent } from 'aws-lambda';
const instance = new FlightController();

module.exports = {
    getFlights(event: APIGatewayEvent) {
        return instance.getFlights(event);
    }
}
