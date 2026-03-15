import { createSlice } from "@reduxjs/toolkit";
import { Map } from "ol";
import type VectorLayer from "ol/layer/Vector";

interface mapServiceState {
  primaryMap: Map | null;
  primaryMapVectorLayer: VectorLayer[] | [];
  olMapList: Map[] | [];
}

const initialState: mapServiceState = {
  primaryMap: null,
  primaryMapVectorLayer: [],
  olMapList: [],
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
    setOlMapList: (state, action) => {
      state.olMapList = [...state.olMapList, action.payload];
    },
    removeMapFromList: (state, action) => {
      state.olMapList = state.olMapList.filter(
        (olMap) => action.payload != olMap.get("name"),
      );
    },
  },
});

export const {
  setPrimaryMap,
  setPrimaryMapVectorLayer,
  setOlMapList,
  removeMapFromList,
} = mapServiceSlice.actions;
export default mapServiceSlice.reducer;
