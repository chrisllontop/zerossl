export type GetCertificateRequest = {
  /** Internal certificate ID, also referred to as certificate hash. */
  id: string;
};

export type GetCertificateResponse = {
  /** Returns the internal certificate ID, also referred to as certificate hash. */
  id: string;
  /** Returns a numeric ID to identify the certificate type. */
  type: number;
  /** Returns the common name (e.g. `domain.com`) of your certificate. */
  common_name: string;
  /** Returns any additional domains (SANs) in your certificate. */
  additional_domains: string;
  /** Returns the exact time (UTC) your certificate was created. */
  created: string;
  /** Returns the exact time (UTC) your certificate will expire. */
  expires: string;
  /** Returns the current certificate status. */
  status: 'draft' | 'pending_validation' | 'issued' | 'revoked' | 'cancelled' | 'expired';
  /** Returns `null` if domain verification has not been initiated, or the selected verification type. */
  validation_type: 'EMAIL' | 'CNAME_CSR_HASH' | 'HTTP_CSR_HASH' | 'HTTPS_CSR_HASH' | null;
  /** Returns one or a comma-separated list of selected verification emails if email verification is chosen for this certificate. */
  validation_emails: string | null;
  /** Returns the ID (certificate hash) of the existing certificate this certificate is replacing as part of a renewal. */
  replacement_for: string;
  /** The SHA-1 fingerprint of the certificate (if issued). [Note: Added in autumn 2022, is `null` for older certificates.] */
  fingerprint_sha1: string | null;
  /** Usually `null` or `false` - only true for very few certificates where the domain has to be manually reviewed. */
  brand_validation: boolean | null;
  /** Returns a series of sub-objects related to domain verification. */
  validation: {
    /** Returns an array of eligible domain verification emails. */
    email_validation: Record<string, string[]>;
    /** Returns a series of sub-objects (one for each domain in your certificate) containing alternative verification methods. */
    other_methods: {
      [domain: string]: {
        /** Returns the URL (http format) your verification file must be uploaded to as part of domain verification. */
        file_validation_url_http: string;
        /** Returns the URL (https format) your verification file must be uploaded to as part of domain verification. */
        file_validation_url_https: string;
        /** Returns the content your verification file must contain, consisting of three lines of plain-text. */
        file_validation_content: string[];
        /** Returns the host-part (Name) of the CNAME-record that must be created as part of domain verification. */
        cname_validation_p1: string;
        /** Returns the value-part (Point To) of the CNAME-record that must be created as part of domain verification. */
        cname_validation_p2: string;
      };
    };
  };
};
