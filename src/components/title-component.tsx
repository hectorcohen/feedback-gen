import React from "react";

type Props = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  buttonAction?: React.ReactNode;
};

const TitleComponent: React.FC<Props> = ({
  title,
  description,
  icon,
  buttonAction,
}) => {
  return (
    <div className="flex flex-col gap-3 w-full my-4">
      <div className="flex justify-between items-center  w-full">
        <div className="flex justify-start items-center">
          <h1 className="text-4xl mr-2">{title}</h1>
          {icon && icon}
        </div>
        <div>{buttonAction && buttonAction}</div>
      </div>
      <p className="text-md text-secondary-foreground">{description}</p>
    </div>
  );
};

export default TitleComponent;
