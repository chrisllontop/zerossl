export type CreateCertificateRequest = {
  /** Use this parameter to specify one or multiple comma-separated domains (or IP addresses) to be secured by your certificate. The first element of the list should be identical to the CN (common name) specified within your CSR. */
  certificate_domains: string;
  /**
   * Use this parameter to specify a certificate signing request (CSR) for your certificate. The CSR has to be 2048-bit or 4096-bit encrypted, otherwise it is rejected or might cause other issues. The CSRs' CN (common name) should be identical to the first element in your certificate_domains parameter.
   *
   * It is highly recommended to use a fresh, unique and correct CSR for each and every certificate (for security reasons and in order to avoid any problems with the certificate).
   *
   * Valid examples for the CSRs' CN (common name): example.com, 127.0.0.1.
   * */
  certificate_csr: string;
  /** For creating 1-year certificates specify 365 here, the default is 90. Other values are currently not supported. */
  certificate_validity_days?: 90 | 365;
  /**
   * Set this parameter to 1 in order to create a certificate exactly for the domains passed in the certificate_domains parameter. This means the certificates' Subject Alternative Names (SAN) will not include any alternative DNS entries.
   *
   * In practice this mostly affects www./non-www. variants: While most users prefer to cover and validate both variants by default, you might want to create a certificate which covers exactly one of those variants.
   * */
  strict_domains?: 1;
  /** Certificate hash of the certificate to be replaced. The certificate to be replaced must be in status issued or expiring_soon. You can only create one replacement certificate for an existing certificate. This parameter is entirely optional and not yet widely adapted. In the future it might be used in the UI. */
  replacement_for_certificate?: string;
};

export type CreateCertificateResponse = {
  /** Internal certificate ID, also referred to as certificate hash. */
  id: string;
  /** Returns a numeric ID to identify the certificate type. Possible values: 1 (90-day), 2 (90-day wildcard), 3 (90-day multi-domain), 4 (1-year), 5 (1-year wilcard), 6 (1-year multi-domain). */
  type: 1 | 2 | 3 | 4 | 5 | 6;
  /** Returns the common name (e.g. domain.com) of your certificate. */
  common_name: string;
  /** Returns any additional domains (SANs) in your certificate. */
  additional_domains: string;
  /** Returns the exact time (UTC) your certificate was created. */
  created: string;
  /** Returns the exact time (UTC) your certificate will expire. */
  expires: string;
  /** Returns the current certificate status. Possible values: draft, pending_validation, issued, cancelled, revoked, expired. */
  status: 'draft' | 'pending_validation' | 'issued' | 'cancelled' | 'revoked' | 'expired';
  /** Returns null if domain verification has not been initiated, or the selected verification type. Possible values: EMAIL (email verification), CNAME_CSR_HASH (CNAME verification), HTTP_CSR_HASH (HTTP file upload), HTTPS_CSR_HASH (HTTPS file upload) */
  validation_type: 'EMAIL' | 'CNAME_CSR_HASH' | 'HTTP_CSR_HASH' | 'HTTPS_CSR_HASH' | null;
  /** Returns one or a comma-separated list of selected verification emails if email verification is chosen for this certificate. */
  validation_emails: string;
  /** Returns the ID (certificate hash) of the existing certificate this certificate is replacing as part of a renewal. */
  replacement_for: string;
  /** Returns a series of sub-objects related to domain verification. */
  validation: {
    /** Returns an array of eligible domain verification emails. */
    email_validation: {
      [domain: string]: string[];
    };
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