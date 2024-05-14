import {pki} from 'node-forge';
import axios from 'axios';
import {
	type CancelCertificateRequest,
	type CancelCertificateResponse,
	type CreateCertificateRequest,
	type CreateCertificateResponse,
	type DownloadCertificateInlineRequest,
	type DownloadCertificateInlineResponse, type GenerateCsrRequest,
	type GetCertificateRequest,
	type GetCertificateResponse,
	type ListCertificatesRequest,
	type ListCertificatesResponse,
	type ResendVerificationRequest,
	type ResendVerificationResponse,
	type RevokeCertificateRequest,
	type RevokeCertificateResponse,
	type ValidateCsrRequest,
	type ValidateCsrResponse,
	type VerificationStatusRequest,
	type VerificationStatusResponse,
	type VerifyDomainRequest,
	type VerifyDomainResponse,
} from './types';

export class ZeroSSL {
	private readonly client = axios.create({
		baseURL: 'https://api.zerossl.com',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	constructor(readonly apiKey: string) {
		this.apiKey = apiKey;
	}

	async createCertificate(request: CreateCertificateRequest): Promise<CreateCertificateResponse> {
		const response = await this.client.post<CreateCertificateResponse>('/certificates', {
			...request,
			access_key: this.apiKey,
		});
		return response.data;
	}

	async verifyDomain(request: VerifyDomainRequest): Promise<VerifyDomainResponse> {
		const {id, ...body} = request;
		const response = await this.client.post<VerifyDomainResponse>(`/certificates/${id}/challenges`, {
			...body,
			access_key: this.apiKey,
		});
		return response.data;
	}

	async downloadCertificateInline(request: DownloadCertificateInlineRequest): Promise<DownloadCertificateInlineResponse> {
		const {id, include_cross_signed} = request;
		const response = await this.client.get<DownloadCertificateInlineResponse>(`/certificates/${id}/download/return`, {
			params: {
				access_key: this.apiKey,
				include_cross_signed,
			},
		});
		return response.data;
	}

	async getCertificate(request: GetCertificateRequest): Promise<GetCertificateResponse> {
		const response = await this.client.get<GetCertificateResponse>(`/certificates/${request.id}`, {
			params: {
				access_key: this.apiKey,
			},
		});
		return response.data;
	}

	async listCertificates(request?: ListCertificatesRequest): Promise<ListCertificatesResponse> {
		const parameters = request ?? {};
		const response = await this.client.get<ListCertificatesResponse>('/certificates', {
			params: {
				...parameters,
				access_key: this.apiKey,
			},
		});
		return response.data;
	}

	async verificationStatus(request: VerificationStatusRequest): Promise<VerificationStatusResponse> {
		const response = await this.client.get<VerificationStatusResponse>(`/certificates/${request.id}/status`, {
			params: {
				access_key: this.apiKey,
			},
		});
		return response.data;
	}

	async resendVerificationEmail(request: ResendVerificationRequest): Promise<ResendVerificationResponse> {
		const response = await this.client.post<ResendVerificationResponse>(`/certificates/${request.id}/challenges/email`, {
			access_key: this.apiKey,
		});
		return response.data;
	}

	async revokeCertificate(request: RevokeCertificateRequest): Promise<RevokeCertificateResponse> {
		const {id, reason} = request;
		const response = await this.client.post<RevokeCertificateResponse>(`/certificates/${id}/revoke`, {
			access_key: this.apiKey,
			reason,
		});
		return response.data;
	}

	async cancelCertificate(request: CancelCertificateRequest): Promise<CancelCertificateResponse> {
		const response = await this.client.post<CancelCertificateResponse>(`/certificates/${request.id}/cancel`, {
			access_key: this.apiKey,
		});
		return response.data;
	}

	async validateCsr(request: ValidateCsrRequest): Promise<ValidateCsrResponse> {
		const response = await this.client.post<ValidateCsrResponse>('/validation/csr', {
			...request,
			access_key: this.apiKey,
		});
		return response.data;
	}

	async generateCsr(request: GenerateCsrRequest): Promise<string> {
		const {bits = 2048, ...subject} = request;
		const keys = pki.rsa.generateKeyPair(bits);
		const csr = pki.createCertificationRequest();
		csr.publicKey = keys.publicKey;

		csr.setSubject(Object.entries(subject).map(([name, value]) => ({
			name: name.replaceAll(/_\w/g, m => m[1].toUpperCase()),
			value,
		})));

		csr.sign(keys.privateKey);

		return pki.certificationRequestToPem(csr);
	}
}
