import React, { FC } from "react";
import { useState } from "react";
import { User } from "./App";

interface TransactionProps {
  list: User[];
  onSendMoney: (
    senderId: number,
    receiverId: number,
    amount: number,
    isUndo: boolean
  ) => void;
}

const Transaction: FC<TransactionProps> = ({ list, onSendMoney }) => {
  const [sender, setSender] = useState<number>(0);
  const [receiver, setReceiver] = useState<number>(0);

  const handleSenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSender(Number(event.target.value));
  };
  const handleReceiverChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setReceiver(Number(event.target.value));
  };

  return (
    <div>
      <select onChange={handleSenderChange} name="sender" id="sender">
        {list?.map((item) => (
          <option value={item.id}>{item.fullName}</option>
        ))}
      </select>
      <select onChange={handleReceiverChange} name="receiver" id="receiver">
        {list?.map((item) => (
          <option value={item.id}>{item.fullName}</option>
        ))}
      </select>
      <button onClick={() => onSendMoney(sender, receiver, 100, false)}>
        Send Money
      </button>
    </div>
  );
};

export default Transaction;
