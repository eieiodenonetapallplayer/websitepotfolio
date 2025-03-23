export interface WakaTimeStats {
  best_day: {
    date: string;
    text: string;
    total_seconds: number;
  };
  categories: Array<{
    decimal: string;
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  dependencies: Array<{
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  daily_average: number;
  daily_average_including_other_language: number;
  days_including_holidays: number;
  days_minus_holidays: number;
  editors: Array<{
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  holidays: number;
  human_readable_daily_average: string;
  human_readable_total: string;
  languages: Array<{
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  machines: Array<{
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  operating_systems: Array<{
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  projects: Array<{
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }>;
  range: string;
  total_seconds: number;
  weekly_average: number;
  weekdays: {
    [key: string]: {
      name: string;
      percent: number;
      text: string;
      total_seconds: number;
    };
  };
}
