import type { Merchant, NormalizedMerchants } from '@/types/merchants';
import type { TransactionStatus } from '@/types/payment';

export function normalizeMerchants(merchants: Merchant[]): NormalizedMerchants {
  const normalized: NormalizedMerchants = {
    name: {},
    bizType: {},
    status: {},
    email: {},
    phone: {},
    registeredAt: {},
    allCodes: [],
  };

  // 배열을 순회
  merchants.forEach((merchant) => {
    const code = merchant.mchtCode;

    // 각 필드를 맵으로 저장
    normalized.name[code] = merchant.mchtName;
    normalized.bizType[code] = merchant.bizType;
    normalized.status[code] = merchant.status;
    normalized.email[code] = merchant.email;
    normalized.phone[code] = merchant.phone;
    normalized.registeredAt[code] = merchant.registeredAt;

    // 코드 배열에 추가
    normalized.allCodes.push(code);
  });

  return normalized;
}

// 빠른 조회용 헬퍼
export function getMerchantName(normalized: NormalizedMerchants, mchtCode: string): string {
  return normalized.name[mchtCode] || '알 수 없음';
}

export function getMerchantBizType(normalized: NormalizedMerchants, mchtCode: string): string {
  return normalized.bizType[mchtCode] || '미지정';
}

export function getStatusVariant(
  status: TransactionStatus
): 'success' | 'error' | 'warning' | 'info' {
  const statusMap: Record<TransactionStatus, 'success' | 'error' | 'warning' | 'info'> = {
    SUCCESS: 'success',
    FAILED: 'error',
    CANCELLED: 'warning',
    PENDING: 'info',
  };

  return statusMap[status] || 'info';
}
