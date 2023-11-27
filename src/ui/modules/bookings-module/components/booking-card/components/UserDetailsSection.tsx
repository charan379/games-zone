import React from "react";
import KeyValuePair from "./KeyValuePair";

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
        key={1}
      >
        <KeyValuePair label="User" value={user.userName} key={2} />
        {view === "ADMIN" && (
          <KeyValuePair
            label="User ID"
            value={user?.userId?.toString()}
            key={1}
          />
        )}
      </div>
      <KeyValuePair label="Email ID" value={user.email} key={2} />
    </>
  );
};

export default UserDetailsSection;
