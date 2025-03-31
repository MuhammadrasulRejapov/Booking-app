export interface Event {
    id?: number;
    name: string;
    date: string;
    location: string;
    capacity: number;
    bookedSeats: number;
    isFullyBooked?: boolean;
    isExpired?: boolean;
  }