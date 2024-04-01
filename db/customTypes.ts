import { customType} from "drizzle-orm/sqlite-core";
type Timestamp = {
    data: Date;
    driverData: string;
    config: { withTimezone: boolean; precision?: number };
}
export const timestamp = customType<Timestamp>({
  dataType(config) {
    const precision = typeof config?.precision !== 'undefined'
      ? ` (${config.precision})`
      : '';
    return `timestamp${precision}${
      config?.withTimezone ? ' with time zone' : ''
    }`;
  },
  fromDriver(value: string): Date {
    return new Date(value);
  },
});

// idk if this will work :D
type Uuid = {
  data: string;
  driverData: string;
}
export const uuid = customType<Uuid>({
  dataType() {
    return 'string'
  },
  fromDriver(value: string): string {
    return crypto.randomUUID();
  }
})