export const API_URL = {
  LOGIN: '/api/login/',
} as const;

export const APP_URL = {
  HOME: '/',
  INVENTORY: {
    ITEM: (id: number) => `/inventory/${id}/`,
    EDIT_ITEM: (id: number) => `/inventory/${id}/edit/`,
    ADD_ITEM: '/inventory/add/',
  }
} as const;

export const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN!
export const DATABASE_URL = process.env.DATABASE_URL!

export const SIZE_OPTIONS = {
  NA: 'N/A',
  DOUBLE_XS: '2XS',
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
  DOUBLE_XL: 'XXL',
  TRIPLE_XL: 'XXXL',
} as const;

export type SizeOption = typeof SIZE_OPTIONS[keyof typeof SIZE_OPTIONS];
