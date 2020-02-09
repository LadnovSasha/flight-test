export type Flight = {
    departureTime: string,
    arrivalTime: string,
    carrier: string,
    origin: string,
    destination: string,
}

export type IFlightWithCoeff = {
    preferenceCoeff: number;
    flight: Flight;
};

export interface IFlightOptions {
    carrierMultiplier: number;
}

export interface IGetFlight {
    preferences: string[],
    minDate: Date;
    maxDate: Date;
    minDuration: number;
    maxDuration: number;
    maxDistance: number;
}

export type CriteriaOptions = IGetFlight & { distance: number };
