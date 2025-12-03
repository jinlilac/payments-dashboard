/**
 * 결제 관련 모든 타입 정의
 */

// 거래 상태
export type TransactionStatus = 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'PENDING' | 'REFUNDED';

// 결제 수단
export type PaymentType = 'ONLINE' | 'DEVICE' | 'MOBILE' | 'VACT' | 'BILLING';

// 통화
export type Currency = 'KRW' | 'USD' | 'JPY' | 'CNY';

/**
 * 거래(Transaction) 타입
 */
export interface Transaction {
  // 기본 정보
  paymentCode: string; //
  mchtCode: string;
  amount: string;
  currency: Currency | string;
  payType: PaymentType;
  status: TransactionStatus;
  paymentAt: string | Date;

  // // 가맹점 정보
  // mchtName: string; // 가맹점명 (조인 후)
  // status: string;
  // bizType: string;
  // bizNo: string;
  // address: string;
  // phone: string;
  // email: string;
  // registeredAt: string | Date;
  // updatedAt:string | Date;
}

/**
 * KPI 데이터 타입
 */
export interface KPIData {
  label: string;
  value: string | number;
  subtext: string;
  variant: 'success' | 'warning' | 'error' | 'default';
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}
