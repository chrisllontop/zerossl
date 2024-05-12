export type ValidateCsrRequest = {
  /** The CSR you want to validate. */
  csr: string;
};

export type ValidateCsrResponse = {
  /** Returns `true` to indicate your CSR is valid, `false` otherwise. */
  success: boolean;
  /** Returns null in case the CSR was successfully validated, error code and description otherwise. */
  error: {
    /** Numeric error code. */
    code: number;
    /** Descriptive key for the error type. */
    type: string;
  } | null;
}