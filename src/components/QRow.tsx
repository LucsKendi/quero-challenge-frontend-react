import { FC, ReactNode } from "react";

type QRowProps = {
  sidebar: ReactNode;
  children: ReactNode;
};

const QRow: FC<QRowProps> = ({ sidebar, children }) => {
  return (
    <div className="flex w-full px-4 lg:px-8">
      <div className="hidden lg:block w-[200px] shrink-0">
        {sidebar}
      </div>
      <div className="px-4 lg:px-8 flex-1">
        {children}
      </div>
    </div>
  );
};

export default QRow;
