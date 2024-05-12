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
