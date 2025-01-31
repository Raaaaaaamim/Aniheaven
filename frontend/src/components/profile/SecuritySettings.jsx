import { motion } from "framer-motion";
import React, { useState } from "react";
import { FiLock, FiShield, FiSmartphone, FiMail, FiAlertTriangle } from "react-icons/fi";
import { RiFingerprint2Line } from "react-icons/ri";
import CustomSwitch from "./CustomSwitch";

const SecuritySettings = ({ security, onUpdate }) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [recoveryEmail, setRecoveryEmail] = useState(security.recoveryEmail);

  const handleToggle2FA = () => {
    if (!security.twoFactorEnabled) {
      setShowQRCode(true);
    } else {
      onUpdate({ ...security, twoFactorEnabled: false });
    }
  };

  const handleVerify2FA = () => {
    if (verificationCode.length === 6) {
      // Verify the code with backend
      onUpdate({ ...security, twoFactorEnabled: true });
      setShowQRCode(false);
      setVerificationCode("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="space-y-6"
    >
      {/* 2FA Section */}
      <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/[0.05] shadow-xl shadow-purple-500/5">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10">
              <RiFingerprint2Line className="text-2xl text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">
                Two-Factor Authentication
              </h3>
              <p className="text-gray-400 text-sm">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <CustomSwitch
            checked={security.twoFactorEnabled}
            onChange={handleToggle2FA}
          />
        </div>

        {showQRCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 pt-6 space-y-4"
          >
            <div className="bg-[#1A1A1A] rounded-xl p-6 text-center">
              <div className="w-48 h-48 mx-auto mb-4 bg-white p-2 rounded-lg">
                {/* QR Code would go here */}
                <div className="w-full h-full bg-[#1A1A1A] rounded-xs flex items-center justify-center">
                  <FiSmartphone className="text-4xl text-white" />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Scan this QR code with your authenticator app
              </p>
              <div className="flex gap-2 max-w-xs mx-auto">
                {Array(6)
                  .fill()
                  .map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      maxLength="1"
                      value={verificationCode[i] || ""}
                      onChange={(e) => {
                        const newCode =
                          verificationCode.slice(0, i) +
                          e.target.value +
                          verificationCode.slice(i + 1);
                        setVerificationCode(newCode);
                        if (e.target.value && i < 5) {
                          e.target.nextElementSibling?.focus();
                        }
                      }}
                      className="w-10 h-12 text-center bg-[#0F0F0F] border border-white/10 rounded-lg text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-hidden"
                    />
                  ))}
              </div>
              <button
                onClick={handleVerify2FA}
                disabled={verificationCode.length !== 6}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors"
              >
                Verify Code
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Recovery Email */}
      <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/[0.05] shadow-xl shadow-purple-500/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <FiMail className="text-2xl text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Recovery Email</h3>
            <p className="text-gray-400 text-sm">
              Used to recover your account if you lose access
            </p>
          </div>
        </div>
        <div className="relative">
          <input
            type="email"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            placeholder="Enter recovery email"
            className="w-full bg-[#1A1A1A] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500/50 outline-hidden transition-all border border-white/5"
          />
          <button
            onClick={() => onUpdate({ ...security, recoveryEmail })}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Update
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/[0.05] shadow-xl shadow-purple-500/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-emerald-500/10">
            <FiShield className="text-2xl text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <p className="text-gray-400 text-sm">
              Monitor recent account activity
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {security.loginHistory.map((login, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-xl border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                  {login.suspicious ? (
                    <FiAlertTriangle className="text-amber-400" />
                  ) : (
                    <FiLock className="text-emerald-400" />
                  )}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {login.location}
                  </p>
                  <p className="text-gray-400 text-xs">{login.device}</p>
                </div>
              </div>
              <span className="text-gray-400 text-sm">{login.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Connected Devices */}
      <div className="bg-[#0F0F0F] rounded-2xl p-6 border border-white/[0.05] shadow-xl shadow-purple-500/5">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-xl bg-rose-500/10">
            <FiSmartphone className="text-2xl text-rose-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Connected Devices
            </h3>
            <p className="text-gray-400 text-sm">
              Manage devices connected to your account
            </p>
          </div>
        </div>
        <div className="space-y-4">
          {security.connectedDevices.map((device, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-[#1A1A1A] rounded-xl border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/5">
                  <FiSmartphone className="text-rose-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {device.name}
                  </p>
                  <p className="text-gray-400 text-xs">{device.lastActive}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  onUpdate({
                    ...security,
                    connectedDevices: security.connectedDevices.filter(
                      (_, i) => i !== index
                    ),
                  })
                }
                className="px-3 py-1 text-sm text-rose-400 hover:text-rose-300 transition-colors"
              >
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SecuritySettings;
