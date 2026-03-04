import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUploadDocumentMutation,
  useChangePasswordMutation,
} from "@/redux/services/authApi";

import { setCredentials } from "@/redux/slices/authSlice";

import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Upload,
  Lock,
  FileText,
  Edit2,
  ShieldCheck,
  BarChart3,
  FileBadge,
} from "lucide-react";

import LegalBanner from "@/components/LegalBanner";
import Breadcrumb from "@/components/Breadcrumb";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);

  const [updateProfile] = useUpdateProfileMutation();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [uploadDocument] = useUploadDocumentMutation();
  const [changePassword] = useChangePasswordMutation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pan: "",
    aadhaar: "",
    gstin: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  /* -------------------------
     Autofill form from user
  ------------------------- */

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        pan: user.pan || "",
        aadhaar: user.aadhaar || "",
        gstin: user.gstin || "",
      });
    }
  }, [user]);

  /* -------------------------
     Profile Update
  ------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = await updateProfile(formData).unwrap();

    dispatch(
      setCredentials({
        user: updated.user,
        token: localStorage.getItem("authToken"),
      }),
    );

    setEditing(false);
  };

  /* -------------------------
     Avatar Upload
  ------------------------- */

  const handleAvatarUpload = async (e) => {
    const form = new FormData();
    form.append("avatar", e.target.files[0]);

    const res = await uploadAvatar(form).unwrap();

    dispatch(
      setCredentials({
        user: res.user,
        token: localStorage.getItem("authToken"),
      }),
    );
  };

  /* -------------------------
     Document Upload
  ------------------------- */

  const handleDocumentUpload = async (e, type) => {
    const form = new FormData();
    form.append("file", e.target.files[0]);
    form.append("type", type);

    await uploadDocument(form);
  };

  /* -------------------------
     Change Password
  ------------------------- */

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    await changePassword(passwordData);

    alert("Password updated");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
    });
  };

  const maskedAadhaar =
    user?.aadhaar?.slice(0, 4) + " **** ****" || "Not Provided";

  return (
    <>
      <LegalBanner title="Client Dashboard" />

      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <Breadcrumb current="Profile" />

          {/* -------------------------
             DASHBOARD CARDS
          ------------------------- */}

          <div className="grid md:grid-cols-4 gap-6 mt-10">
            <DashboardCard
              icon={<ShieldCheck />}
              title="Subscription"
              value={user?.subscription || "None"}
            />

            <DashboardCard
              icon={<FileBadge />}
              title="Documents"
              value="Uploaded"
            />

            <DashboardCard
              icon={<BarChart3 />}
              title="Compliance"
              value="Active"
            />

            <DashboardCard icon={<User />} title="Account" value="Verified" />
          </div>

          {/* -------------------------
             MAIN PROFILE CARD
          ------------------------- */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-3xl p-12 mt-10 border border-white/10"
          >
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-white">
                Account Information
              </h2>

              <button
                onClick={() => setEditing(!editing)}
                className="text-white hover:scale-110"
              >
                <Edit2 size={20} />
              </button>
            </div>

            {/* Avatar */}

            <div className="flex items-center gap-6 mb-12">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold text-white">
                  {user?.name?.charAt(0)}
                </div>
              )}

              <div>
                <h3 className="text-xl text-white">{user?.name}</h3>

                <p className="text-white/70 text-sm">
                  Member since {new Date(user?.createdAt).toDateString()}
                </p>

                <input
                  type="file"
                  onChange={handleAvatarUpload}
                  className="mt-3 text-sm text-white"
                />
              </div>
            </div>

            {/* Profile Info */}

            {!editing ? (
              <div className="grid md:grid-cols-2 gap-8 text-white">
                <Info icon={<Mail />} label="Email" value={user?.email} />

                <Info icon={<Phone />} label="Phone" value={user?.phone} />

                <Info icon={<MapPin />} label="Address" value={user?.address} />

                <Info icon={<CreditCard />} label="PAN" value={user?.pan} />

                <Info
                  icon={<CreditCard />}
                  label="Aadhaar"
                  value={maskedAadhaar}
                />

                <Info icon={<CreditCard />} label="GSTIN" value={user?.gstin} />
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-2 gap-6"
              >
                <Input
                  label="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                <Input
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />

                <Input
                  label="Address"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />

                <Input
                  label="PAN"
                  value={formData.pan}
                  onChange={(e) =>
                    setFormData({ ...formData, pan: e.target.value })
                  }
                />

                <Input
                  label="Aadhaar"
                  value={formData.aadhaar}
                  onChange={(e) =>
                    setFormData({ ...formData, aadhaar: e.target.value })
                  }
                />

                <Input
                  label="GSTIN"
                  value={formData.gstin}
                  onChange={(e) =>
                    setFormData({ ...formData, gstin: e.target.value })
                  }
                />

                <button className="md:col-span-2 bg-gradient-to-r from-[#511D43] to-[#901E3E] py-3 text-white rounded-xl">
                  Save Changes
                </button>
              </form>
            )}

            {/* Document Upload */}

            <div className="mt-16">
              <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                <FileText size={18} /> Upload Documents
              </h3>

              <div className="grid md:grid-cols-3 gap-6">
                <UploadBox
                  label="Upload ITR"
                  onChange={(e) => handleDocumentUpload(e, "ITR")}
                />

                <UploadBox
                  label="Upload GST"
                  onChange={(e) => handleDocumentUpload(e, "GST")}
                />

                <UploadBox
                  label="Other Docs"
                  onChange={(e) => handleDocumentUpload(e, "Other")}
                />
              </div>
            </div>

            {/* Password Change */}

            <div className="mt-16">
              <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                <Lock size={18} /> Change Password
              </h3>

              <form
                onSubmit={handlePasswordChange}
                className="grid md:grid-cols-2 gap-6"
              >
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />

                <Input
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />

                <button className="md:col-span-2 bg-gradient-to-r from-[#511D43] to-[#901E3E] py-3 text-white rounded-xl">
                  Update Password
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

/* ---------- UI Components ---------- */

const DashboardCard = ({ icon, title, value }) => (
  <div className="glass-effect p-6 rounded-xl text-white flex items-center gap-4">
    <div className="bg-white/20 p-3 rounded-lg">{icon}</div>

    <div>
      <p className="text-sm text-white/60">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

const Info = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-white/70">{icon}</div>

    <div>
      <p className="text-sm text-white/60">{label}</p>
      <p className="font-medium">{value || "—"}</p>
    </div>
  </div>
);

const Input = ({ label, value, onChange, type = "text" }) => (
  <div className="flex flex-col gap-2">
    <label className="text-white/70 text-sm">{label}</label>

    <input
      type={type}
      value={value}
      onChange={onChange}
      className="bg-white/10 border border-white/20 text-white p-3 rounded-xl"
    />
  </div>
);

const UploadBox = ({ label, onChange }) => (
  <label className="cursor-pointer bg-white/10 border border-white/20 rounded-xl p-6 text-center text-white hover:bg-white/20">
    <Upload className="mx-auto mb-2" />
    {label}
    <input type="file" hidden onChange={onChange} />
  </label>
);

export default Profile;
