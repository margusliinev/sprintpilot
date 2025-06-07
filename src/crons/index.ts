import { scheduleJob } from './registry';
import { Patterns } from './pattners';

export async function runCrons() {
    try {
        scheduleJob({
            name: 'log-every-5-seconds',
            pattern: Patterns.EVERY_5_SECONDS,
            handler: () => console.log(`(${new Date().toUTCString()}) This will run every five seconds`),
        });
        console.info('✅ Cronjobs setup completed');
    } catch (error) {
        console.error('❌ Cronjobs setup failed');
    }
}
