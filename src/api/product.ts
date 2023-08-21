/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IProduct } from '../interfaces/product'
// import { pause } from '../utils/pause'

const productApi = createApi({
    reducerPath: 'products',
    tagTypes: ['Product'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL_API,
        // fetchFn: async(...args) => {
        //     await pause(1000)
        //     return fetch(...args)
        // }
    }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<any, void>({
            query: () => 'products/all',
            providesTags: ['Product']
        }),
        getProducts: builder.query<any, void>({
            query: () => 'products',
            providesTags: ['Product']
        }),
        getProductById: builder.query<IProduct, string | number>({
            query: (id) => `product/${id}`,
            providesTags: ['Product']
        }),
        getProductBySlug: builder.query<IProduct, string>({
            query: (slug) => `product/detail/${slug}`,
            providesTags: ['Product']
        }),
        getTrashProducts: builder.query<IProduct[], void>({
            query: () => 'products/trash',
            providesTags: ['Product']
        }),
        addProduct: builder.mutation({
            query: (product) => ({
                url: 'product',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        removeProduct: builder.mutation<IProduct, string | number>({
            query: (id) => ({
                url: `product/${id}/remove`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
        forceDeleteProduct: builder.mutation<IProduct, string | number>({
            query: (id) => ({
                url: `product/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
        updateProduct: builder.mutation({
            query: (product) => ({
                url: `product/${product.id}/update`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        restoreProduct: builder.mutation<{message:string}, string | number>({
            query: (id) => ({
                url: `product/${id}/restore`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const {
    useGetAllProductsQuery,
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetProductBySlugQuery,
    useGetTrashProductsQuery,
    useAddProductMutation,
    useRemoveProductMutation,
    useForceDeleteProductMutation,
    useUpdateProductMutation,
    useRestoreProductMutation
} = productApi
export const productReducer = productApi.reducer
export default productApi