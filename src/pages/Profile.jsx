import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useRemoveAvatarMutation,
  useGetDocumentsQuery,
  useUploadDocumentMutation,
  useDeleteDocumentMutation,
  useChangePasswordMutation,
  useGetProfileQuery,
} from "@/redux/services/authApi";
import {
  useGetBillingHistoryQuery,
  useDownloadInvoiceMutation,
} from "@/redux/services/transactionApi";

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
  Trash2,
  Camera,
  Download,
} from "lucide-react";

import LegalBanner from "@/components/LegalBanner";
import Breadcrumb from "@/components/Breadcrumb";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [documents, setDocuments] = useState([]);

  const { data: profileData, refetch } = useGetProfileQuery();

  const { data: transactions = [] } = useGetBillingHistoryQuery();
  const [downloadInvoice] = useDownloadInvoiceMutation();

  const [updateProfile] = useUpdateProfileMutation();
  const [uploadAvatar] = useUploadAvatarMutation();
  const [removeAvatar] = useRemoveAvatarMutation();
  const { data: docs } = useGetDocumentsQuery();
  const [uploadDocument] = useUploadDocumentMutation();
  const [deleteDocumentApi] = useDeleteDocumentMutation();
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
  useEffect(() => {
    if (docs) {
      setDocuments(docs);
    }
  }, [docs]);
  /* PROFILE UPDATE */
  useEffect(() => {
    if (profileData) {
      dispatch(
        setCredentials({
          user: profileData,
          token: localStorage.getItem("authToken"),
        }),
      );
    }
    if (profileData?.documents) {
      console.log("Profile documents:", profileData.documents);
      setDocuments(profileData.documents);
    }
  }, [profileData]);

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

  /* AVATAR */

  const handleAvatarUpload = async (e) => {
    if (!e.target.files[0]) return;

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

  const handleRemoveAvatar = async () => {
    const res = await removeAvatar().unwrap();

    dispatch(
      setCredentials({
        user: res.user,
        token: localStorage.getItem("authToken"),
      }),
    );
  };

  /* DOCUMENT UPLOAD */

  const handleDocumentUpload = async (e, type) => {
    if (!e.target.files[0]) return;

    const form = new FormData();
    form.append("file", e.target.files[0]);
    form.append("type", type);

    const res = await uploadDocument(form).unwrap();

    setDocuments((prev) => [...prev, res.document]);
  };

  const deleteDocument = async (id) => {
    if (!window.confirm("Delete this document?")) return;

    await deleteDocumentApi(id).unwrap();

    setDocuments((prev) => prev.filter((doc) => doc._id !== id));
  };

  /* PASSWORD */
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await changePassword(passwordData).unwrap();

      alert("Password updated successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      alert(err?.data?.message || "Password update failed");
    }
  };

  const handleDownloadInvoice = async (id) => {
    const url = `/api/transaction/invoice/${id}`;
    window.open(url, "_blank");
  };

  const maskedAadhaar =
    user?.aadhaar?.slice(0, 4) + " **** ****" || "Not Provided";

  return (
    <>
      <LegalBanner title="Client Dashboard" />

      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <Breadcrumb current="Profile" />

          {/* DASHBOARD */}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
            <DashboardCard
              icon={<ShieldCheck />}
              title="Subscription"
              value={
                user?.subscription === "none"
                  ? "Free"
                  : user?.subscription.toUpperCase()
              }
            />
            <DashboardCard
              icon={<FileBadge />}
              title="Documents"
              value={documents.length}
            />
            <DashboardCard
              icon={<BarChart3 />}
              title="Compliance"
              value="Active"
            />
            <DashboardCard icon={<User />} title="Account" value="Verified" />
          </div>

          {/* PROFILE CARD */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-3xl p-6 md:p-10 lg:p-12 mt-10 border border-white/10"
          >
            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Account Information
              </h2>

              <button
                onClick={() => setEditing(!editing)}
                className="text-white hover:scale-110"
              >
                <Edit2 size={20} />
              </button>
            </div>

            {/* AVATAR */}

            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
              {/* Avatar Wrapper */}
              <div className="relative group w-24 h-24">
                {/* Avatar Image */}
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-24 h-24 rounded-full object-cover border border-white/20"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
                    {user?.name?.[0]?.toUpperCase() ||
                      user?.email?.[0]?.toUpperCase() ||
                      "U"}
                  </div>
                )}

                {/* Hover Overlay */}

                <div
                  className="
      absolute inset-0
      bg-black/60
      rounded-full
      flex items-center justify-center
      gap-3
      opacity-0
      group-hover:opacity-100
      transition-all duration-300
      "
                >
                  {/* Change Avatar */}

                  <label className="cursor-pointer bg-white/20 p-2 rounded-full hover:bg-blue-500 transition">
                    <Camera size={18} className="text-white" />

                    <input type="file" hidden onChange={handleAvatarUpload} />
                  </label>

                  {/* Remove Avatar */}

                  {user?.avatar && (
                    <button
                      onClick={handleRemoveAvatar}
                      className="bg-white/20 p-2 rounded-full hover:bg-red-500 transition"
                    >
                      <Trash2 size={18} className="text-white" />
                    </button>
                  )}
                </div>
              </div>

              {/* User Details */}

              <div>
                <h3 className="text-xl font-semibold text-white">
                  {user?.name || "Unknown User"}
                </h3>

                <p className="text-white/70 text-sm">
                  Member since {new Date(user?.createdAt).toDateString()}
                </p>
              </div>
              <div className="mt-2 flex items-center gap-3">
                <span className="bg-purple-600 text-white text-xs px-3 py-1 rounded-full">
                  {user?.subscription?.toUpperCase() || "FREE"}
                </span>

                {user?.subscriptionExpiry && (
                  <span className="text-white/60 text-sm">
                    Valid till
                    {new Date(user.subscriptionExpiry).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            {/* PROFILE VIEW */}

            {!editing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white">
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
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                <div className="md:col-span-2 flex justify-center mt-2">
                  <GradientButton type="submit">Save Changes</GradientButton>
                </div>
              </form>
            )}

            {/* DOCUMENTS */}

            <div className="mt-16">
              <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                <FileText size={18} /> Upload Documents
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {/* DOCUMENT LIST */}

            {documents.length > 0 && (
              <div className="mt-10">
                <h3 className="text-lg text-white mb-4">Uploaded Documents</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((doc) => {
                    const isImage =
                      doc?.fileUrl &&
                      /\.(jpg|jpeg|png|webp)$/i.test(doc.fileUrl);
                    return (
                      <div
                        key={doc._id}
                        className="bg-white/10 border border-white/20 rounded-xl p-4 text-white"
                      >
                        {isImage ? (
                          <img
                            src={doc.fileUrl}
                            className="w-full h-32 object-cover rounded mb-2"
                          />
                        ) : (
                          <FileText className="mb-2" />
                        )}

                        <p className="text-sm mb-2">{doc?.type}</p>

                        <div className="flex justify-between">
                          <a
                            href={doc?.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 text-sm hover:underline cursor-pointer"
                          >
                            View
                          </a>

                          <button
                            onClick={() => deleteDocument(doc._id)}
                            className="text-red-400"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* PASSWORD */}

            <div className="mt-16">
              <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                <Lock size={18} /> Change Password
              </h3>

              <form
                onSubmit={handlePasswordChange}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
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

                <div className="md:col-span-2 flex justify-center">
                  <GradientButton type="submit">Update Password</GradientButton>
                </div>
              </form>
            </div>
            {/* ================= BILLING HISTORY ================= */}

            <div className="mt-16">
              <h3 className="text-xl text-white mb-6 flex items-center gap-2">
                <CreditCard size={18} /> Billing History
              </h3>

              {transactions.length === 0 ? (
                <p className="text-white/60">No transactions found.</p>
              ) : (
                <div className="space-y-4">
                  {transactions.map((t) => (
                    <div
                      key={t._id}
                      className="bg-white/10 border border-white/20 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-white"
                    >
                      {/* Plan Info */}
                      <div>
                        <p className="font-semibold text-lg">
                          {t.planName?.toUpperCase()}
                        </p>

                        <p className="text-sm text-white/60">
                          {new Date(t.createdAt).toDateString()}
                        </p>
                      </div>

                      {/* Amount */}
                      <div className="text-lg font-semibold">₹{t.amount}</div>

                      {/* Invoice Icon Button */}
                      <button
                        onClick={() => handleDownloadInvoice(t._id)}
                        className="p-2 w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-600 
  hover:from-blue-600 hover:to-purple-700 
  text-white rounded-xl shadow-lg 
  transition-all duration-300 
  flex items-center justify-center"
                        title="Download Invoice"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

/* COMPONENTS */

const GradientButton = ({ children, type = "button" }) => (
  <button
    type={type}
    className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg w-full sm:w-auto"
  >
    {children}
  </button>
);

const DashboardCard = ({ icon, title, value }) => (
  <div className="glass-effect p-4 md:p-6 rounded-xl text-white flex items-center gap-3 md:gap-4">
    <div className="bg-white/20 p-2 md:p-3 rounded-lg">{icon}</div>
    <div>
      <p className="text-xs md:text-sm text-white/60">{title}</p>
      <p className="text-sm md:text-lg font-semibold">{value}</p>
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
