

declare namespace LegendBaseTypes {
  type Mode = 'sandbox' | 'production' | 'development';
  interface Config {
    mode: Mode;
    apiKey?: string;
    debug?: boolean;
    // 其他可能的配置项
  }

  interface EventData {
    type: string;
    payload?: Record<string, unknown>;
  }

  // 签名
  interface Sign {
    timestamp: string;
    signature: string;
    appId: string;
    appKey: string;
    appUid: string;
    appUrl: string;
    appEmail: string;
  }

  // 用户信息
  interface User {
    token_type: string;
    expires_in: string;
    access_token: string;
    user_preference: {
      default_fiat: string;
      skip_bank_disclaimer: boolean;
      skip_wire_disclaimer: boolean;
      banner: [];
    };
    kyc_status: string;
    account_type: string;
    account_email: string;
    account_status: string;
    expires_at: string;
    next_kyc_step: string;
    exchange_config: {
      auto_withdrawal: boolean;
      trade_confirmation_popup: string;
      minimum_trading_size: string;
      exchange_name: string;
      logo_url: string;
      allowed_payment_methods: string[];
      user_max_ach_deposit: string;
      allowed_fiat_deposit_methods: string[];
      allowed_fiat_withdraw_methods: string[];
      disable_modify_wallet: boolean;
      no_sell: boolean;
      app_type: string;
      allow_usd_wire_transfer: string;
    },
    user_info: {
      edd: {};
      rfi: {};
    };
  }

  // 支付方式
  interface PaymentMethod {
    payment_method_id: string;
    type: string;
    title: string;
    currency: string;
    flag: string;
    description: string;
    cardholder: string;
    account_number: string;
    is_expired: boolean;
  }

  // 报价参数
  interface QuoteByFiatParams {
    pair: string;
    payment_method_id: string;
    side: string;
    size: number;
  }

  // 报价响应
  interface QuoteByFiatResponse {
    created: string;
    pair: string;
    price: number;
    quantity: number;
    processing_fee: string;
    network_fee: number;
    side: string;
    size: number;
  }


  //  交易参数
  interface OrderByFiatParams {
    frame3DsSelector: string;
    showFrame3Ds: () => void;
    hideFrame3Ds: () => void;
    app_state: string;
    network: string;
    pair: string;
    payment_method_id: string;
    side: string;
    size: number;
    cvv: string;
  }

  // 交易响应
  interface OrderByFiatResponse {
    created: string;
    network_fee: string;
    pair: string;
    price: number;
    processing_fee: string;
    quantity: number;
    side: string;
    size: number;
    trade_id: string;
  }


  interface BillingAddress {
    name: string;
    date_of_birth: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    country: string;
    country_iso2_code: string;
    state: string;
    zipcode: string;
    registration_path: string;
  }

  interface Region {
    id: number;
    parent_id: number;
    name_en: string;
    name_zh: string;
    iso2_code: string;
    iso3_code: string;
    phone_code: number;
    city_code: null;
    letter: string;
    type: number;
    status: string;
    created_at: string;
    updated_at: string;
    allowed_individual: number;
    allowed_entity: number;
    area: string;
    area_code: string;
    ip_limit: number;
    allowed_residential: number;
    deleted_at: any;
  }
}

// 声明全局 LegendBase 类
declare class LegendBase {
  constructor(config: LegendBaseTypes.Config);

  // 授权
  authorize(params: LegendBaseTypes.Sign): Promise<LegendBaseTypes.User>;
  // 获取支付方式
  getAllPaymentMethods(): Promise<LegendBaseTypes.PaymentMethod[]>;
  // 获取报价
  quoteByFiat(params: LegendBaseTypes.QuoteByFiatParams): Promise<LegendBaseTypes.QuoteByFiatResponse>;
  // 交易
  orderByFiat(params: LegendBaseTypes.OrderByFiatParams): Promise<LegendBaseTypes.OrderByFiatResponse>;
  // 获取账单地址
  getBillingAddress(): Promise<LegendBaseTypes.BillingAddress>;
  // 设置账单地址
  setBillingAddress(params: LegendBaseTypes.BillingAddress): Promise<{message:string,result:string,uuid:string}>;
  // 获取地区
  getRegions(params: { parent_id: Number }): Promise<{data:LegendBaseTypes.Region[]}>;
  // 添加支付方式
  addPaymentMethod(params:any):Promise<any>;


  // 事件相关
  on(eventName: string, callback: (data: any) => void): void;
  off(eventName: string, callback?: (data: any) => void): void;

  // 静态方法（如果有）
  static version: string;

}