import {GetCertificateResponse} from "./get-certificate";

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
  certificate_type?: 'single90Days' | 'wildcard90Days' | 'multiDomain90Days' | 'single1Year' | 'wildcard1Year' | 'multiDomain1Year' | 'acme90Days' | "1" | "2" | "3" | "4" | "5" | "6" | "7";
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