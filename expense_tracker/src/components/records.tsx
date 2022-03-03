import { Table } from "antd";
import { useSelector } from "react-redux";
import { AppState } from "../store";

const records = () => {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );

  return <Table loading={loading} columns={} dataSource={data} />;
};

export default records;
