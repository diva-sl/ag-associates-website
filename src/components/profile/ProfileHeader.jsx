import {
  Camera,
  Trash2,
  Crown,
  ShieldCheck,
  Calendar,
  Clock,
} from "lucide-react";

import { motion } from "framer-motion";

const ProfileHeader = ({ user, handleAvatarUpload, handleRemoveAvatar }) => {
  const initials =
    user?.name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.slice(0, 2)
      ?.toUpperCase() || "U";

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r
        from-[#511D43]
        via-[#6d2458]
        to-[#901E3E]
        p-6
        md:p-10
        text-white
        shadow-2xl
      "
    >
      {/* Decorative Background */}

      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />

      <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-8">
        {/* Avatar */}

        <div className="relative group">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user?.name}
              className="
                w-32 h-32
                rounded-full
                object-cover
                border-4 border-white
                shadow-xl
              "
            />
          ) : (
            <div
              className="
                w-32 h-32
                rounded-full
                bg-white
                text-[#511D43]
                flex
                items-center
                justify-center
                text-4xl
                font-bold
                border-4 border-white
                shadow-xl
              "
            >
              {initials}
            </div>
          )}

          {/* Hover Actions */}

          <div
            className="
              absolute inset-0
              rounded-full
              bg-black/60
              flex items-center justify-center gap-3
              opacity-0
              group-hover:opacity-100
              transition-all
            "
          >
            <label className="cursor-pointer bg-white/20 p-3 rounded-full hover:bg-white/30">
              <Camera size={18} />

              <input hidden type="file" onChange={handleAvatarUpload} />
            </label>

            {user?.avatar && (
              <button
                onClick={handleRemoveAvatar}
                className="bg-red-500/30 p-3 rounded-full hover:bg-red-500/50"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>

        {/* User Details */}

        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl font-bold">{user?.name}</h1>

          <p className="text-white/80 mt-2">{user?.email}</p>

          {/* Badges */}

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-5">
            <span
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-white/15
                backdrop-blur-md
                text-sm
              "
            >
              <Crown size={16} />
              {user?.subscription || "FREE"}
            </span>

            <span
              className="
                flex items-center gap-2
                px-4 py-2
                rounded-full
                bg-green-500/20
                text-green-200
                text-sm
              "
            >
              <ShieldCheck size={16} />
              {user?.role || "user"}
            </span>

            {user?.subscriptionStatus && (
              <motion.span
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`       px-4
      py-2
      rounded-full
      text-sm
      font-semibold
      flex
      items-center
      gap-2
      w-fit
      ${
        user.subscriptionStatus === "active"
          ? "bg-green-500/20 text-green-200 border border-green-400/30"
          : "bg-red-500/20 text-red-200 border border-red-400/30"
      }
    `}
              >
                <motion.span
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className={`
    w-2.5
    h-2.5
    rounded-full
    ${user.subscriptionStatus === "active" ? "bg-green-400" : "bg-red-400"}
  `}
                />

                {user.subscriptionStatus.toUpperCase()}
              </motion.span>
            )}
          </div>

          {/* Meta Info */}

          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-white/70">
                <Calendar size={16} />
                Member Since
              </div>

              <p className="font-semibold mt-1">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-white/70">
                <Clock size={16} />
                Last Login
              </div>

              <p className="font-semibold mt-1">
                {user?.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString()
                  : "Never"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Stats */}

        <div className="w-full lg:w-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/10 min-w-[240px]">
            <p className="text-white/60 text-sm">Current Plan</p>

            <h3 className="text-2xl font-bold mt-2">
              {user?.subscription || "FREE"}
            </h3>

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-white/60 text-sm">Expiry Date</p>

              <p className="font-semibold">
                {user?.subscriptionExpiry
                  ? new Date(user.subscriptionExpiry).toLocaleDateString()
                  : "-"}
              </p>
            </div>

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-white/60 text-sm">Subscription Value</p>

              <p className="font-bold text-xl text-yellow-300">
                ₹{(user?.subscriptionAmount || 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
