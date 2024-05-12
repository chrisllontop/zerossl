export type VerificationStatusRequest = {
  /** Internal certificate ID, also referred to as certificate hash. */
  id: string;
};

export type VerificationStatusResponse = {
  /** Indicates whether domain verification has been completed (`1`) or not (`0`). */
  validation_completed: 1 | 0;
  /** Contains verification details for each domain associated with the certificate. */
  details: {
    [domain: string]: {
      /** Indicates the method of verification, usually an email address used for verification. */
      method: string;
      /** Represents the current status of domain verification, such as 'Email Sent'. */
      status: 'Email Sent';
    }
  };
};
