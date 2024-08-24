import { env } from "~/env.server";
import { faker } from "@faker-js/faker";
import type { Role, User } from "./types";

export const features = {
  enableMockLogin: () => {
    return {
      enable: env.QHR_MOCK_LOGIN,
      getMockUser: (uname?: string) => {
        const user: User = {
          cid: faker.string.uuid(),
          email: faker.internet.email(),
          id: faker.string.uuid(),
          role: "admin",
          uname: uname ?? faker.person.fullName(),
        };
        return user;
      },
    };
  },
};
