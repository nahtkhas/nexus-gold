import { Stats, Transaction } from './types';
class NexusBackend {
  static getSystemState(): Stats {
    return { ownerVaultBalance: 12450.75, availableBalance: 0, transactions: [], activeUserCount: 3450, totalViewsGenerated: 5850000 };
  }
  static processEarning(amt: number, type: string, isAdmin: boolean): Stats {
    const stats = this.getSystemState();
    if (isAdmin) stats.ownerVaultBalance += amt;
    else stats.availableBalance += amt;
    return stats;
  }
}
export default NexusBackend;
