import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // 1. jwtDecode kütüphanesini import ettik

const BASE_URL = 'http://localhost:8081/api/auth';

// Token'ı güvenli şekilde decode eden yardımcı fonksiyon
const getUserFromToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    
    // Token'ın süresi dolmuş mu (exp kontrolü)?
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return null;
    }

    // JWT payload içindeki bilgileri dondurur (sub = username/nickname)
    return {
      username: decoded.sub,
      roles: decoded.roles || [],
      // Token'a backend'de eklediysen userId gibi custom alanlar da buraya gelir:
      id: decoded.userId || null, 
    };
  } catch (error) {
    console.error('Token decode hatasi:', error);
    localStorage.removeItem('token');
    return null;
  }
};

// İlk yüklenmede LocalStorage'daki token ve user verisi
const initialToken = localStorage.getItem('token') || null;
const initialUser = getUserFromToken(initialToken);

// 1. Login Thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, loginData);
      return response.data; // Backend'den dönen JWT Token String'i
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Giriş yapılırken bir hata oluştu.'
      );
    }
  }
);

// 2. Register Thunk
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, registerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Kayıt olunurken bir hata oluştu.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: initialToken,
    user: initialUser, // Initial state olarak token'dan decode edilen kullanıcı
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null; // Logout anında user sıfırlanır
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login İşlemleri
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // Gelen JWT String
        state.user = getUserFromToken(action.payload); // Token'dan user verisi okundu
        localStorage.setItem('token', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register İşlemleri
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;