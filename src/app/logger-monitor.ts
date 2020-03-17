import { NGXLoggerMonitor, NGXLogInterface } from 'ngx-logger';

export class MyLoggerMonitor extends NGXLoggerMonitor {
    onLog(log: NGXLogInterface) {
        const {fileName, level, lineNumber, message, timestamp} = log;
        console.log("Log recebido: ", {fileName, level, lineNumber, message, timestamp});
    }
}