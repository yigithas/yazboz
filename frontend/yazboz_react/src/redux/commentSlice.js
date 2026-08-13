import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/comments';

// 1. Makaleye Ait Yorumları Çekme
export const fetchCommentsByArticle = createAsyncThunk(
  'comments/fetchCommentsByArticle',
  async (articleId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/article/${articleId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Yorumlar yüklenirken bir hata oluştu.'
      );
    }
  }
);

// 2. Yeni Yorum Ekleme (Token Zorunlu)
export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ articleId, content }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth?.token || localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('Yorum yapmak için giriş yapmalısınız.');
      }

      const response = await axios.post(
        `${BASE_URL}/add`,
        { articleId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data; // Dönen CommentResponseDto
    } catch (error) {
      return rejectWithValue(
        error.response?.data || 'Yorum eklenirken bir hata oluştu.'
      );
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
    addLoading: false,
    addError: null,
  },
  reducers: {
    clearCommentError: (state) => {
      state.error = null;
      state.addError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Comments
      .addCase(fetchCommentsByArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Comment
      .addCase(addComment.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addLoading = false;
        // Yeni eklenen yorumu listenin başına yerleştiriyoruz
        state.comments.unshift(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload;
      });
  },
});

export const { clearCommentError } = commentSlice.actions;
export default commentSlice.reducer;
