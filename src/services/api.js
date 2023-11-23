import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {Mutex} from "async-mutex"
import { logout, setAuth } from "src/redux/features/authSlice"
import { getCookie } from "../utils/getCookieByName"





const mutex = new Mutex()
const baseUrl = process.env.URL







const baseQuery = fetchBaseQuery({
  baseUrl:baseUrl,
  prepareHeaders: headers =>{
    const accessToken = localStorage.getItem("accessToken")
    headers.set("Authorization",`Bearer ${accessToken}`) 
    
    return headers;
  }
  //credentials:"include"
})
export const abcApi = createApi({
  reducerPath:"abcApi",
  baseQuery: async(args,api,extraOptions) =>{
    await mutex.waitForUnlock()
    let result = await baseQuery(args,api,extraOptions)
    
	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
      const refreshToken = localStorage.getItem("refreshToken")
			try {
				const refreshResult = await baseQuery(
					{
						url: 'api/token/refresh/',
						method: 'POST',
            body:{refresh:refreshToken}
					},
					api,
					extraOptions
				);
				if (refreshResult.data) {
					api.dispatch(setAuth());
          localStorage.setItem("accessToken",refreshResult.data.access)
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
      query: ({username,password}) =>({url:"api/token/",body:{username,password},method:"POST"})
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
      query: () => `recon/unreconciled_data/`
    }),
    getReconciledData: builder.query({
      query: () => `recon/reconciled_data/`
    }),
    getExceptions: builder.query({
      query: () => `recon/exceptions/`
    }),
    getReversals: builder.query({
      query: () => `recon/reversals/`
    }),
    getReconStats: builder.query({
      query: () => `recon/reconstats/`
    }),

    createSettlementCsvFile: builder.mutation({
      query: (batch) =>({url:"settlementcsv_files/",body:{batch},method:"POST"})
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
    }),
    uploadReconFile: builder.mutation({
      
      query: (file) =>{
        const csrftoken = getCookie("csrftoken")
        return {
          url:`recon/reconcile/`,
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
  useCreateSettlementCsvFileMutation,
  useGetReconciledDataQuery,
  useGetUnReconciledDataQuery,
  useGetExceptionsQuery,
  useUploadFileMutation,
  useUploadReconFileMutation,
  useGetReconStatsQuery,
  useGetReversalsQuery
} = abcApi