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
