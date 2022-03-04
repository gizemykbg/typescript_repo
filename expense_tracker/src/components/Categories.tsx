import React, { useState } from "react";
import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Select,
  Input,
  Space,
  Spin,
} from "antd";
import { Category, CategoryForm } from "../types/category";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../store/actions/categoryActions";
import { AppState } from "../store";
import { SketchPicker } from "react-color";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Mode } from "../types/general";

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
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    //as mode value create or update action creater func call
    if (mode === "new") dispatch(addCategory(form));
    else if (mode === "edit" && typeof updateId === "number")
      dispatch(updateCategory(form, updateId));
    else if (mode === "delete" && typeof deleteId === "number")
      dispatch(deleteCategory(deleteId));
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
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
    {
      title: "Action",
      key: "action",
      render: (text: string, category: Category) =>
        category.id === (form as any).id && loading ? (
          <Spin />
        ) : (
          <Space size="middle">
            <EditOutlined
              style={{ color: "#0390fc" }}
              onClick={() => {
                showModal("edit");
                setForm(category);
                setUpdateId(category.id);
              }}
            />
            <DeleteOutlined
              style={{ color: "#c20808" }}
              onClick={() => {
                showModal("delete");
                setDeleteId(category.id);
              }}
            />
          </Space>
        ),
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  });

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button onClick={() => showModal("new")} type="primary">
            New Category
          </Button>
        </div>

        <Modal
          title={
            mode === "new"
              ? "Create new Category"
              : mode === "edit"
              ? "Edit Category"
              : "delete Category"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !form.name }}
        >
          {mode === "new" || mode === "edit" ? (
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
                  value={form.type}
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
          ) : mode === "delete" ? (
            <>Are you sure?</>
          ) : null}
        </Modal>
      </div>
      <Table loading={loading} columns={columns} dataSource={data} />
    </>
  );
};

export default Categories;
