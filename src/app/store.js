import { configureStore } from '@reduxjs/toolkit'
import favoriteSchemesReducer from '../features/favoriteSchemes/favoritesSlice'

export const store = configureStore({
    reducer: {
      favoriteSchemes: favoriteSchemesReducer,
    },
})


