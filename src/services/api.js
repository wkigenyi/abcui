import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const abcApi = createApi({
  reducerPath:"abcApi",
  baseQuery: fetchBaseQuery({
    baseUrl:"http://localhost:8001",
    credentials:"include"
  }),
  endpoints: builder =>({
    createAuthToken: builder.mutation({
      query: ({username,password}) =>({url:"auth/jwt/create/",body:{username,password},method:"POST"})
    }),
    retrieveUser: builder.query({
      query: () => `api/users/me`
    })
  })
})

export const {useCreateAuthTokenMutation,useLazyRetrieveUserQuery} = abcApi