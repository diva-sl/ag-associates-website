import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LegalBanner from "@/components/LegalBanner";
import Breadcrumb from "@/components/Breadcrumb";

import ProfileHeader from "@/components/profile/ProfileHeader";
import DashboardStats from "@/components/profile/DashboardStats";
import SubscriptionCard from "@/components/profile/SubscriptionCard";
import PersonalInfo from "@/components/profile/PersonalInfo";
import KYCSection from "@/components/profile/KYCSection";
import DocumentsSection from "@/components/profile/DocumentsSection";
import PasswordSection from "@/components/profile/PasswordSection";
import BillingHistory from "@/components/profile/BillingHistory";

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

import { useGetBillingHistoryQuery } from "@/redux/services/transactionApi";

import { setCredentials } from "@/redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const token = localStorage.getItem("authToken");

  const [editing, setEditing] = useState(false);

  const [documents, setDocuments] = useState([]);

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
    confirmPassword: "",
  });

  /* ================= API ================= */

  const { data: profileData } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  const { data: docs = [] } = useGetDocumentsQuery(undefined, {
    skip: !token,
  });

  const { data: transactions = [] } = useGetBillingHistoryQuery();

  const [updateProfile] = useUpdateProfileMutation();

  const [uploadAvatar] = useUploadAvatarMutation();

  const [removeAvatar] = useRemoveAvatarMutation();

  const [uploadDocument] = useUploadDocumentMutation();

  const [deleteDocumentApi] = useDeleteDocumentMutation();

  const [changePassword] = useChangePasswordMutation();

  /* ================= PROFILE LOAD ================= */

  useEffect(() => {
    if (profileData) {
      dispatch(
        setCredentials({
          user: profileData,
          token,
        }),
      );
    }
  }, [profileData, dispatch, token]);

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
    setDocuments(docs || []);
  }, [docs]);

  /* ================= PROFILE UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile(formData).unwrap();

      dispatch(
        setCredentials({
          user: res.user,
          token,
        }),
      );

      setEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      alert(error?.data?.message || "Profile update failed");
    }
  };

  /* ================= AVATAR ================= */

  const handleAvatarUpload = async (e) => {
    if (!e.target.files?.[0]) return;

    const formData = new FormData();

    formData.append("avatar", e.target.files[0]);

    const res = await uploadAvatar(formData).unwrap();

    dispatch(
      setCredentials({
        user: res.user,
        token,
      }),
    );
  };

  const handleRemoveAvatar = async () => {
    const res = await removeAvatar().unwrap();

    dispatch(
      setCredentials({
        user: res.user,
        token,
      }),
    );
  };

  /* ================= DOCUMENTS ================= */

  const handleDocumentUpload = async (e, type) => {
    if (!e.target.files?.[0]) return;

    const formData = new FormData();

    formData.append("file", e.target.files[0]);

    formData.append("type", type);

    const res = await uploadDocument(formData).unwrap();

    setDocuments((prev) => [...prev, res.document]);
  };

  const deleteDocument = async (id) => {
    if (!window.confirm("Delete this document?")) return;

    await deleteDocumentApi(id).unwrap();

    setDocuments((prev) => prev.filter((doc) => doc._id !== id));
  };

  /* ================= PASSWORD ================= */

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await changePassword(passwordData).unwrap();

      alert("Password updated successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      alert(err?.data?.message || "Password update failed");
    }
  };

  /* ================= INVOICE ================= */

  const handleDownloadInvoice = (id) => {
    window.open(`/api/transaction/invoice/${id}`, "_blank");
  };

  return (
    <>
      <LegalBanner title="Client Dashboard" />

      <section className="py-16 lg:py-24 bg-slate-50 min-h-screen">
        <div className="container mx-auto max-w-7xl px-4">
          <Breadcrumb current="Profile" />

          <div className="space-y-8 mt-8">
            {/* HEADER */}

            <ProfileHeader
              user={user}
              handleAvatarUpload={handleAvatarUpload}
              handleRemoveAvatar={handleRemoveAvatar}
            />

            {/* STATS */}

            <DashboardStats user={user} documents={documents} />

            {/* SUBSCRIPTION */}

            <SubscriptionCard user={user} />

            {/* PERSONAL */}

            <PersonalInfo
              user={user}
              editing={editing}
              setEditing={setEditing}
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
            />

            {/* KYC */}

            <KYCSection
              user={user}
              editing={editing}
              formData={formData}
              setFormData={setFormData}
            />

            {/* DOCUMENTS */}

            <DocumentsSection
              documents={documents}
              handleDocumentUpload={handleDocumentUpload}
              deleteDocument={deleteDocument}
            />

            {/* PASSWORD */}

            <PasswordSection
              user={user}
              passwordData={passwordData}
              setPasswordData={setPasswordData}
              handlePasswordChange={handlePasswordChange}
            />

            {/* BILLING */}

            <BillingHistory
              transactions={transactions}
              handleDownloadInvoice={handleDownloadInvoice}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
