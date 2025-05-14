import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'

export const fetchFavoriteSchemes = createAsyncThunk('favoriteSchemes/fetchFavoriteSchemes', async () => {
    const cachedData = localStorage.getItem('favoriteSchemes');
    if (cachedData) {
        // Use the cached data instead of making a new request
        const data = JSON.parse(cachedData);
        return data;
    }
    else {
        return []
    }

      
})

const initialState = {
    favoriteSchemes: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const favoriteSchemesSlice = createSlice({
    name: 'favoriteSchemes',
    initialState,
    reducers: {
      created: {
        reducer(state, action) {
          state.favoriteSchemes.push(action.payload);
        },
        prepare(schemeSwatch, schemeType, swatchNumb) {
            return {
                payload: {
                    id:nanoid(),
                    isFavorite:true,
                    swatch:schemeSwatch,
                    type:schemeType,
                    numb:swatchNumb,
                }
            }
        }
      },
    deleted: (state, action) => {
        const { schemeId } = action.payload
        state.favoriteSchemes = state.favoriteSchemes.filter((scheme) => scheme.id !== schemeId)
    },
    deletedAll: (state) => {
        console.log('delete all')
        state.favoriteSchemes = [];
    }
    },
    extraReducers(builder) {
      builder
        .addCase(fetchFavoriteSchemes.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchFavoriteSchemes.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.favoriteSchemes = action.payload
        })
        .addCase(fetchFavoriteSchemes.rejected, (state, action) => {
            state.status = 'failed'
            state.favoriteSchemes = action.error.message
        })
  }
});

export const { created, deleted, deletedAll } = favoriteSchemesSlice.actions;

export const selectAllFavoriteSchemes = (state) => state.favoriteSchemes.favoriteSchemes;


export default favoriteSchemesSlice.reducer
