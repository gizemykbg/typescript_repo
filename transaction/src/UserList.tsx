import React from "react";
import UserBalanceList from "./UserBalanceList";
import { User } from "./App";
import { useState } from "react";

interface UserListProps {
  list: User[];
  //   setUserList: React.Dispatch<React.SetStateAction<User[]>>;
  onSave: (fullName: string, balance: number) => void;
  onDelete: (id: number) => void;
}

const UserList: React.FunctionComponent<UserListProps> = ({
  list,
  onSave,
  onDelete,
  ...props
}) => {
  const [name, setName] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };
  const handleChangeBalance = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(Number(e.currentTarget.value));
  };
  const handleAddUser = () => {
    onSave(name, balance);
    setName("");
    setBalance(0);
  };

  return (
    <>
      <div id="user-form">
        <input
          value={name}
          type="text"
          name="user-name"
          onChange={handleChangeName}
        />
        <input
          value={balance}
          type="text"
          name="user-balance"
          onChange={handleChangeBalance}
        />
        <button type="button" onClick={handleAddUser}>
          Add User
        </button>
      </div>
      <div id="user-balance-list">
        dd
        <UserBalanceList list={list} onDelete={onDelete} />
      </div>
      {console.log("userlist.tsx", list)}
    </>
  );
};

export default UserList;
