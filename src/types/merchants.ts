// 가맹점 상태
export type MchtStatus = 'READY' | 'ACTIVE' | 'INACTIVE' | 'CLOSED';

/**
 * 가맹점 기본 정보
 */
export interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: MchtStatus;
  bizType: string;
  bizNo: string;
  address: string;
  phone: string;
  email: string;
  registeredAt: string;
  updatedAt: string;
}

export interface MerchantResponse {
  status: number;
  message: string;
  data: Merchant[];
}

export interface NormalizedMerchants {
  name: Record<string, string>;

  bizType: Record<string, string>;

  status: Record<string, MchtStatus>;

  email: Record<string, string>;

  phone: Record<string, string>;

  registeredAt: Record<string, string>;

  allCodes: string[];
}
