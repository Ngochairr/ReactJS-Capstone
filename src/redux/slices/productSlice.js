
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// Lấy danh sách sản phẩm hoặc tìm kiếm theo từ khóa
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (keyword = "", { rejectWithValue }) => {
    try {
      const response = await api.get("/Product", {
        params: { keyword },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          error.message
      );
    }
  }
);

// Lấy danh sách danh mục
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/Product/getAllCategory");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          error.message
      );
    }
  }
);

// Lọc sản phẩm theo danh mục
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchProductsByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        "/Product/getProductByCategory",
        {
          params: { categoryId },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.response?.data ||
          error.message
      );
    }
  }
);

// Chuẩn hóa dữ liệu danh sách từ response API
const getList = (response) => {
  let data = response?.content ?? response;

  if (data && !Array.isArray(data)) {
    data =
      data.items ??
      data.products ??
      data.categories ??
      data.content ??
      [];
  }

  return Array.isArray(data) ? data : [];
};

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    categories: [],
    loading: false,
    categoriesLoading: false,
    error: null,
    categoriesError: null,
  },

  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Danh sách sản phẩm
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = getList(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Danh mục
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesLoading = true;
        state.categoriesError = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categoriesLoading = false;
        state.categories = getList(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categoriesLoading = false;
        state.categoriesError =
          action.payload || action.error.message;
      })

      // Sản phẩm theo danh mục
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductsByCategory.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products = getList(action.payload);
        }
      )
      .addCase(
        fetchProductsByCategory.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message;
        }
      );
  },
});

export const { clearProductError } = productSlice.actions;

export default productSlice.reducer;
