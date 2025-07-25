export const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/BudgetBuddy4/' : '/';

export const APP_NAME = 'Budget Buddy';

export const NAV = [{ text: 'Dashboard', url: BASE_URL }];

export const COPYRIGHT_TEXT = `${new Date().getFullYear()} Budget Buddy. All rights reserved.`;
