import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Slash } from "lucide-react";

export interface BreadcrumbData {
  title: string;
  navigation: string;
  disabled?: boolean;
  separator?: boolean;
}

type Props = {
  data: BreadcrumbData[];
};

const Breadcrumbs: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {data &&
            data?.map(({ title, navigation, disabled, separator }, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <Link href={navigation}>
                    <Button disabled={disabled} className="p-0" variant="link">
                      {title}
                    </Button>
                  </Link>
                </BreadcrumbItem>
                {separator && (
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                )}
              </React.Fragment>
            ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;
