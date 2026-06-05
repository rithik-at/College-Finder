export function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount}`;
}

export function formatLPA(amount: number): string {
  return `₹${amount.toFixed(2)} LPA`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function parseJsonArray(jsonStr: string | null): string[] {
  if (!jsonStr) return [];
  try {
    return JSON.parse(jsonStr);
  } catch {
    return [];
  }
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getStarRating(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}

export function getRatingColor(rating: number): string {
  if (rating >= 4.0) return 'text-emerald-600 bg-emerald-50';
  if (rating >= 3.0) return 'text-amber-600 bg-amber-50';
  return 'text-red-500 bg-red-50';
}

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    IIT: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    NIT: 'bg-blue-100 text-blue-700 border-blue-200',
    IIIT: 'bg-violet-100 text-violet-700 border-violet-200',
    Private: 'bg-amber-100 text-amber-700 border-amber-200',
    State: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Deemed: 'bg-rose-100 text-rose-700 border-rose-200',
  };
  return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
}

export function getConfidenceColor(confidence: string): string {
  const colors: Record<string, string> = {
    Safe: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    Moderate: 'bg-amber-100 text-amber-700 border-amber-300',
    Reach: 'bg-red-100 text-red-700 border-red-300',
  };
  return colors[confidence] || 'bg-gray-100 text-gray-700';
}
