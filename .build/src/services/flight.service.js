"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CRUISE_SPEED = 817; // km per hour
class FlightService {
    constructor(options = { carrierMultiplier: 0.9 }) {
        this.options = options;
        this.distanceRange = {
            max: 15000,
            min: 50,
        };
    }
    getDistanceBetweenAirports(origin, dest) {
        const { max, min } = this.distanceRange;
        return min + Math.floor((max - min) * Math.random());
    }
    getPreferredFlights(flights, options) {
        const filteredFlights = flights.reduce((filtered, flight) => {
            const distance = this.getDistanceBetweenAirports(flight.origin, flight.destination);
            const flightInRange = this.flightAcceptsCriteria(flight, Object.assign(Object.assign({}, options), { distance }));
            if (!flightInRange) {
                return filtered;
            }
            const preferenceCoeff = this.calculatePreference(flight, options.preferences, distance);
            filtered.push({ flight, preferenceCoeff });
            return filtered;
        }, []);
        return filteredFlights.sort((a, b) => a.preferenceCoeff - b.preferenceCoeff);
    }
    flightAcceptsCriteria(flight, options) {
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
    calculatePreference(flight, carrierPreference, distance) {
        const flightDurationInHours = distance / CRUISE_SPEED;
        const preferenceCoeff = carrierPreference.includes(flight.carrier) ? this.options.carrierMultiplier : 1;
        return flightDurationInHours * preferenceCoeff + distance;
    }
    static milesToKm(mile) {
        return mile * 1.60934;
    }
}
exports.FlightService = FlightService;
//# sourceMappingURL=flight.service.js.map