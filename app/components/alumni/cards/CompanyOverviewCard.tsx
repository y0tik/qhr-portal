import { ReactNode } from "react";
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
    typeof logo === "string" ? <img src={logo} alt={name} /> : logo;
  return (
    <Card className="bg-transparent text-white border relative overflow-clip">
      <div className="absolute inset-0">
        <img className="h-full w-full object-cover" src={bgImg} alt="" />
      </div>
      <div className="inset-0 absolute z-10 bg-gradient-to-t -mt-40 from-black to-transparent"></div>
      <CardContent className="text-center pb-0 relative z-20">
        <div className="mt-8 inline-block w-[250px] py-4 rounded-lg opacity-80 backdrop-blur-lg bg-white text-black">
          <div className="flex justify-center items-center text-lg font-medium mr-2 h-16 w-16">
            {companyLogo}
          </div>
        </div>
        <div className="mt-4 text-lg">{title}</div>
        <div className="mt-1 text-sm text-white opacity-60">{description}</div>
        <div className="grid grid-cols-4 pt-5 pb-6 -mx-5 px-10 bg-blue-800 text-white bg-opacity-50 mt-6">
          {stats.map((e) => (
            <div
              key={e.stat}
              className="flex flex-col items-center justify-center"
            >
              <dt className="mb-1 text-3xl font-extrabold">{e.stat}</dt>
              <dd className="text-white text-opacity-60 text-sm dark:text-gray-400">
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
      <>
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
        Acme Inc
      </>
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
