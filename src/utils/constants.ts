export const API_URL = {
  LOGIN: '/api/login/',
} as const;

export const APP_URL = {
  HOME: '/',
  INVENTORY: {
    INVENTORY_ITEM: (id: string) => `/inventory/${id}/`,
    ADD_ITEM: '/inventory/add/',
  }
} as const;

export const DATABASE_AUTH_TOKEN = process.env.DATABASE_AUTH_TOKEN!
export const DATABASE_URL = process.env.DATABASE_URL!
