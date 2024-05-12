export type CancelCertificateRequest = {
  /** Internal certificate ID, also referred to as certificate hash. */
  id: string;
};

export type CancelCertificateResponse = {
  /** Returns `1` to indicate that your API request was successful. */
  success: 1 | 0;
}