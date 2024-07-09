import { Link } from "@remix-run/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import React from "react";

type BreadcrumbItem = {
  name: string;
  to: string;
};

type BreadcrumbHelperProps = {
  items: BreadcrumbItem[];
};

export default function BreadcrumbHelper({ items }: BreadcrumbHelperProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((i) =>
          i.to && i.to != "" ? (
            <React.Fragment key={`br-${i.name}`}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={i.to}>{i.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </React.Fragment>
          ) : (
            <BreadcrumbItem key={`br-${i.name}`}>
              <BreadcrumbPage>{i.name}</BreadcrumbPage>
            </BreadcrumbItem>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
