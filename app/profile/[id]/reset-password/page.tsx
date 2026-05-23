"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { changePassword } from "@/app/actions/userActions";
import { Lock, Eye, EyeOff, Shield, ArrowLeft, Sparkles, Key, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/app/context/AlertContext";

export default function ResetPasswordPage() {
  const { data: session } = useSession();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const { showAlert } = useAlert();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showAlert("Passwords do not match", "error");
      return;
    }
    
    setLoading(true);
    try {
      const res = await changePassword((session?.user as any).id, {
        oldPassword,
        newPassword
      });

      if (res.success) {
        showAlert("Password updated successfully!", "success");
        router.back();
      } else {
        showAlert(res.error, "error");
      }
    } catch (err: any) {
      showAlert(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 py-16 px-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
           <button onClick={() => router.back()} className="mb-6 text-gray-400 hover:text-indigo-600 flex items-center gap-2 mx-auto transition">
              <ArrowLeft size={16} /> Back to safety
           </button>
           <h1 className="text-3xl font-black text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
              <Shield className="text-indigo-600" /> Vault Update
           </h1>
           <p className="text-gray-500 mt-2">Strengthen your account security</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 space-y-6">
           <div className="space-y-4">
              <div>
                 <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Current Password</label>
                 <div className="relative mt-2">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type={showOld ? "text" : "password"} value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" required />
                    <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{showOld ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                 </div>
              </div>

              <div className="pt-4 border-t border-gray-50 dark:border-gray-700">
                 <label className="text-sm font-bold text-gray-600 dark:text-gray-400">New Password</label>
                 <div className="relative mt-2">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type={showNew ? "text" : "password"} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" required minLength={6} />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">{showNew ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                 </div>
              </div>

              <div>
                 <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Confirm New Password</label>
                 <div className="relative mt-2">
                    <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-gray-700 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" required />
                 </div>
              </div>
           </div>

           <button type="submit" disabled={loading} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
              {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Sparkles size={20} />}
              Update Security
           </button>
        </form>
      </div>
    </div>
  );
}
