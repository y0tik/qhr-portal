import { env } from "~/env.server";
import { faker } from "@faker-js/faker";
import type { Role } from "./types";

export const features = {
  enableOTP: () => env.ALUMNUX_OTP_STEP,
  enableMockLogin: () => ({
    enable: env.ALUMNUX_USE_MOCK_LOGIN,
    getMockUser: (uname: string) => {
      const role: Role = "employee";
      return {
        email: faker.internet.email(),
        atoken: faker.string.alphanumeric(30),
        cid: faker.string.uuid(),
        uname: uname,
        id: faker.string.uuid(),
        role,
      };
    },
  }),
};
