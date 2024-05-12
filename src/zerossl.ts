import axios from 'axios';
import {
  CancelCertificateRequest, CancelCertificateResponse,
  CreateCertificateRequest,
  CreateCertificateResponse,
  DownloadCertificateInlineRequest, DownloadCertificateInlineResponse,
  GetCertificateRequest, GetCertificateResponse,
  ListCertificatesRequest,
  ListCertificatesResponse,
  ResendVerificationRequest, ResendVerificationResponse,
  RevokeCertificateRequest, RevokeCertificateResponse, ValidateCsrRequest, ValidateCsrResponse,
  VerificationStatusRequest, VerificationStatusResponse, VerifyDomainRequest, VerifyDomainResponse
} from "./types";

export class ZeroSSL {
  private readonly apiKey: string;
  private client = axios.create({
    baseURL: 'https://api.zerossl.com',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createCertificate(request: CreateCertificateRequest): Promise<CreateCertificateResponse> {
    const response = await this.client.post('/certificates', {
      ...request,
      access_key: this.apiKey,
    });
    return response.data;
  }

  async verifyDomain(request: VerifyDomainRequest): Promise<VerifyDomainResponse> {
    const { id, ...body } = request;
    const response = await this.client.post(`/certificates/${id}/challenges`, {
      ...body,
      access_key: this.apiKey,
    });
    return response.data;
  }

  async downloadCertificateInline(request: DownloadCertificateInlineRequest): Promise<DownloadCertificateInlineResponse> {
    const { id, include_cross_signed} = request;
    const response = await this.client.get(`/certificates/${id}/download/return`, {
      params: {
        access_key: this.apiKey,
        include_cross_signed
      },
    });
    return response.data;
  }

  async getCertificate(request: GetCertificateRequest): Promise<GetCertificateResponse> {
    const response = await this.client.get(`/certificates/${request.id}`, {
      params: {
        access_key: this.apiKey,
      },
    });
    return response.data;
  }

  async listCertificates(request?: ListCertificatesRequest): Promise<ListCertificatesResponse> {
    const params = request ?? {};
    const response = await this.client.get('/certificates', {
      params: {
        ...params,
        access_key: this.apiKey,
      },
    });
    return response.data;
  }

  async verificationStatus(request: VerificationStatusRequest): Promise<VerificationStatusResponse> {
    const response = await this.client.get(`/certificates/${request.id}/status`, {
      params: {
        access_key: this.apiKey,
      },
    });
    return response.data;
  }

  async resendVerificationEmail(request: ResendVerificationRequest): Promise<ResendVerificationResponse> {
    const response = await this.client.post(`/certificates/${request.id}/challenges/email`, {
      access_key: this.apiKey,
    });
    return response.data;
  }

  async revokeCertificate(request: RevokeCertificateRequest): Promise<RevokeCertificateResponse> {
    const { id, reason } = request;
    const response = await this.client.post(`/certificates/${id}/revoke`, {
      access_key: this.apiKey,
      reason,
    });
    return response.data;
  }

  async cancelCertificate(request: CancelCertificateRequest): Promise<CancelCertificateResponse> {
    const response = await this.client.post(`/certificates/${request.id}/cancel`, {
      access_key: this.apiKey,
    });
    return response.data;
  }

  async validateCsr(request: ValidateCsrRequest): Promise<ValidateCsrResponse> {
    const response = await this.client.post(`/validation/csr`, {
      ...request,
      access_key: this.apiKey,
    });
    return response.data;
  }

}