const messages = {
  ar: {
    NETWORK: "مشكلة في الاتصال بالسيرفر، حاول تاني",
    UNKNOWN: "حصل خطأ غير متوقع",
  },
  en: {
    NETWORK: "Connection problem with the server, please try again",
    UNKNOWN: "An unexpected error occurred",
  },
};

function handleBadRequest(data) {
  if (data && Array.isArray(data.errors)) {
    const fieldErrors = {};
    data.errors.forEach((e) => {
      if (e?.path && e?.msg) fieldErrors[e.path] = String(e.msg);
    });
    return {
      status: data.status,
      errorCode: data.errorCode,
      message: data.message,
      errors: fieldErrors,
    };
  }

  return {
    status: data.status,
    errorCode: data.errorCode,
    message: data.message,
  };
}

export function handleApiError(res, data, lang = "en") {
  const t = (code, fallback) => messages[lang]?.[code] || fallback || code;

  // Network / No response
  if (!res) {
    return { status: "error", errorCode: "network", message: t("NETWORK") };
  }

  const { status: statusCode } = res;
  const { status, message, errorCode } = data;

  const headers = Object.fromEntries(res?.headers?.entries());

  switch (statusCode) {
    case 429: {
      let retryAfterSec;
      if (headers?.["retry-after"]) {
        const n = parseInt(headers["retry-after"], 10);
        retryAfterSec = Number.isFinite(n) ? n : undefined;
      } else if (data?.retryAfter) {
        const n = parseInt(String(data.retryAfter), 10);
        retryAfterSec = Number.isFinite(n) ? n : undefined;
      }
      return {
        status,
        errorCode: errorCode || "rate_limited",
        message,
        retryAfter: retryAfterSec,
      };
    }

    case 401: {
      return {
        status,
        errorCode: errorCode || "invalidCredentials",
        message,
      };
    }

    case 400:
      return handleBadRequest(data);

    default:
      return {
        status,
        errorCode: errorCode || t("UNKNOWN"),
        message,
      };
  }
}
