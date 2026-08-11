type LogLevel = 'info' | 'warn' | 'error' | 'debug'

export interface LogEvent {
  level: LogLevel
  message: string
  requestId?: string
  context?: Record<string, unknown>
  timestamp: string
}

class Logger {
  private generateRequestId(): string {
    return `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  }

  private log(level: LogLevel, message: string, context?: Record<string, unknown>, requestId?: string) {
    const event: LogEvent = {
      level,
      message,
      requestId: requestId || this.generateRequestId(),
      context,
      timestamp: new Date().toISOString(),
    }

    if (process.env.NODE_ENV !== 'production') {
      const color =
        level === 'error' ? '\x1b[31m' : level === 'warn' ? '\x1b[33m' : level === 'debug' ? '\x1b[36m' : '\x1b[32m'
      console.log(`${color}[${event.timestamp}] [${event.level.toUpperCase()}] [${event.requestId}]: ${message}\x1b[0m`, context || '')
    }
  }

  info(message: string, context?: Record<string, unknown>, requestId?: string) {
    this.log('info', message, context, requestId)
  }

  warn(message: string, context?: Record<string, unknown>, requestId?: string) {
    this.log('warn', message, context, requestId)
  }

  error(message: string, context?: Record<string, unknown>, requestId?: string) {
    this.log('error', message, context, requestId)
  }

  debug(message: string, context?: Record<string, unknown>, requestId?: string) {
    this.log('debug', message, context, requestId)
  }
}

export const logger = new Logger()
