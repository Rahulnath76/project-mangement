import { LogOut, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../lib/services/operations/auth.api";
import { AppDispatch, RootState } from "../store/store";
import { updateUserProfile } from "../lib/services/operations/profile.api";

const AccountInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.profile);

  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    bio: "",
    avatar: "",
  });

  // Initialize form from user data
  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.name || "",
        email: user.email || "",
        bio: user.bio || "Hello there! 👋 I'm excited to be here.",
        avatar: user.image || "",
      });
    }
  }, [user]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", form.fullName);
    formData.append("bio", form.bio);
    if (avatarFile) formData.append("avatar", avatarFile);

    dispatch(updateUserProfile(formData));

    setIsEditing(false);
  };

  // Logout
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  // Inside your component
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    // Dispatch password change action here
    // dispatch(updateUserPassword(passwordForm));

    console.log("Password update payload:", passwordForm);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsChangingPassword(false);
  };

  return (
    <div className="p-10 bg-white rounded-lg shadow-md mx-auto space-y-8 h-full w-full flex flex-col overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 w-full">
        <div>
          <h2 className="text-2xl font-semibold text-primary/85 mb-1">
            Account Details
          </h2>
          <p className="text-gray-800 text-sm">Manage your profile</p>
        </div>

        <button
          onClick={() => (isEditing ? handleSubmit() : setIsEditing(true))}
          disabled={isEditing || isChangingPassword}
          className={`flex items-center gap-2 px-4 py-1 rounded-md text-white text-sm font-medium transition-all duration-200 cursor-pointer ${
            isEditing || isChangingPassword
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <div className="text-xs text-white">
            <Pencil className="text-primary/85" />
          </div>
        </button>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <img
            src={
              avatarPreview ||
              form.avatar ||
              `https://ui-avatars.com/api/?name=${
                form.fullName || "User"
              }&background=random`
            }
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 p-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Pencil className="w-4 h-4 text-primary" />
            </label>
          )}
        </div>
        <div>
          <p className="font-medium text-gray-800">Profile Picture</p>
          <p className="text-sm text-gray-600">Choose your photo.</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">
            Name:
          </label>
          {isEditing ? (
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-1 border-2 border-primary/75 rounded focus:outline-none focus:ring-1 focus:ring-primary"
            />
          ) : (
            <p className="text-primary">{form.fullName}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">
            Email Address:
          </label>
          <p className="text-gray-800">{form.email}</p>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-1">
            Bio:
          </label>
          {isEditing ? (
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-1 border-2 border-primary/75 rounded focus:outline-none focus:ring-1 focus:ring-primary"
            />
          ) : (
            <p className="text-primary whitespace-pre-line">{form.bio}</p>
          )}
        </div>
      </div>

      {/* Change Password Section */}
      {!isEditing && (
        <div className="mt-6 pt-4">
          {!isChangingPassword ? (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="px-4 py-2 rounded-md bg-secondary/90 cursor-pointer text-primary font-medium hover:bg-secondary/80 transition-all duration-200"
            >
              Change Password
            </button>
          ) : (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChangeInput}
                  className="lg:w-100 px-4 py-1 border-2 border-primary/75 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChangeInput}
                  className="lg:w-100 px-4 py-1 border-2 border-primary/75 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChangeInput}
                  className="lg:w-100 px-4 py-1 border-2 border-primary/75 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={handleUpdatePassword}
                  className="px-4 py-2 rounded-md cursor-pointer bg-primary text-white hover:bg-primary/90 transition-all duration-200"
                >
                  Update Password
                </button>

                <button
                  onClick={() => setIsChangingPassword(false)}
                  className="px-4 py-2 rounded-md cursor-pointer bg-gray-300 text-gray-800 hover:bg-gray-400 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-auto">
        <div className="flex items-center justify-between text-sm text-gray-600 pt-4">
          <div className="flex flex-col">
            <p>
              <strong>Role:</strong> {user?.role || "User"}
            </p>
            <p>
              <strong>Joined:</strong>{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "--"}
            </p>
          </div>

          <div className="flex justify-end gap-2">
            {!isEditing ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-1 rounded-md bg-primary hover:bg-primary/90 cursor-pointer text-white transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="cursor-pointer bg-secondary/90 p-2 px-3 rounded-md text-primary font-bold"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
