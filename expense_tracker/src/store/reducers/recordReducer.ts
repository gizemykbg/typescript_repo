import { RecordAction, RecordState } from "../../types/record";

const initialState: RecordState = {
  data: [],
  loading: false,
  error: "",
};

const recordReducer = (
  state: RecordState = initialState,
  action: RecordAction
): RecordState => {
  switch (action.type) {
    case "GET_RECORDS_START":
      return { ...state, loading: true, error: "" };
    case "GET_RECORDS_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case "GET_RECORDS_ERROR":
      return { ...state, loading: false, error: "Error fetching records" };
    case "ADD_RECORDS_START":
      return { ...state, loading: true, error: "" };
    case "ADD_RECORDS_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [action.payload, ...state.data],
      };
    case "ADD_RECORDS_ERROR":
      return { ...state, loading: false, error: "Error adding records" };
    case "UPDATE_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "UPDATE_RECORD_SUCCESS":
      return {
        ...state,
        loading: false,
        data: state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case "UPDATE_RECORD_ERROR":
      return { ...state, loading: false, error: "Error adding records" };
    case "DELETE_RECORD_START":
      return { ...state, loading: true, error: "" };
    case "DELETE_RECORD_SUCCESS":
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
        loading: false,
      };
    case "DELETE_RECORD_ERROR":
      return { ...state, loading: false, error: "Error deleting record" };

    default:
      return state;
  }
};
export default recordReducer;
