import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { analyzeIncident } from "../utils/aiSimulator";

export const submitEmergencyReport = createAsyncThunk(
  "emergency/submitReport",
  async ({ description, files }, { rejectWithValue }) => {
    try {
      const result = await analyzeIncident(description, files);
      return result;
    } catch (error) {
      return rejectWithValue("AI Analysis Failed");
    }
  },
);

const initialState = {
  currentReport: null, // { id, type, severity, summary, timestamp, statusString }
  history: [],
  isAnalyzing: false,
  error: null,
  activeStep: 0, // 0: Home, 1: Report Form, 2: Analyzing, 3: Status Tracking

  // Status tracking simulation
  teamStatus: {
    police: "idle", // idle, notified, dispatched, on-scene
    fire: "idle",
    ambulance: "idle",
  },
};

const emergencySlice = createSlice({
  name: "emergency",
  initialState,
  reducers: {
    resetEmergency: (state) => {
      state.currentReport = null;
      state.activeStep = 0;
      state.teamStatus = { police: "idle", fire: "idle", ambulance: "idle" };
    },
    updateTeamStatus: (state, action) => {
      const { team, status } = action.payload; // team: 'police', status: 'dispatched'
      if (state.teamStatus[team]) {
        state.teamStatus[team] = status;
      }
    },
    setActiveStep: (state, action) => {
      state.activeStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEmergencyReport.pending, (state) => {
        state.isAnalyzing = true;
        state.error = null;
        state.activeStep = 2; // Move to Analyzing view
      })
      .addCase(submitEmergencyReport.fulfilled, (state, action) => {
        state.isAnalyzing = false;
        state.currentReport = {
          ...action.payload,
          statusString: "Report Received",
        };
        state.history.push(action.payload);
        state.activeStep = 3; // Move to Status view

        // Auto-set initial team status based on detected types
        action.payload.type.forEach((t) => {
          if (t === "Police") state.teamStatus.police = "notified";
          if (t === "Fire Station") state.teamStatus.fire = "notified";
          if (t === "Ambulance") state.teamStatus.ambulance = "notified";
        });
      })
      .addCase(submitEmergencyReport.rejected, (state, action) => {
        state.isAnalyzing = false;
        state.error = action.payload;
      });
  },
});

export const { resetEmergency, updateTeamStatus, setActiveStep } =
  emergencySlice.actions;
export default emergencySlice.reducer;
