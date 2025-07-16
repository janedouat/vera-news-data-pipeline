export interface ApiRetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
}

export interface RetryConfig {
  retry: ApiRetryConfig;
  timeout: number;
}

export const LLM_CALL_RETRY_CONFIG: RetryConfig = {
  retry: {
    maxRetries: 5,
    baseDelay: 2000, // 2 seconds
    maxDelay: 30000, // 30 seconds
    backoffMultiplier: 2,
  },
  timeout: 30000, // 30 seconds
};

export const OPENAI_CONFIG = {
  retry: {
    maxRetries: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 10000, // 10 seconds
    backoffMultiplier: 2,
  },
  timeout: 30000, // 30 seconds
};

// Error categories for better error handling
export const ERROR_CATEGORIES = {
  API_CONNECTION: 'api_connection',
  RATE_LIMIT: 'rate_limit',
  VALIDATION: 'validation',
  TIMEOUT: 'timeout',
  UNKNOWN: 'unknown',
} as const;

export type ErrorCategory =
  (typeof ERROR_CATEGORIES)[keyof typeof ERROR_CATEGORIES];

// Retryable error patterns
export const RETRYABLE_ERROR_PATTERNS = [
  'other side closed',
  'Connect Timeout',
  'fetch failed',
  'ECONNRESET',
  'ETIMEDOUT',
  'TimeoutError',
  'network',
  'connection',
  'socket',
  'AI_RetryError',
  'AI_APICallError',
  'ENOTFOUND',
  'ECONNREFUSED',
  'EHOSTUNREACH',
];

// Rate limit error patterns
export const RATE_LIMIT_ERROR_PATTERNS = [
  'rate limit',
  '429',
  'too many requests',
  'quota exceeded',
  'rate exceeded',
];

// Validation error patterns
export const VALIDATION_ERROR_PATTERNS = [
  'validation',
  'parse',
  'schema',
  'invalid',
  'malformed',
];
