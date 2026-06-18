import {
  ShieldCheck,
  FileBadge,
  User,
  CreditCard,
  TrendingUp,
} from "lucide-react";

const DashboardStats = ({ user, documents = [] }) => {
  const cards = [
    {
      title: "Subscription",
      value: user?.subscriptionStatus?.toUpperCase() || "INACTIVE",
      icon: ShieldCheck,
      color:
        user?.subscriptionStatus === "active"
          ? "text-green-600"
          : "text-red-500",
      bg: "bg-green-50",
    },

    {
      title: "Documents",
      value: documents.length,
      icon: FileBadge,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },

    {
      title: "Account",
      value: user?.isBlocked ? "BLOCKED" : "VERIFIED",
      icon: User,
      color: user?.isBlocked ? "text-red-600" : "text-emerald-600",
      bg: user?.isBlocked ? "bg-red-50" : "bg-emerald-50",
    },

    {
      title: "Current Plan",
      value: user?.subscription || "FREE",
      icon: CreditCard,
      color: "text-[#901E3E]",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="
              relative
              overflow-hidden
              bg-white
              rounded-3xl
              p-5
              md:p-6
              border
              border-[#901E3E]/10
              shadow-sm
              hover:shadow-lg
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >
            {/* Decorative Gradient */}
            <div
              className="
                absolute
                top-0
                right-0
                w-24
                h-24
                bg-gradient-to-bl
                from-[#901E3E]/10
                to-transparent
                rounded-full
                -translate-y-8
                translate-x-8
              "
            />

            <div className="flex items-center justify-between">
              <div
                className={`
                  w-12 h-12
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${card.bg}
                `}
              >
                <Icon size={22} className={card.color} />
              </div>

              <TrendingUp size={18} className="text-green-500" />
            </div>

            <div className="mt-5">
              <p className="text-sm text-slate-500">{card.title}</p>

              <h3
                className={`
                  mt-1
                  font-bold
                  text-lg
                  md:text-xl
                  ${card.color}
                `}
              >
                {card.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStats;
