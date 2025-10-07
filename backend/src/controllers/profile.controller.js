import User from "../models/user.model.js";

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    const { name, bio } = req.body;
    const updatedData = { name, bio };
    const avatar = req.file ? req.file.path : null;

    if (avatar) {
      updatedData.avatar = avatar;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true, runValidators: true }
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { updateProfile };
