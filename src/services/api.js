import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {Mutex} from "async-mutex"
import { logout, setAuth } from "src/redux/features/authSlice"
import { getCookie } from "../utils/getCookieByName"



const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl:"http://localhost:8001",
  credentials:"include"
})
export const abcApi = createApi({
  reducerPath:"abcApi",
  baseQuery: async(args,api,extraOptions) =>{
    await mutex.waitForUnlock()
    let result = await baseQuery(args,api,extraOptions)
    
	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
      const token = getCookie('csrftoken')
			try {
				const refreshResult = await baseQuery(
					{
						url: 'auth/jwt/refresh/',
						method: 'POST',
            headers:{"X-CSRFToken":token}
					},
					api,
					extraOptions
				);
				if (refreshResult.data) {
					api.dispatch(setAuth());

					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}
	return result;

  },
  endpoints: builder =>({
    createAuthToken: builder.mutation({
      query: ({username,password}) =>({url:"auth/jwt/create/",body:{username,password},method:"POST"})
    }),
    retrieveUser: builder.query({
      query: () => `api/users/me/`
    }),
    logout: builder.mutation({
      query: () =>({
        url:"logout/",
        method:"POST"
      })
    }),
    getUnReconciledData: builder.query({
      query: () => `api/unreconciled_data`
    }),
    getReconciledData: builder.query({
      query: () => `api/reconciled_data`
    }),
    getExceptions: builder.query({
      query: () => `api/exceptions`
    }),
    uploadFile: builder.mutation({
      
      query: (file) =>{
        const csrftoken = getCookie("csrftoken")
        return {
          url:`api/files/`,
          body:file,
          method:"POST",
          headers:{
            /* "Content-Type":"multipart/form-data", */
            "X-CSRFToken":csrftoken
          }
        }
        
      }
    })
  })
})

export const {
  useCreateAuthTokenMutation,
  useLazyRetrieveUserQuery,
  useGetReconciledDataQuery,
  useGetUnReconciledDataQuery,
  useGetExceptionsQuery,
  useUploadFileMutation,
} = abcApi