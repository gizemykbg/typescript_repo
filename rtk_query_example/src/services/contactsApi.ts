import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../model/contact.model";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5000" }),
  endpoints: (builder) => ({
    contacts: builder.query<Contact[], void>({
      query: () => "/contacts",
    }),
  }),
});
export const { useContactsQuery } = contactsApi;
