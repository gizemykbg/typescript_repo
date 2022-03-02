import React from "react";
import { Table, Tag } from "antd";
import { Category } from "../types/category";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/actions/categoryActions";
import { AppState } from "../store";

const Categories = () => {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );

  console.log({ data, loading, error });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      },
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  });

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Categories;
