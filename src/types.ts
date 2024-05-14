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
	validation_type: 'EMAIL' | 'CNAME_CSR_HASH' | 'HTTP_CSR_HASH' | 'HTTPS_CSR_HASH' | undefined;
	/** Returns one or a comma-separated list of selected verification emails if email verification is chosen for this certificate. */
	validation_emails: string;
	/** Returns the ID (certificate hash) of the existing certificate this certificate is replacing as part of a renewal. */
	replacement_for: string;
	/** Returns a series of sub-objects related to domain verification. */
	validation: {
		/** Returns an array of eligible domain verification emails. */
		email_validation: Record<string, string[]>;
		other_methods: Record<string, {
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
		}>;
	};
};

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
	validation_type: 'EMAIL' | 'CNAME_CSR_HASH' | 'HTTP_CSR_HASH' | 'HTTPS_CSR_HASH' | undefined;
	/** Returns one or a comma-separated list of selected verification emails if email verification is chosen for this certificate. */
	validation_emails: string | undefined;
	/** Returns the ID (certificate hash) of the existing certificate this certificate is replacing as part of a renewal. */
	replacement_for: string;
	/** The SHA-1 fingerprint of the certificate (if issued). [Note: Added in autumn 2022, is `null` for older certificates.] */
	fingerprint_sha1: string | undefined;
	/** Usually `null` or `false` - only true for very few certificates where the domain has to be manually reviewed. */
	brand_validation: boolean | undefined;
	/** Returns a series of sub-objects related to domain verification. */
	validation: {
		/** Returns an array of eligible domain verification emails. */
		email_validation: Record<string, string[]>;
		/** Returns a series of sub-objects (one for each domain in your certificate) containing alternative verification methods. */
		other_methods: Record<string, {
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
		}>;
	};
};

export type ListCertificatesRequest = {
	/**
   * Use this parameter to specify one or multiple comma-separated certificate status values. Possible values: draft, pending_validation, issued, cancelled, revoked, expired.
   *
   * You can also send the special status expiring_soon. In this case all issued certificates are included, which expire within the next 30 days and should be renewed (in paid ZeroSSL accounts those are not credited anymore).
   */
	certificate_status?: 'draft' | 'pending_validation' | 'issued' | 'cancelled' | 'revoked' | 'expired' | 'expiring_soon';
	/**
   * Use this parameter to filter the results by certificate type (comma-seperated values). You can either use the string representation or the integer code as value, both shall work.
   *
   * | String | Code | Description |
   * | --- | --- | --- |
   * | single90Days | 1 | 90-day certificate |
   * | wildcard90Days | 2 | 90-day wildcard certificate |
   * | multiDomain90Days | 3 | 90-day multi-domain certificate |
   * | single1Year | 4 | 1-year certificate |
   * | wildcard1Year | 5 | 1-year wildcard certificate |
   * | multiDomain1Year | 6 | 1-year multi-domain certificate |
   * | acme90Days | 7 | ACME certificate |
   */
	certificate_type?: 'single90Days' | 'wildcard90Days' | 'multiDomain90Days' | 'single1Year' | 'wildcard1Year' | 'multiDomain1Year' | 'acme90Days' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
	/** Use this parameter to search for certificates having the given common name or SAN. */
	search?: string;
	/** Use this parameter to specify a pagination limit (Default: `100`). */
	limit?: number;
	/** Use this parameter to specify a pagination page. If not specified the default `1` is returned, otherwise a numeric string containing the number of the page. */
	page?: number;
};

export type ListCertificatesResponse = {
	/** Returns the total number of results found for your query. */
	total_count: number;
	/** Returns the number of results shown on the current page. */
	result_count: number;
	/** Returns the current page number. */
	page: number;
	/** Returns the specified pagination page limit. */
	limit: number;
	/** Indicates the usage level of ACME services. */
	acmeUsageLevel: 'LOW' | 'MEDIUM' | 'HIGH';
	/** Indicates if ACME services are locked. */
	isAcmeLocked: boolean;
	/** Returns an array of certificates. */
	results: GetCertificateResponse[];
};

export type CancelCertificateRequest = {
	/** Internal certificate ID, also referred to as certificate hash. */
	id: string;
};

export type CancelCertificateResponse = {
	/** Returns `1` to indicate that your API request was successful. */
	success: 1 | 0;
};

export type DownloadCertificateInlineRequest = {
	/** Internal certificate ID, also referred to as certificate hash. */
	id: string;
	/** Set this parameter to `1` to include the cross signed certificate in the response. */
	include_cross_signed?: 1;
};

export type DownloadCertificateInlineResponse = {
	/** Returns your primary certificate file. */
	'certificate.crt': string;
	/** Returns your certificate bundle file. */
	'ca_bundle.crt': string;
};

export type ResendVerificationRequest = {
	/** Internal certificate ID, also referred to as certificate hash. */
	id: string;
};

export type ResendVerificationResponse = {
	/** Returns `1` to indicate that your API request was successful. */
	success: 1 | 0;
};

export type RevokeCertificateRequest = {
	/** Use this parameter to specify the certificate ID (hash) of the certificate to be revoked. */
	id: string;
	/**
   * One of:
   *
   * - `Unspecified`: Default
   * - `keyCompromise`: Compromised private key
   * - `affiliationChanged`: Subjects' name or identity information has changed
   * - `Superseded`: Certificate has been replaced
   * - `cessationOfOperation`: Authorized domain names are no longer owned
   *
   * */
	reason?: 'Unspecified' | 'keyCompromise' | 'affiliationChanged' | 'Superseded' | 'cessationOfOperation';
};

export type RevokeCertificateResponse = {
	/** Returns `1` to indicate that your API request was successful. */
	success: 1 | 0;
};

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
	} | undefined;
};

export type VerificationStatusRequest = {
	/** Internal certificate ID, also referred to as certificate hash. */
	id: string;
};

export type VerificationStatusResponse = {
	/** Indicates whether domain verification has been completed (`1`) or not (`0`). */
	validation_completed: 1 | 0;
	/** Contains verification details for each domain associated with the certificate. */
	details: Record<string, {
		/** Indicates the method of verification, usually an email address used for verification. */
		method: string;
		/** Represents the current status of domain verification, such as 'Email Sent'. */
		status: 'Email Sent';
	}>;
};

export type VerifyDomainRequest = {
	/** Internal certificate ID, also referred to as certificate hash. */
	id: string;
	/** Use this parameter to specify the verification method to use for this certificate. Possible values: `EMAIL` (email verification), `CNAME_CSR_HASH` (CNAME verification), `HTTP_CSR_HASH` (HTTP file upload), `HTTPS_CSR_HASH` (HTTPS file upload). */
	method: 'EMAIL' | 'CNAME_CSR_HASH' | 'HTTP_CSR_HASH' | 'HTTPS_CSR_HASH';
	/** If your selected verification method is email verification, use this parameter to specify one or multiple comma-seperated verification email addresses. You need to specify one verification email address per domain. */
	validation_email?: string;
};

export type VerifyDomainsSuccessResponse = {
	/** `true` if the domain verification was successfully initiated or completed. */
	success: true;
	details: Record<string, {
		/** Indicates whether the domain verification was successful. */
		validation_successful: boolean;
	}>;
};

export type VerifyDomainsCnameErrorResponse = {
	/** `false` if there was an error during the domain verification process. */
	success: false;
	error: {
		/** Numeric code related to the specific error. */
		code: number;
		/** Textual key uniquely associated with the specific error. */
		type: string;
		details: Record<string, {
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
		}>;
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
		details: Record<string, {
			/** `1` if the required HTTP/HTTPS file was found, `0` otherwise. */
			file_found: number;
			/** `true` if an error was detected during file verification, `false` otherwise. */
			error: boolean;
			/** A slug representing the specific error encountered. */
			error_slug: string;
			/** Detailed description of the error. */
			error_info: string;
		}>;
	};
};

export type VerifyDomainResponse =
  | VerifyDomainsSuccessResponse
  | VerifyDomainsCnameErrorResponse
  | VerifyDomainsHttpErrorResponse;
