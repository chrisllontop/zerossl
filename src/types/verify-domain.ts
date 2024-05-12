export type VerifyDomainRequest = {
  /** Internal certificate ID, also referred to as certificate hash. */
  id: string;
  /** Use this parameter to specify the verification method to use for this certificate. Possible values: `EMAIL` (email verification), `CNAME_CSR_HASH` (CNAME verification), `HTTP_CSR_HASH` (HTTP file upload), `HTTPS_CSR_HASH` (HTTPS file upload). */
  method: 'EMAIL' | 'CNAME_CSR_HASH' | 'HTTP_CSR_HASH' | 'HTTPS_CSR_HASH';
  /** If your selected verification method is email verification, use this parameter to specify one or multiple comma-seperated verification email addresses. You need to specify one verification email address per domain. */
  validation_email?: string;
}

export type VerifyDomainsSuccessResponse = {
  /** `true` if the domain verification was successfully initiated or completed. */
  success: true;
  details: {
    [domain: string]: {
      /** Indicates whether the domain verification was successful. */
      validation_successful: boolean;
    };
  };
};

export type VerifyDomainsCnameErrorResponse = {
  /** `false` if there was an error during the domain verification process. */
  success: false;
  error: {
    /** Numeric code related to the specific error. */
    code: number;
    /** Textual key uniquely associated with the specific error. */
    type: string;
    details: {
      [domain: string]: {
        /** `1` if the required CNAME-record was found, `0` otherwise. */
        cname_found: number;
        /** `1` if the found CNAME-record is correct, `0` if incorrect. */
        record_correct: number;
        /** Host-part (Name) of the required CNAME-record. */
        target_host: string;
        /** Value-part (Point To) of the required CNAME-record. */
        target_record: string;
        /** Actual value-part of the CNAME record found for the given domain. */
        actual_record: string;
      };
    };
  };
};

export type VerifyDomainsHttpErrorResponse = {
  /** `false` indicates an error occurred during the verification process. */
  success: false;
  error: {
    /** Numeric error code. */
    code: number;
    /** Descriptive key for the error type. */
    type: string;
    details: {
      [domain: string]: {
        /** `1` if the required HTTP/HTTPS file was found, `0` otherwise. */
        file_found: number;
        /** `true` if an error was detected during file verification, `false` otherwise. */
        error: boolean;
        /** A slug representing the specific error encountered. */
        error_slug: string;
        /** Detailed description of the error. */
        error_info: string;
      };
    };
  };
};

export type VerifyDomainResponse =
  | VerifyDomainsSuccessResponse
  | VerifyDomainsCnameErrorResponse
  | VerifyDomainsHttpErrorResponse;
