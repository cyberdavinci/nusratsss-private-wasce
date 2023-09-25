import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  subjects: [],
  nationality: "",
  date_of_birth: "",
  gender: "",
  ethnicity: "",
  mobile: "",
  highest_level_of_education: "",
  year_of_completion: "",
  duration_of_study: "",
  occupation: "",
  marital_status: "",
  parent_guardian_name: "",
  relationship_to_applicant: "",
  contact_of_parent: "",
  nationality_of_parent: "",
  parent_guardian_name_2: "",
  relationship_to_applicant_2: "",
  contact_of_parent_2: "",
  nationality_of_parent_2: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    update: (state, action) => {
      Object.assign(state, action.payload);
      //   state.address = action.payload.address;
      //   state.nationality = action.payload.nationality;
      //   state.place_of_birth = action.payload.place_of_birth;
      //   state.gender = action.payload.gender;
      //   state.ethnicity = action.payload.ethnicity;
      //   state.mobile = action.payload.mobile;
      //   state.highest_level_of_education =
      //     action.payload.highest_level_of_education;
      //   state.year_of_completion = action.payload.year_of_completion;
      //   state.duration_of_study = action.payload.duration_of_study;
      //   state.occupation = action.payload.occupation;
      //   state.marital_status = action.payload.marital_status;
      //   //   family info /parent or guardian
      //   state.parent_guardian_name = action.payload.parent_guardian_name;
      //   state.relationship_to_applicant =
      //     action.payload.relationship_to_applicant;
      //   state.contact_of_parent = action.payload.contact_of_parent;
      //   state.nationality_of_parent = action.payload.nationality_of_parent;
      //   //   family info /parent or guardian 2
      //   state.parent_guardian_name_2 = action.payload.parent_guardian_name_2;
      //   state.relationship_to_applicant_2 =
      //     action.payload.relationship_to_applicant_2;
      //   state.contact_of_parent_2 = action.payload.contact_of_parent_2;
      //   state.nationality_of_parent_2 = action.payload.nationality_of_parent_2;
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
