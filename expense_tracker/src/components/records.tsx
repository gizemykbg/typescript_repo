import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Space, Tag, Button, Modal, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  AddRecords,
  deleteRecord,
  GetRecords,
  updateRecord,
} from "../store/actions/recordActions";
import { Category } from "../types/category";
import { Record, RecordForm } from "../types/record";
import { Mode } from "../types/general";

import { getCategories } from "../store/actions/categoryActions";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};

const Records = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<RecordForm>(emptyForm);
  const [updateId, setUpdateId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data, loading, error } = useSelector(
    (state: AppState) => state.record
  );

  const { data: category } = useSelector((state: AppState) => state.categories);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
    if (mode === "new") dispatch(AddRecords(form));
    else if (mode === "edit" && typeof updateId === "number")
      dispatch(updateRecord(form, updateId));
    else if (mode === "delete" && typeof deleteId === "number")
      dispatch(deleteRecord(deleteId));
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
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"], record: Record) => {
        return (
          <>
            {Intl.NumberFormat("tr-TR", {
              style: "currency",
              currency: "TRY",
            }).format(amount)}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => {
        return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: Record) => {
        const updatedAtObject = new Date(updatedAt);
        return (
          <>
            {updatedAtObject.toLocaleDateString()}
            {updatedAtObject.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Record) => {
        const { title, amount } = record;
        const category_id = record.category.id;
        return (
          <Space size="middle">
            <EditOutlined
              style={{ color: "#0390fc" }}
              onClick={() => {
                showModal("edit");
                setForm({ title, amount, category_id });
                setUpdateId(record.id);
              }}
            />
            <DeleteOutlined
              style={{ color: "#c20808" }}
              onClick={() => {
                showModal("delete");
                setDeleteId(record.id);
              }}
            />
          </Space>
        );
      },
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetRecords());
    !category.length && dispatch(getCategories());
  }, []);

  const isFormValid = !(
    !form.title ||
    form.amount === 0 ||
    form.category_id === 0
  );

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
            New Record
          </Button>
        </div>
        <Modal
          title={
            mode === "new"
              ? "Create new Record"
              : mode === "edit"
              ? "Edit Record"
              : "delete Record"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: !(mode === "delete") && !isFormValid }}
        >
          {mode === "new" || mode === "edit" ? (
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
              <Form.Item label="Title" required>
                <Input
                  name="title"
                  value={form.title}
                  onChange={(e: any) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Amount" required>
                <Input
                  name="amount"
                  value={form.amount}
                  onChange={(e: any) =>
                    setForm({ ...form, amount: Number(e.target.value) })
                  }
                />
              </Form.Item>
              <Form.Item label="Category">
                <Select
                  defaultValue={form.category_id}
                  value={form.category_id}
                  onChange={(category_id) => setForm({ ...form, category_id })}
                >
                  <Select.Option value={0} disabled>
                    select a category
                  </Select.Option>
                  {category.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Form>
          ) : mode === "delete" ? (
            <>Are you sure?</>
          ) : null}
        </Modal>
      </div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
    </>
  );
};

export default Records;
