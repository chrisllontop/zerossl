export type ResendVerificationRequest = {
  /** Internal certificate ID, also referred to as certificate hash. */
  id: string;
};

export type ResendVerificationResponse = {
  /** Returns `1` to indicate that your API request was successful. */
  success: 1 | 0;
};
