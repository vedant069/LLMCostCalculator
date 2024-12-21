import { Provider, CalculationResult } from '../types/pricing';

export function calculateCostForProvider(
  minutes: number,
  provider: Provider
): { cost: number; tiersUsed: { minutes: number; rate: number; cost: number }[] } {
  let remainingMinutes = minutes;
  let totalCost = 0;
  const tiersUsed = [];

  for (let i = 0; i < provider.tiers.length; i++) {
    const currentTier = provider.tiers[i];
    const nextTier = provider.tiers[i + 1];
    
    const minutesInTier = nextTier
      ? Math.min(remainingMinutes, nextTier.minutes - currentTier.minutes)
      : remainingMinutes;
    
    if (minutesInTier > 0) {
      const tierCost = minutesInTier * currentTier.pricePerMinute;
      totalCost += tierCost;
      tiersUsed.push({
        minutes: minutesInTier,
        rate: currentTier.pricePerMinute,
        cost: tierCost
      });
      remainingMinutes -= minutesInTier;
    }

    if (remainingMinutes <= 0) break;
  }

  return {
    cost: Number(totalCost.toFixed(4)),
    tiersUsed
  };
}

export function calculateAllCosts(minutes: number, providers: Provider[]): CalculationResult {
  const breakdown = providers.map(provider => ({
    provider: provider.name,
    ...calculateCostForProvider(minutes, provider)
  }));

  const totalCost = breakdown.reduce((sum, result) => sum + result.cost, 0);

  return {
    totalCost: Number(totalCost.toFixed(4)),
    breakdown
  };
}