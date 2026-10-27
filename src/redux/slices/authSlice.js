
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

// Đọc user đã lưu
const getSavedUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

// Đọc token đã lưu
const getSavedToken = () => {
  return localStorage.getItem("token");
};

// Đăng nhập bằng email và mật khẩu
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/Users/signin", credentials);
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

// Giữ tên signIn để tương thích với Login.jsx
export const signIn = login;

// Đăng nhập bằng Facebook
export const facebookLogin = createAsyncThunk(
  "auth/facebookLogin",
  async (facebookToken, { rejectWithValue }) => {
    try {
      const response = await api.post("/Users/facebooklogin", {
        facebookToken,
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

// Lấy thông tin đăng nhập từ response API
const saveAuthData = (state, response) => {
  const data = response?.content ?? response;

  // Tùy cấu trúc response thực tế của API
  const token =
    data?.accessToken ??
    data?.token ??
    data?.content?.accessToken ??
    null;

  const user =
    data?.user ??
    data?.userLogin ??
    data;

  state.user = user ?? null;
  state.token = token;
  state.error = null;

  if (state.user) {
    localStorage.setItem("user", JSON.stringify(state.user));
  }

  if (state.token) {
    localStorage.setItem("token", state.token);
  }
};

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: getSavedUser(),
    token: getSavedToken(),
    loading: false,
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Đăng nhập thường
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        saveAuthData(state, action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Đăng nhập Facebook
      .addCase(facebookLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(facebookLogin.fulfilled, (state, action) => {
        state.loading = false;
        saveAuthData(state, action.payload);
      })
      .addCase(facebookLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;


export default authSlice.reducer;
