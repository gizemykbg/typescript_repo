import { useState } from "react";
import { ListGroup } from "react-bootstrap";

import "./App.css";
import Transaction from "./Transaction";
import UserList from "./UserList";

export interface User {
  id: number;
  fullName: string;
  balance: number;
}
export interface HistoryItem {
  timestamp: Date;
  type: "error" | "success" | "warning";
  informationMessage: string;
}
export interface HistoryItemTransaction {
  timestamp: Date;
  type: "transaction";
  informationMessage: string;
  senderId: User["id"];
  receiverId: User["id"];
  amount: number;
  alreadyUndid: boolean;
}
const InitialUserList: User[] = [{ id: 1, fullName: "John Doe", balance: 100 }];

function App() {
  const [userList, setUserList] = useState<User[]>(InitialUserList);
  const [history, setHistory] = useState<
    Array<HistoryItem | HistoryItemTransaction>
  >([]);
  const [filterUserId, setFilterUserId] = useState<number>();
  const [filterType, setFilterType] = useState<
    "sender" | "receiver" | "both"
  >();

  const handleAddUser = (fullName: string, balance: number) => {
    setUserList([
      ...userList,
      {
        id: Math.ceil(Math.random() * 1000 + 1),
        fullName,
        balance,
      },
    ]);
    handleAddHistory({
      timestamp: new Date(),
      informationMessage: `User ${fullName} was added and has ${balance} balance`,
      type: "success",
    });
  };

  const handleDeleteUser = (id: number) => {
    const newList = userList.slice();
    const deletedUser = newList.find((item) => item.id === id);
    if (deletedUser) {
      newList.splice(newList.indexOf(deletedUser), 1);
      setUserList(newList);
      handleAddHistory({
        timestamp: new Date(),
        informationMessage: `User ${deletedUser?.fullName} was deleted`,
        type: "warning",
      });
    }
  };

  const handleAddHistory = (props: HistoryItem | HistoryItemTransaction) => {
    setHistory([...history, props]);
  };

  const handleTransaction = (
    senderId: number,
    receiverId: number,
    amount: number,
    isUndo: boolean
  ) => {
    const newUserList = userList.slice();
    const sender = newUserList.find((item) => item.id === senderId);
    const receiver = newUserList.find((item) => item.id === receiverId);
    if (sender && receiver) {
      sender.balance = sender.balance - amount;
      receiver.balance = receiver.balance + amount;
      handleAddHistory({
        timestamp: new Date(),
        type: "transaction",
        informationMessage: `${sender?.fullName} sent ${amount} to ${receiver?.fullName}`,
        senderId: sender?.id,
        receiverId: receiver?.id,
        amount: amount,
        alreadyUndid: isUndo,
      });
    }
    setUserList(newUserList);
  };

  const renderHistory = () => {
    const mapper = (item: HistoryItem | HistoryItemTransaction) => (
      <p className={item.type}>
        {item.timestamp.toLocaleString() + " " + item.informationMessage}
        {item.type === "transaction" && !item.alreadyUndid && (
          <button
            onClick={() =>
              handleTransaction(item.receiverId, item.senderId, 100, true)
            }
          >
            Undo
          </button>
        )}
      </p>
    );
    if (filterType) {
      history
        .filter((item) => {
          let controll: Boolean;
          if (item.type === "transaction") {
            if (filterType === "sender") {
              controll = item.senderId === filterUserId;
            }
            if (filterType === "receiver") {
              controll = item.receiverId === filterUserId;
            }
            if (filterType === "both") {
              controll =
                item.receiverId === filterUserId ||
                item.senderId === filterUserId;
            }
          }
          return controll;
        })
        .map(mapper);
    } else {
      return history.map(mapper);
    }
  };

  return (
    <div className="app">
      <div id="user-list">
        <UserList
          list={userList}
          onSave={handleAddUser}
          onDelete={handleDeleteUser}
        />
      </div>
      <div id="history">
        <div>
          <Transaction list={userList} onSendMoney={handleTransaction} />
        </div>
        <div>
          <h1>Filter</h1>
          <select
            name="filter"
            id="filter"
            onChange={(event) => {
              setFilterUserId(Number(event.target.value));
            }}
          >
            {userList?.map((item) => (
              <option value={item.id}>{item.fullName}</option>
            ))}
          </select>
          <button onClick={() => setFilterType("sender")}>isSender</button>
          <button onClick={() => setFilterType("receiver")}>isReceiver</button>
          <button onClick={() => setFilterType("both")}>
            those who are both
          </button>
          <button onClick={() => setFilterType(undefined)}>Reset Filter</button>
        </div>
      </div>
      {renderHistory()}
    </div>
  );
}

export default App;
