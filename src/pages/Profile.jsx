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

import {
  useGetBillingHistoryQuery,
  useDownloadInvoiceMutation,
} from "@/redux/services/transactionApi";

import { setCredentials } from "@/redux/slices/authSlice";
import { useDownloadDocumentMutation } from "../redux/services/authApi";

const Profile = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const token = localStorage.getItem("authToken");

  const [editing, setEditing] = useState(false);

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

  const [downloadDocument] = useDownloadDocumentMutation();

  const { data: transactions = [] } = useGetBillingHistoryQuery();

  const [updateProfile] = useUpdateProfileMutation();

  const [uploadAvatar] = useUploadAvatarMutation();

  const [removeAvatar] = useRemoveAvatarMutation();

  const [uploadDocument] = useUploadDocumentMutation();

  const [deleteDocumentApi] = useDeleteDocumentMutation();

  const [changePassword] = useChangePasswordMutation();

  const { data: docsData, refetch: refetchDocuments } = useGetDocumentsQuery(
    undefined,
    {
      skip: !token,
    },
  );
  const documents = docsData?.documents || [];

  const [downloadInvoice] = useDownloadInvoiceMutation();

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
    try {
      if (!e.target.files?.[0]) return;

      const formData = new FormData();

      formData.append("file", e.target.files[0]);

      formData.append("type", type);

      await uploadDocument(formData).unwrap();

      await refetchDocuments();

      alert("Document uploaded successfully");
    } catch (error) {
      alert(error?.data?.message || "Document upload failed");
    }
  };

  const deleteDocument = async (id) => {
    try {
      if (!window.confirm("Delete this document?")) return;

      await deleteDocumentApi(id).unwrap();

      await refetchDocuments();

      alert("Document deleted successfully");
    } catch (error) {
      alert(error?.data?.message || "Delete failed");
    }
  };
  const handleDownloadDocument = async (id) => {
    try {
      const res = await downloadDocument(id).unwrap();

      if (res?.url) {
        window.open(res.url, "_blank");
      }
    } catch (error) {
      console.error(error);

      alert(error?.data?.message || "Download failed");
    }
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

  const handleDownloadInvoice = async (id) => {
    try {
      const res = await downloadInvoice(id).unwrap();

      if (res?.url) {
        window.open(res.url, "_blank");
      } else {
        alert("Invoice not found");
      }
    } catch (error) {
      console.error(error);

      alert(error?.data?.message || "Failed to download invoice");
    }
  };

  return (
    <>
      <LegalBanner title="Client Dashboard" />

      {/* <section className="py-16 lg:py-24 bg-slate-50 min-h-screen"> */}
      <section
        className="
    py-16
    lg:py-24
    min-h-screen
    bg-gradient-to-br
    from-[#511D43]
    via-[#6a2555]
    to-[#901E3E]
  "
      >
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
              handleDownloadDocument={handleDownloadDocument}
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
