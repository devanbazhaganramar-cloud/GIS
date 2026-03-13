import { createSlice } from "@reduxjs/toolkit";
import { Map } from "ol";
import type VectorLayer from "ol/layer/Vector";

interface mapServiceState {
  primaryMap: Map | null;
  primaryMapVectorLayer: VectorLayer[] | [];
}

const initialState: mapServiceState = {
  primaryMap: null,
  primaryMapVectorLayer: [],
};

export const mapServiceSlice = createSlice({
  name: "mapService",
  initialState,
  reducers: {
    setPrimaryMap: (state, action) => {
      state.primaryMap = action.payload;
    },
    setPrimaryMapVectorLayer: (state, action) => {
      state.primaryMapVectorLayer = [
        ...state.primaryMapVectorLayer,
        action.payload,
      ];
    },
  },
});

export const { setPrimaryMap, setPrimaryMapVectorLayer } =
  mapServiceSlice.actions;
export default mapServiceSlice.reducer;
