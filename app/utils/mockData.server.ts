// This file is used only in development mode.
// It generates mock data using Faker.
// Imported on the server side in Remix, ensuring it's only utilized in loaders and not in the app.

import { faker } from "@faker-js/faker";
import type { EntityUser } from "~/utils/types";

function generateFakeUserEntity(): EntityUser[] {
  const users: EntityUser[] = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      id: i,
      username: faker.person.fullName(),
      email: faker.internet.email(),
      last_login_at: faker.date.past().toISOString(),
      role: faker.helpers.arrayElement(["hr", "support"]),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.past().toISOString(),
    });
  }
  return users;
}

export const mockData = {
  users: generateFakeUserEntity(),
};

export const returnDataOrThrowErrorOnProbability = <T>(
  probability: number,
  data: T,
  error: Error,
) => {
  const newProbability = probability / 100;
  if (Math.random() < newProbability) {
    return data;
  }
  throw error;
};
