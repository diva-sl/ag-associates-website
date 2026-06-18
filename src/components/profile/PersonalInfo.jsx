import { Mail, Phone, MapPin, User, Edit3, Save, X } from "lucide-react";

const PersonalInfo = ({
  user,
  editing,
  setEditing,
  formData,
  setFormData,
  handleSubmit,
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
      {/* Header */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold text-[#511D43]">
            Personal Information
          </h3>

          <p className="text-slate-500 mt-1">
            Manage your personal details and contact information.
          </p>
        </div>

        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-gradient-to-r
              from-[#511D43]
              to-[#901E3E]
              text-white
              font-medium
              hover:shadow-lg
              transition
            "
          >
            <Edit3 size={18} />
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => setEditing(false)}
            className="
              inline-flex
              items-center
              gap-2
              px-5
              py-3
              rounded-xl
              border
              border-red-200
              bg-red-50
              text-red-600
              font-medium
            "
          >
            <X size={18} />
            Cancel
          </button>
        )}
      </div>

      {!editing ? (
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard icon={<User />} label="Full Name" value={user?.name} />

          <InfoCard icon={<Mail />} label="Email Address" value={user?.email} />

          <InfoCard
            icon={<Phone />}
            label="Phone Number"
            value={user?.phone || "Not Provided"}
          />

          <InfoCard
            icon={<MapPin />}
            label="Address"
            value={user?.address || "Not Provided"}
          />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <Input
              label="Phone Number"
              value={formData.phone}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, "");

                if (value.length > 10) {
                  value = value.slice(0, 10);
                }

                setFormData({
                  ...formData,
                  phone: value,
                });
              }}
            />

            <div className="md:col-span-2">
              <Input
                label="Address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="
                inline-flex
                items-center
                gap-2
                px-8
                py-3
                rounded-xl
                bg-gradient-to-r
                from-[#511D43]
                to-[#901E3E]
                text-white
                font-semibold
                hover:shadow-xl
                transition
              "
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div
    className="
      p-5
      rounded-2xl
      border
      border-slate-200
      bg-slate-50
      hover:bg-white
      hover:shadow-md
      transition
    "
  >
    <div className="flex items-center gap-3">
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

      <div>
        <p className="text-sm text-slate-500">{label}</p>

        <p className="font-semibold text-slate-800 break-all">{value}</p>
      </div>
    </div>
  </div>
);

const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-slate-600">
      {label}
    </label>

    <input
      type={type}
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

export default PersonalInfo;
