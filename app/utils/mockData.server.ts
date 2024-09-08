// This file is used only in development mode.
// It generates mock data using Faker.
// Imported on the server side in Remix, ensuring it's only utilized in loaders and not in the app.

import { faker } from "@faker-js/faker";
import type { EntityAlumni, EntityJob, EntityUser } from "~/utils/types";

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

const mockDepartments = [
  "Human Resources",
  "Finance",
  "Marketing",
  "Sales",
  "Engineering",
  "Product Development",
  "Customer Support",
  "IT",
  "Legal",
  "Operations",
];

const mockJobTitle = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "Marketing Director",
  "UX Designer",
  "Financial Analyst",
  "Project Manager",
  "Sales Representative",
  "Graphic Designer",
  "Human Resources Manager",
  "Business Analyst",
  "Operations Manager",
  "Customer Support Specialist",
  "Software Developer",
  "Content Writer",
  "Network Administrator",
  "Digital Marketing Specialist",
  "Web Developer",
  "Quality Assurance Analyst",
  "Database Administrator",
  "IT Consultant",
  "Sales Manager",
  "Research Scientist",
  "Social Media Manager",
  "Civil Engineer",
  "Healthcare Administrator",
  "Public Relations Specialist",
  "Logistics Coordinator",
  "Accountant",
  "Legal Advisor",
  "Engineering Manager",
  "Customer Experience Manager",
  "Product Designer",
  "Investment Banker",
  "E-commerce Manager",
  "Administrative Assistant",
  "Technical Support Specialist",
  "AI Engineer",
  "Creative Director",
  "Financial Planner",
  "Content Strategist",
  "Business Development Manager",
  "Manufacturing Engineer",
  "Project Coordinator",
  "Data Analyst",
  "Insurance Underwriter",
  "Brand Manager",
  "Web Designer",
  "Learning and Development Specialist",
  "Research Analyst",
  "Public Affairs Manager",
];

const getRandomDepartment = () => faker.helpers.arrayElement(mockDepartments);

function generateFakeJobEntity(): EntityJob[] {
  const jobs: EntityJob[] = [];
  const generationCount = faker.number.int({ max: 20, min: 5 });
  for (let i = 1; i <= generationCount; i++) {
    jobs.push({
      id: faker.string.uuid(),
      created_by_id: faker.string.uuid(),
      created_by_name: faker.person.fullName(),
      created_on: faker.date.past().toISOString(),
      updated_on: faker.date.past().toISOString(),
      jobDescription: {
        title: faker.helpers.arrayElement(mockJobTitle),
        shortDescription: faker.lorem.sentence(),
        description: faker.lorem.sentence(),
        tags: Array(faker.number.int({ max: 20, min: 5 }))
          .fill(0)
          .map(() => {
            return faker.lorem.word();
          }),
        department: getRandomDepartment(),
        jobType: faker.helpers.arrayElement([
          "full-time",
          "part-time",
          "contract",
        ]),
        contractDurationMonths: faker.number.int({ min: 1, max: 10 }),
        area: faker.person.jobArea(),
        salary: {
          min: faker.number.int({ min: 10, max: 50 }) * 10000,
          max: faker.number.int({ min: 10, max: 50 }) * 10000,
          currency: faker.helpers.arrayElement(["$", "€", "£", "¥"]),
          show: faker.datatype.boolean(),
        },
        experience: {
          min: faker.number.int({ min: 2, max: 15 }),
          max: faker.number.int({ min: 2, max: 15 }),
        },
        skills: faker.lorem.sentence(),
        education: faker.lorem.sentence(),
      },
      expRequired: Array(faker.number.int({ max: 20, min: 5 }))
        .fill(0)
        .map(() => {
          return {
            blockId: faker.string.uuid(),
            type: faker.helpers.arrayElement([
              "experience",
              "skills",
              "education",
            ]),
            title: faker.lorem.sentence(),
            description: faker.lorem.sentence(),
            experienceInYears: faker.number.int({ min: 1, max: 20 }),
            required: faker.datatype.boolean(),
            goodToHave: faker.datatype.boolean(),
          };
        }),
      setting: {
        slug: faker.lorem.slug(),
        sharable: faker.datatype.boolean(),
        jobStatus: faker.helpers.arrayElement(["draft", "published"]),
      },
      companyInfo: {
        company: faker.company.name(),
        location: faker.location.streetAddress({ useFullAddress: true }),
        wesbite: faker.internet.url(),
        linkedin: faker.internet.url(),
        github: faker.internet.url(),
        twitter: faker.internet.url(),
      },
      customQuestionPanel: Array(faker.number.int({ max: 10, min: 2 }))
        .fill(0)
        .map(() => {
          return {
            blockId: faker.string.uuid(),
            type: faker.helpers.arrayElement([
              "text",
              "number",
              "select",
              "multiSelect",
            ]),
            title: faker.lorem.sentence(),
            description: faker.lorem.sentence(),
            constraint: {
              required: faker.datatype.boolean(),
              min: faker.number.int({ min: 1, max: 20 }),
              max: faker.number.int({ min: 1, max: 20 }),
            },
          };
        }),
    });
  }
  return jobs;
}

export const mockData = {
  users: generateFakeUserEntity(),
  alumni: generateFakeAlumniEntity(),
  jobs: generateFakeJobEntity(),
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
