import type { ReactNode } from "react";
import { Card, CardContent } from "~/components/ui/card";

type Props = {
  bgImg: string;
  logo: ReactNode | string;
  name: string;
  title: string;
  description: string;
  stats: {
    stat: string;
    name: string;
  }[];
};

export const CompanyOverviewCard = ({
  bgImg,
  logo,
  name,
  description,
  stats,
  title,
}: Props) => {
  const companyLogo =
    typeof logo === "string" ? (
      <img className="max-h-[80px] w-[250px]" src={logo} alt={name} />
    ) : (
      logo
    );
  return (
    <Card className="relative overflow-clip border bg-transparent text-white">
      <div className="absolute inset-0">
        <img className="h-full w-full object-cover" src={bgImg} alt="" />
      </div>
      <div className="-mt-40 absolute inset-0 z-10 bg-gradient-to-t from-black to-transparent" />
      <CardContent className="relative z-20 pb-0 text-center">
        <div className="mt-8 inline-block rounded-lg bg-white px-4 py-4 text-black opacity-80 backdrop-blur-lg">
          {companyLogo}
        </div>
        <div className="mt-3 text-lg">{title}</div>
        <div className="mt-1 px-5 text-sm text-white opacity-60">
          {description}
        </div>
        <div className="-mx-5 mt-6 grid grid-cols-4 bg-blue-800 bg-opacity-50 px-10 pt-5 pb-6 text-white">
          {stats.map((e) => (
            <div
              key={e.stat}
              className="flex flex-col items-center justify-center"
            >
              <dt className="mb-1 font-extrabold text-3xl">{e.stat}</dt>
              <dd className="text-sm text-white text-opacity-60 dark:text-gray-400">
                {e.name}
              </dd>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export const MockedCompanyOverviewCard = () => (
  <CompanyOverviewCard
    name="Acme Inc"
    bgImg="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    logo={
      <div className="flex w-[200px] items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-16 w-16"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        <span className="font-semibold text-2xl">Acme Inc</span>
      </div>
    }
    title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa nesciunt quasi ea odit. Nobis laboriosam, rem pariatur blanditiis necessitatibus ex? Rerum odio voluptatum modi vero accusamus quo necessitatibus incidunt. Id."
    stats={[
      { stat: "73M+", name: "Developers" },
      { stat: "4M+", name: "Organizations" },
      { stat: "120+", name: "Offices / Branches" },
      { stat: "30+", name: "Years in Industry" },
    ]}
  />
);
