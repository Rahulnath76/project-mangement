import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";

import { profile } from "../api";

const { UPDATE_PROFILE_API } = profile;

export const updateUserProfile = (formData: FormData) => {
  return async (dispatch: any) => {
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData);
      console.log(response);
      if (response.status !== 200) throw new Error("Error in updating profile");
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error in updateUserProfile", error);
      toast.error("Error in updating profile");
    }
  };
};
