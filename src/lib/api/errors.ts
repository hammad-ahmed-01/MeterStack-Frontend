export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly fieldErrors: Record<string, string[]>

  constructor(
    message: string,
    status: number,
    code = "UNKNOWN",
    fieldErrors: Record<string, string[]> = {},
  ) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
    this.fieldErrors = fieldErrors
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value : undefined
}

function readFieldErrors(value: unknown): Record<string, string[]> {
  if (!value || typeof value !== "object") {
    return {}
  }

  const entries = Object.entries(value as Record<string, unknown>)
  const result: Record<string, string[]> = {}

  for (const [key, raw] of entries) {
    if (Array.isArray(raw) && raw.every((item) => typeof item === "string")) {
      result[key] = raw
    } else if (typeof raw === "string") {
      result[key] = [raw]
    }
  }

  return result
}

function messageForStatus(status: number, fallback?: string): string {
  switch (status) {
    case 400:
      return fallback ?? "Invalid request. Please check your input."
    case 401:
      return "Your session has expired. Please sign in again."
    case 403:
      return "You do not have permission to perform this action."
    case 404:
      return "The requested resource was not found."
    case 409:
      return fallback ?? "This resource already exists."
    case 422:
      return fallback ?? "Some fields are invalid. Please review and try again."
    default:
      if (status >= 500) {
        return "Something went wrong. Please try again later."
      }
      return fallback ?? "Something went wrong. Please try again."
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return messageForStatus(error.status, error.message)
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return "Something went wrong. Please try again later."
}

type ErrorBody = {
  message?: unknown
  error?: unknown
  code?: unknown
  errors?: unknown
  details?: unknown
}

export function parseApiError(body: unknown, status: number): ApiError {
  if (!body || typeof body !== "object") {
    return new ApiError(messageForStatus(status), status)
  }

  const data = body as ErrorBody
  const nestedError =
    data.error && typeof data.error === "object"
      ? (data.error as Record<string, unknown>)
      : null

  const rawMessage =
    readString(data.message) ??
    readString(data.error) ??
    readString(nestedError?.message)

  const code =
    readString(data.code) ?? readString(nestedError?.code) ?? "API_ERROR"

  const fieldErrors = {
    ...readFieldErrors(data.errors),
    ...readFieldErrors(data.details),
    ...readFieldErrors(nestedError?.details),
    ...readFieldErrors(nestedError?.errors),
  }

  const safeMessage =
    status >= 500 ? messageForStatus(status) : messageForStatus(status, rawMessage)

  return new ApiError(safeMessage, status, code, fieldErrors)
}
