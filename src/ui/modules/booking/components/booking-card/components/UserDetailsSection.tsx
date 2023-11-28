import React from "react";
import KeyValuePair from "./KeyValuePair";
import { v4 as uuid4 } from 'uuid';

interface Props {
  user: Partial<User>;
  view: "ADMIN" | "USER";
}

const UserDetailsSection: React.FC<Props> = (props) => {
  const { user, view } = props;

  return (
    <>
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-10"
        key={uuid4()}
      >
        <KeyValuePair label="User" value={user.userName} key={uuid4()} />
        {view === "ADMIN" && (
          <KeyValuePair
            label="User ID"
            value={user?.userId?.toString()}
            key={uuid4()}
          />
        )}
      </div>
      <KeyValuePair label="Email ID" value={user.email} key={uuid4()} />
    </>
  );
};

export default UserDetailsSection;
