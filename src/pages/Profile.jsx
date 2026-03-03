import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateProfileMutation } from "@/redux/services/authApi";
import { setCredentials } from "@/redux/slices/authSlice";
import { User, Mail, Edit2 } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [updateProfile] = useUpdateProfileMutation();

  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateProfile(formData).unwrap();
      dispatch(setCredentials(updated));
      setEditing(false);
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#511D43] to-[#901E3E] flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#511D43]">My Profile</h2>
          <button
            onClick={() => setEditing(!editing)}
            className="text-[#511D43] hover:scale-110 transition"
          >
            <Edit2 size={20} />
          </button>
        </div>

        {!editing ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <User className="text-[#901E3E]" />
              <span className="font-medium">{user?.name}</span>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="text-[#901E3E]" />
              <span className="font-medium">{user?.email}</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border rounded-lg p-3"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#511D43] to-[#901E3E] text-white py-3 rounded-xl font-semibold"
            >
              Save Changes
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
