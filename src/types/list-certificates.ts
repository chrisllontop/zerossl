import {GetCertificateResponse} from "./get-certificate";

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