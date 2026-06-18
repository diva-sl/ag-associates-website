import {
  Crown,
  Calendar,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const SubscriptionCard = ({ user }) => {
  const expiryDate = user?.subscriptionExpiry
    ? new Date(user.subscriptionExpiry)
    : null;

  const daysRemaining = expiryDate
    ? Math.max(Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24)), 0)
    : 0;

  const isActive = user?.subscriptionStatus === "active";

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-br
        from-[#511D43]
        via-[#6d2458]
        to-[#901E3E]
        p-8
        text-white
        shadow-2xl
      "
    >
      {/* Decorative circles */}

      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />

      <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-white/5 rounded-full" />

      {/* Header */}

      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <p className="uppercase tracking-widest text-white/60 text-xs">
            Premium Membership
          </p>

          <h2 className="text-3xl font-bold mt-2 flex items-center gap-3">
            <Crown className="text-yellow-300" />

            {user?.subscription || "FREE"}
          </h2>
        </div>

        <div
          className={`
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            text-sm
            font-semibold
            ${
              isActive
                ? "bg-green-500/20 text-green-200"
                : "bg-red-500/20 text-red-200"
            }
          `}
        >
          {isActive ? <CheckCircle size={16} /> : <AlertCircle size={16} />}

          {user?.subscriptionStatus || "inactive"}
        </div>
      </div>

      {/* Main Grid */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
        <InfoCard
          icon={<CreditCard size={18} />}
          label="Plan Value"
          value={`₹${(user?.subscriptionAmount || 0).toLocaleString()}`}
        />

        <InfoCard
          icon={<Calendar size={18} />}
          label="Expiry Date"
          value={expiryDate ? expiryDate.toLocaleDateString() : "-"}
        />

        <InfoCard
          icon={<Calendar size={18} />}
          label="Days Remaining"
          value={`${daysRemaining} Days`}
        />

        <InfoCard
          icon={<CheckCircle size={18} />}
          label="Purchased"
          value={
            user?.subscriptionPurchasedAt
              ? new Date(user.subscriptionPurchasedAt).toLocaleDateString()
              : "-"
          }
        />
      </div>

      {/* Footer */}

      <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between gap-3">
        <div>
          <p className="text-white/60 text-sm">Subscription Status</p>

          <p className="font-semibold">
            {isActive
              ? "Your subscription is active."
              : "Subscription expired."}
          </p>
        </div>

        {daysRemaining > 0 && (
          <div className="text-right">
            <p className="text-white/60 text-sm">Remaining Validity</p>

            <p className="font-bold text-xl text-yellow-300">
              {daysRemaining} Days
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
    <div className="flex items-center gap-2 text-white/70">
      {icon}

      <span className="text-sm">{label}</span>
    </div>

    <p className="mt-2 text-lg font-bold">{value}</p>
  </div>
);

export default SubscriptionCard;
