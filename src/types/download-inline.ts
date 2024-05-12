export type DownloadCertificateInlineRequest = {
  /** Internal certificate ID, also referred to as certificate hash. */
  id: string;
  /** Set this parameter to `1` to include the cross signed certificate in the response. */
  include_cross_signed?: 1;
};

export type DownloadCertificateInlineResponse = {
  /** Returns your primary certificate file. */
  "certificate.crt": string;
  /** Returns your certificate bundle file. */
  "ca_bundle.crt": string;
};
