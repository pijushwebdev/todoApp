import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const todoApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['get_tasks'],
  endpoints: (builder) => ({
    // getAllTasks: builder.query({
    // //   query: (name) => `pokemon/${name}`,
    // query: (priorityIndex) => {
    //   return{
    //     // url: `/tasks?priorityIndex=${priorityIndex}`,
    //     url: `/tasks`,
    //     method: 'GET',
    //     params: {priorityIndex}
    //   }
    // },
    // providesTags: ['get_tasks']
    // }),
    getAllTasks: builder.query({
    query: (priorityIndex) => {

      const params = new URLSearchParams();
      if(params){
        params.append('priorityIndex', priorityIndex)
      }

      return{
        url: `/tasks`,
        method: 'GET',
        params: params
      }
    },
    providesTags: ['get_tasks']
    }),

    addTask: builder.mutation({
      query: (data) => {
        return {
          url: '/add_task',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['get_tasks']
    }),

    updateTask: builder.mutation({
      query: (id) => {

        return {
          url: `/taskCompletion/${id}`,
          method: 'PATCH'
        }
      },
      invalidatesTags: ['get_tasks']
    }),

    deleteTask: builder.mutation({
      query: (_id) => {

        return{
          url: `/delete_task/${_id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: ['get_tasks']
    })

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTasksQuery, useAddTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = todoApi