import { FlightService } from '../services/flight.service';
import { IGetFlightQuery } from './flight.controller.interface';
const flights = require('../../mock/flights.json');

export default class FlightController {
    async getFlights(event: AWSLambda.APIGatewayEvent) {
        const query = <unknown>event.queryStringParameters as IGetFlightQuery;
        query.preferences = (<any>event.multiValueQueryStringParameters).preferences;
        if (!query.minDate || !query.maxDate) {
            return {
                statusCode: 400,
                message: 'Invalid params',
            };
        }

        const service = new FlightService();
        const filteredFlights = service.getPreferredFlights(flights, {
            ...query,
            minDate: new Date(query.minDate),
            maxDate: new Date(query.maxDate),
        });

        return {
            statusCode: 200,
            body: JSON.stringify(filteredFlights),
        };
    }
}
