import { CreditCard, BadgeCheck, ShieldCheck, FileCheck } from "lucide-react";

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
          <KycCard
            icon={<CreditCard />}
            title="PAN Number"
            value={user?.pan || "Not Provided"}
            verified={!!user?.pan}
          />

          <KycCard
            icon={<ShieldCheck />}
            title="Aadhaar Number"
            value={maskedAadhaar}
            verified={!!user?.aadhaar}
          />

          <KycCard
            icon={<FileCheck />}
            title="GSTIN"
            value={user?.gstin || "Not Provided"}
            verified={!!user?.gstin}
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
          w-12
          h-12
          rounded-xl
          bg-gradient-to-r
          from-[#511D43]
          to-[#901E3E]
          text-white
          flex
          items-center
          justify-center
        "
      >
        {icon}
      </div>

      {verified && (
        <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
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
