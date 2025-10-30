
export interface NewOrdersData {
    date: string;
    timestamp: Date;
    type: 'جديدة';
    products: { name: string; count: number }[];
    confirmed: number;
    canceled: number;
    reasons: string[];
}

export interface OldOrdersData {
    date: string;
    timestamp: Date;
    type: 'سابقة';
    unanswered: number;
    attempts: string;
    canceled: number;
    reasons: string[];
    solutions: string[];
}

export type OrderData = NewOrdersData | OldOrdersData;
