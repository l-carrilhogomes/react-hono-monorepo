/**
 * @fileoverview Structured logger utility using pino.
 *
 * This module provides a configured pino logger instance
 * for structured logging across the API.
 *
 * @module lib/logger
 *
 * @example
 * ```ts
 * import { logger } from "./lib/logger";
 *
 * logger.info("Server started", { port: 3000 });
 * logger.error("Database error", { error: err.message });
 * ```
 */
import pino from "pino";

/**
 * Pino logger instance.
 *
 * Configured for:
 * - Pretty printing in development
 * - JSON output in production
 * - Timestamp with ISO format
 */
export const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    transport:
        process.env.NODE_ENV !== "production"
            ? {
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "SYS:standard",
                },
            }
            : undefined,
    base: {
        pid: false, // Don't include PID in logs
    },
    timestamp: pino.stdTimeFunctions.isoTime,
});

/**
 * Create a child logger with additional context.
 *
 * @param context - Additional context to include in all logs
 * @returns Child logger instance
 */
export function createLogger(context: Record<string, unknown>) {
    return logger.child(context);
}
