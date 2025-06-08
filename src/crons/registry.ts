// import type { CronOptions } from 'croner';
// import { Cron } from 'croner';

// const globalKey = '__CronRegistry__';
// const cronRegistry: Record<string, Cron> = (globalThis as any)[globalKey] || ((globalThis as any)[globalKey] = {});

// export interface CronJobConfig extends CronOptions {
//     name: string;
//     pattern: string;
//     handler: Function;
// }

// export function scheduleJob({ name, pattern, handler, ...options }: CronJobConfig): Cron {
//     if (cronRegistry[name]) {
//         cronRegistry[name].stop();
//         delete cronRegistry[name];
//     }
//     const job = new Cron(pattern, options, handler);
//     cronRegistry[name] = job;
//     return job;
// }
