import {
  CreditCard,
  BadgeCheck,
  ShieldCheck,
  FileCheck,
  XCircle,
  RefreshCw,
  Hourglass,
} from "lucide-react";

import { motion } from "framer-motion";

const KYCSection = ({ user, editing, formData, setFormData }) => {
  const maskedAadhaar =
    user?.aadhaar && user.aadhaar.length === 12
      ? `${user.aadhaar.slice(0, 4)} XXXX XXXX`
      : "Not Provided";

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
      {/* Header */}

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#511D43]">KYC Information</h3>

        <p className="text-slate-500 mt-1">
          Tax and compliance identification details.
        </p>
      </div>

      {!editing ? (
        <div className="grid md:grid-cols-3 gap-5">
          <VerificationStatus
            icon={<CreditCard size={24} />}
            title="PAN Number"
            value={user?.pan}
            status={user?.panStatus}
            rejectReason={user?.panRejectReason}
          />
          <VerificationStatus
            icon={<ShieldCheck size={24} />}
            title="Aadhaar Number"
            value={maskedAadhaar}
            status={user?.aadhaarStatus}
            rejectReason={user?.aadhaarRejectReason}
          />

          <VerificationStatus
            icon={<FileCheck size={24} />}
            title="GSTIN"
            value={user?.gstin}
            status={user?.gstinStatus}
            rejectReason={user?.gstinRejectReason}
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {/* PAN */}

          <Input
            label="PAN Number"
            value={formData.pan}
            onChange={(e) => {
              let value = e.target.value.toUpperCase();

              if (value.length <= 5) {
                value = value.replace(/[^A-Z]/g, "");
              } else if (value.length <= 9) {
                value =
                  value.slice(0, 5).replace(/[^A-Z]/g, "") +
                  value.slice(5).replace(/[^0-9]/g, "");
              } else {
                value =
                  value.slice(0, 5).replace(/[^A-Z]/g, "") +
                  value.slice(5, 9).replace(/[^0-9]/g, "") +
                  value.slice(9).replace(/[^A-Z]/g, "");
              }

              if (value.length > 10) {
                value = value.slice(0, 10);
              }

              setFormData({
                ...formData,
                pan: value,
              });
            }}
          />

          {/* Aadhaar */}

          <Input
            label="Aadhaar Number"
            value={formData.aadhaar}
            onChange={(e) => {
              let value = e.target.value.replace(/\D/g, "");

              if (value.length > 12) {
                value = value.slice(0, 12);
              }

              setFormData({
                ...formData,
                aadhaar: value,
              });
            }}
          />

          {/* GSTIN */}

          <Input
            label="GSTIN"
            value={formData.gstin}
            onChange={(e) => {
              let value = e.target.value.toUpperCase();

              let part1 = value.slice(0, 2).replace(/[^0-9]/g, "");

              let part2 = value.slice(2, 7).replace(/[^A-Z]/g, "");

              let part3 = value.slice(7, 11).replace(/[^0-9]/g, "");

              let part4 = value.slice(11, 12).replace(/[^A-Z]/g, "");

              let part5 = value.slice(12).replace(/[^A-Z0-9]/g, "");

              value = part1 + part2 + part3 + part4 + part5;

              if (value.length > 15) {
                value = value.slice(0, 15);
              }

              setFormData({
                ...formData,
                gstin: value,
              });
            }}
          />
        </div>
      )}
    </div>
  );
};

/* ================= CARD ================= */

const KycCard = ({ icon, title, value, verified }) => (
  <div
    className="
      rounded-2xl
      border
      border-slate-200
      bg-slate-50
      p-5
      hover:bg-white
      hover:shadow-md
      transition
    "
  >
    <div className="flex items-center justify-between">
      <div
        className="
    w-14
    h-14
    rounded-2xl
    flex
    items-center
    justify-center
    text-white
    bg-gradient-to-r
    from-[#511D43]
    to-[#901E3E]
    shadow-lg
  "
      >
        {icon}
      </div>

      {verified && (
        <span className="flex items-center gap-1 text-[#511D43] text-sm font-semibold">
          <BadgeCheck size={16} />
          Verified
        </span>
      )}
    </div>

    <h4 className="mt-4 text-slate-500 text-sm">{title}</h4>

    <p className="font-semibold text-slate-800 break-all mt-1">{value}</p>
  </div>
);

/* ================= INPUT ================= */

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-slate-600">
      {label}
    </label>

    <input
      value={value}
      onChange={onChange}
      className="
        w-full
        px-4
        py-3
        rounded-xl
        border
        border-slate-300
        focus:outline-none
        focus:ring-2
        focus:ring-[#901E3E]
      "
    />
  </div>
);

export default KYCSection;

const VerificationStatus = ({ icon, title, value, status, rejectReason }) => {
  const statusConfig = {
    approved: {
      label: "Verified",
      icon: <BadgeCheck size={18} />,
      className: "bg-green-100 text-green-700 border border-green-200",
    },

    pending: {
      label: "Under Review",
      icon: (
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "linear",
          }}
        >
          <RefreshCw size={18} />
        </motion.div>
      ),
      className: "bg-[#901E3E]/10 text-[#901E3E] border border-[#901E3E]/20",
    },

    rejected: {
      label: "Rejected",
      icon: <XCircle size={18} />,
      className: "bg-red-100 text-red-700 border border-red-200",
    },

    not_uploaded: {
      label: "Not Uploaded",
      icon: <Hourglass size={18} />,
      className: "bg-slate-100 text-slate-600 border border-slate-200",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.not_uploaded;

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      {/* Decorative Glow */}

      <div
        className="
          absolute
          -top-10
          -right-10
          w-32
          h-32
          rounded-full
          bg-gradient-to-r
          from-[#511D43]/10
          to-[#901E3E]/10
          blur-2xl
        "
      />

      <div className="relative flex items-start justify-between">
        <div className="flex gap-4 items-center">
          <div
            className="
              w-14
              h-14
              rounded-2xl
              flex
              items-center
              justify-center
              text-white
              bg-gradient-to-r
              from-[#511D43]
              to-[#901E3E]
              shadow-lg
            "
          >
            {icon}
          </div>

          <div>
            <h4 className="font-semibold text-slate-800">{title}</h4>

            <p className="text-sm text-slate-500 mt-1 break-all">
              {value || "Not Submitted"}
            </p>
          </div>
        </div>

        <div
          className={`
            px-3
            py-2
            rounded-full
            flex
            items-center
            gap-2
            text-xs
            font-semibold
            ${currentStatus.className}
          `}
        >
          {currentStatus.icon}
          {currentStatus.label}
        </div>
      </div>

      {/* Rejection Reason */}

      {status === "rejected" && rejectReason && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            mt-5
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-4
          "
        >
          <p className="text-xs font-bold uppercase tracking-wide text-red-700">
            Rejection Reason
          </p>

          <p className="text-sm text-red-600 mt-2">{rejectReason}</p>
        </motion.div>
      )}

      {/* Verified Footer */}

      {status === "approved" && (
        <div
          className="
            mt-5
            flex
            items-center
            gap-2
            text-green-600
            text-sm
            font-medium
          "
        >
          <BadgeCheck size={16} />
          Verified and approved by compliance team
        </div>
      )}
    </div>
  );
};
