import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contact } from "../model/contact.model";

export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    contacts: builder.query<Contact[], void>({
      query: () => "/contact",
      providesTags: ["Contact"],
    }),
    contact: builder.query<Contact, string>({
      query: (id) => `/contact/${id}`,
      providesTags: ["Contact"],
    }),
    addContact: builder.mutation<{}, Contact>({
      query: (contact) => ({
        url: "/contact",
        method: "POST",
        body: contact,
      }),
      invalidatesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
    updateContact: builder.mutation<void, Contact>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useContactsQuery,
  useContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
