const ERROR_MAP: { [key: string]: string } = {
  "1ZVGUE": "Please login to continue",
  "207H2L": "Session expired, Please login to continue",
  "204l2X": "OTP Timeout, Please login again",
  default: "Please try again later",
};

export const getMessageForCode = (code: string | null) => {
  if (!code) return "";
  return ERROR_MAP[code] ? ERROR_MAP[code] : ERROR_MAP.default;
};
