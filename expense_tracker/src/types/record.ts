import { ThunkDispatch } from "redux-thunk";
import { Category } from "./category";

export interface RecordState {
  data: Record[];
  loading: boolean;
  error: string;
}

export interface Record {
  id: number;
  title: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
}

interface GET_START {
  type: "GET_RECORDS_START";
}
interface GET_SUCCESS {
  type: "GET_RECORDS_SUCCESS";
  payload: Record[];
}
interface GET_ERROR {
  type: "GET_RECORDS_ERROR";
}

export type RecordAction = GET_START | GET_ERROR | GET_SUCCESS;
export type RecordDispatch = ThunkDispatch<RecordState, void, RecordAction>;
