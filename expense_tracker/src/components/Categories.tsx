import React, { useState } from "react";
import { Table, Tag, Button, Modal, Form, Select, Input } from "antd";
import { Category, CategoryForm } from "../types/category";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getCategories } from "../store/actions/categoryActions";
import { AppState } from "../store";
import { SketchPicker } from "react-color";

type Mode = "new" | "edit";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};
const Categories = () => {
  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    //as mode value create or update action creater func call
    dispatch(addCategory(form));
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
  };

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
      <div>
        <Button onClick={() => showModal("new")} type="primary">
          new Category
        </Button>
        <Modal
          title={mode === "new" ? "Create new Category" : "Update Category"}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !form.name }}
        >
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Form.Item label="Category Name" required>
              <Input
                name="name"
                value={form.name}
                onChange={(e: any) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item label="Category Type">
              <Select
                defaultValue="expense"
                onChange={(type: any) => setForm({ ...form, type })}
              >
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Color">
              <SketchPicker
                color={form.color}
                onChange={(color) => setForm({ ...form, color: color.hex })}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Categories;
