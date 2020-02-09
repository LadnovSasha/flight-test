import { IFlightOptions, Flight, IGetFlight, CriteriaOptions, IFlightWithCoeff } from "./flight.service.interface";
const CRUISE_SPEED = 817 // km per hour

export class FlightService {
    protected distanceRange = {
        max: 15000,
        min: 50,
    }

    constructor(protected options: IFlightOptions = { carrierMultiplier: 0.9 }) {}

    getDistanceBetweenAirports(origin: string, dest: string) {
        const { max, min } = this.distanceRange;
        return min + Math.floor((max - min) * Math.random());
    }

    getPreferredFlights(
        flights: Flight[],
        options: IGetFlight,
    ) {
        const filteredFlights = flights.reduce((filtered: IFlightWithCoeff[], flight) => {
            const distance = this.getDistanceBetweenAirports(flight.origin, flight.destination);
            const flightInRange = this.flightAcceptsCriteria(flight, {
                ...options,
                distance,
            });
            if (!flightInRange) {
                return filtered;
            }

            const preferenceCoeff = this.calculatePreference(flight, options.preferences, distance);
            filtered.push({ flight, preferenceCoeff });
            return filtered;
        }, []);

        return filteredFlights.sort((a, b) => a.preferenceCoeff - b.preferenceCoeff);
    }

    protected flightAcceptsCriteria(flight: Flight, options: CriteriaOptions) {
        const arrivalTime = new Date(flight.arrivalTime).getTime();
        const minDate = new Date(options.minDate).getTime();
        const maxDate = new Date(options.maxDate).getTime();

        if (arrivalTime > maxDate || arrivalTime < minDate) {
            return false;
        }

        const maxDistance = FlightService.milesToKm(options.maxDistance);
        if (options.distance > maxDistance) {
            return false;
        }

        const flightDurationInHours = options.distance / CRUISE_SPEED;
        if (flightDurationInHours > options.maxDuration || flightDurationInHours < options.minDuration) {
            return false;
        }

        return true;
    }

    protected calculatePreference(flight: Flight, carrierPreference: string[], distance: number) {
        const flightDurationInHours = distance / CRUISE_SPEED;
        const preferenceCoeff = carrierPreference.includes(flight.carrier) ? this.options.carrierMultiplier : 1;

        return flightDurationInHours * preferenceCoeff + distance;
    }

    static milesToKm(mile: number) {
        return mile * 1.60934;
    }
}
