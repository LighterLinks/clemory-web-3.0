import { configureStore } from '@reduxjs/toolkit'
import menuSlice from './features/sidePanel/menuSlice'
import settingSlice from './features/global/settingSlice'
import editorSlice from './features/editor/editorSlice'
import nodeSlice from './features/canvas/nodeSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        menuSlice: menuSlice,
        settingSlice: settingSlice,
        editorSlice: editorSlice,
        nodeSlice: nodeSlice,
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']