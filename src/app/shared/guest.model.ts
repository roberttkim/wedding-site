export interface AdditionalGuest {
  firstName: string;
  lastName: string;
}

export interface GuestResponse {
  data: Guest;
  success: string;
}

export interface Guest {
  firstName: string;
  lastName: string;
  code: string;
  email: string;
  address: string;
  guestCountMax: number;
  guestCountActual: number;
  responded: boolean;
  attending: boolean;
  additionalGuests: Array<AdditionalGuest>;
}
