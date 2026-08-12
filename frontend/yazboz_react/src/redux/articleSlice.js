import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/articles';

// Slider Makalelerini Çekme
export const fetchSliderArticles = createAsyncThunk(
  'articles/fetchSliderArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/sliderArticles`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Slider haberleri çekilemedi.');
    }
  }
);

export const getPageableArticles = createAsyncThunk(
  'articles/list',
  async ({page = 0,size = 10} = {},{ rejectWithValue })=>{
   try{
      const response = await axios.get(`${BASE_URL}/list`,{
      params: {
        page : page,
        size : size
      }
    });
    return response.data;
   }
  catch(error){
    return rejectWithValue(error.response?.data ||'Makeleler getirelemedi');
  }
}
);

export const getArticleDetail = createAsyncThunk(
  'articles/getArticleDetail',
  async (articleId,{rejectWithValue}) =>{
    try{
      const response = await axios.get(`${BASE_URL}/list/${articleId}`)
      return response.data;
    }
    catch(error){
    return rejectWithValue(error.response?.data ||'Makeleler getirelemedi');
  }
  }
)

export const getArticlesByType = createAsyncThunk(
  'articles/getByType',
  async(articleType,{rejectWithValue}) => {
    try{
      const response = await axios.get(`${BASE_URL}/type/${articleType}`)
      return response.data;
    }
    catch(error){
      return rejectWithValue(error.response?.data ||'Makeleler getirelemedi')
    }
  }
)

// Yeni Makale Oluşturma (Multipart Form-Data & Token'lı)
export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (formData, { getState, rejectWithValue }) => {
    try {
      // Token'ı Redux State'inden alıyoruz
      const token = getState().auth.token;

      const response = await axios.post(`${BASE_URL}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Makale oluşturulurken hata oluştu.');
    }
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    sliderArticles: [],
    typeArticles: [],
    loading: false,
    error: null,
    articlesPage: null,
    detailPage: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Slider
      .addCase(fetchSliderArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSliderArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.sliderArticles = action.payload;
      })
      .addCase(fetchSliderArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Article
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(getPageableArticles.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getPageableArticles.fulfilled, (state,action) =>{
        state.loading = false;
        state.articlesPage = action.payload;
      })
      .addCase(getPageableArticles.rejected, (state,action) =>{
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getArticleDetail.pending, (state) =>{
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticleDetail.fulfilled, (state,action) =>{
        state.loading = false;
        state.detailPage = action.payload;
      })
      .addCase(getArticleDetail.rejected, (state,action) =>{
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getArticlesByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticlesByType.fulfilled, (state, action) => {
        state.loading = false;
        state.typeArticles = action.payload;
      })
      .addCase(getArticlesByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      ;
  },
});

export default articleSlice.reducer;