// This file is used only in development mode.
// It generates mock data using Faker.
// Imported on the server side in Remix, ensuring it's only utilized in loaders and not in the app.

import { faker } from "@faker-js/faker";
import type { EntityAlumni, EntityUser } from "~/utils/types";

function generateFakeUserEntity(): EntityUser[] {
  const users: EntityUser[] = [];
  const generationCount = faker.number.int(100);
  for (let i = 1; i <= generationCount; i++) {
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

function generateFakeAlumniEntity(): EntityAlumni[] {
  const employees: EntityAlumni[] = [];
  const generationCount = faker.number.int(100);
  for (let i = 1; i <= generationCount; i++) {
    employees.push({
      id: i,
      emp_id: faker.string.alphanumeric(10),
      username: faker.person.fullName(),
      email: faker.internet.email(),
      last_login_at: faker.date.past().toISOString(),
      created_at: faker.date.past().toISOString(),
      updated_at: faker.date.past().toISOString(),
      fileCount: faker.number.int(20),
      requestCount: faker.number.int(20),
      last_working_date: faker.date.past().toISOString(),
      joining_date: faker.date
        .past({ years: faker.number.int({ min: 3, max: 10 }) })
        .toISOString(),
    });
  }
  return employees;
}

export const mockData = {
  users: generateFakeUserEntity(),
  alumni: generateFakeAlumniEntity(),
};

export const runWithProbability = <T>(
  probability: number,
  func: () => T,
  error: Error,
) => {
  const newProbability = probability / 100;
  if (Math.random() < newProbability) {
    return func();
  }
  throw error;
};
