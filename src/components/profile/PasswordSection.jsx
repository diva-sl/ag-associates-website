import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  KeyRound,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const PasswordSection = ({
  user,
  passwordData,
  setPasswordData,
  handlePasswordChange,
}) => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const getPasswordStrength = (password) => {
    if (!password) return "";

    if (password.length < 6) return "Weak";

    if (
      password.match(/[A-Z]/) &&
      password.match(/[a-z]/) &&
      password.match(/[0-9]/)
    ) {
      return "Strong";
    }

    return "Medium";
  };

  const passwordStrength = getPasswordStrength(passwordData.newPassword);

  const passwordsMatch =
    passwordData.newPassword === passwordData.confirmPassword;

  const isGoogleUser = !!user?.googleId && !user?.hasPassword;

  const isValid =
    passwordData.newPassword.length >= 6 &&
    passwordsMatch &&
    (isGoogleUser || passwordData.currentPassword);

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
      {/* Header */}

      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#511D43] flex items-center gap-3">
          <Lock />
          Password & Security
        </h3>

        <p className="text-slate-500 mt-2">
          Protect your AG & Associates account with a secure password.
        </p>
      </div>

      {/* Google Account Notice */}

      {isGoogleUser && (
        <div
          className="
            mb-6
            rounded-2xl
            bg-blue-50
            border
            border-blue-200
            p-4
          "
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-blue-600" />

            <div>
              <h4 className="font-semibold text-blue-700">Google Account</h4>

              <p className="text-sm text-blue-600">
                You signed in with Google. Create a password for email login.
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handlePasswordChange} className="space-y-6">
        {/* Current Password */}

        {!isGoogleUser && (
          <PasswordInput
            label="Current Password"
            value={passwordData.currentPassword}
            visible={showPassword.current}
            onToggle={() =>
              setShowPassword({
                ...showPassword,
                current: !showPassword.current,
              })
            }
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
          />
        )}

        {/* New Password */}

        <div>
          <PasswordInput
            label="New Password"
            value={passwordData.newPassword}
            visible={showPassword.new}
            onToggle={() =>
              setShowPassword({
                ...showPassword,
                new: !showPassword.new,
              })
            }
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value,
              })
            }
          />

          {passwordData.newPassword && (
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-2">
                <span>Password Strength</span>

                <span
                  className={`font-semibold ${
                    passwordStrength === "Weak"
                      ? "text-red-500"
                      : passwordStrength === "Medium"
                        ? "text-yellow-500"
                        : "text-green-600"
                  }`}
                >
                  {passwordStrength}
                </span>
              </div>

              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    passwordStrength === "Weak"
                      ? "w-1/3 bg-red-500"
                      : passwordStrength === "Medium"
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-green-500"
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}

        <div>
          <PasswordInput
            label="Confirm Password"
            value={passwordData.confirmPassword}
            visible={showPassword.confirm}
            onToggle={() =>
              setShowPassword({
                ...showPassword,
                confirm: !showPassword.confirm,
              })
            }
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                confirmPassword: e.target.value,
              })
            }
          />

          {passwordData.confirmPassword && (
            <div className="mt-2">
              {passwordsMatch ? (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle size={16} />
                  Passwords match
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle size={16} />
                  Passwords do not match
                </div>
              )}
            </div>
          )}
        </div>

        {/* Security Tips */}

        <div className="rounded-2xl bg-slate-50 border p-5">
          <h4 className="font-semibold flex items-center gap-2 mb-3">
            <KeyRound size={18} />
            Password Requirements
          </h4>

          <ul className="space-y-2 text-sm text-slate-600">
            <li>• Minimum 6 characters</li>
            <li>• Include uppercase letter</li>
            <li>• Include lowercase letter</li>
            <li>• Include at least one number</li>
            <li>• Avoid common passwords</li>
          </ul>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!isValid}
            className={`
      flex
      items-center
      gap-2
      px-6
      py-3
      rounded-xl
      font-medium
      text-white
      transition-all
      ${
        isValid
          ? `
            bg-gradient-to-r
            from-[#511D43]
            to-[#901E3E]
            hover:shadow-lg
            hover:scale-[1.02]
          `
          : `
            bg-slate-400
            cursor-not-allowed
            opacity-70
          `
      }
    `}
          >
            <ShieldCheck size={18} />
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

/* ================= PASSWORD INPUT ================= */

const PasswordInput = ({ label, value, visible, onToggle, onChange }) => (
  <div>
    <label className="block mb-2 font-medium text-slate-700">{label}</label>

    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="
          w-full
          border
          border-slate-300
          rounded-xl
          px-4
          py-3
          pr-12
          focus:outline-none
          focus:ring-2
          focus:ring-[#901E3E]
        "
      />

      <button
        type="button"
        onClick={onToggle}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-slate-500
        "
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>
);

export default PasswordSection;
