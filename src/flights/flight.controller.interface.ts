export interface IGetFlightQuery {
    preferences: string[],
    minDate: string;
    maxDate: string;
    minDuration: number;
    maxDuration: number;
    maxDistance: number;
}
