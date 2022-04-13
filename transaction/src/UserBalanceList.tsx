import React from "react";
import { User } from "./App";

interface UserBalanceListProps {
  list: User[];
  onDelete: (id: number) => void;
}

const UserBalanceList: React.FunctionComponent<UserBalanceListProps> = ({
  list,
  onDelete,
  ...props
}) => {
  return (
    <div>
      {list.map((item) => (
        <li>
          {item.fullName} - {item.balance}
          <button type="button" onClick={() => onDelete(item.id)}>
            delete User
          </button>
        </li>
      ))}
    </div>
  );
};

export default UserBalanceList;
