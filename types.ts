export interface User { id: string; name: string; email: string; role: 'Admin' | 'User'; balance: number; }
export interface Stats { totalViewsGenerated: number; ownerVaultBalance: number; availableBalance: number; activeUserCount: number; transactions: any[]; }
export interface MockVideo { id: string; title: string; author: string; thumbnail: string; previewUrl: string; views: string; platform: string; }
