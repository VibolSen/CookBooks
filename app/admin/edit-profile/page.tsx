"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getUserProfile, updateUserProfile, uploadUserImage } from "@/app/actions/userActions";
import Image from "next/image";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { User, Camera, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/app/context/AlertContext";
import { motion } from "framer-motion";

export default function EditProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const { showAlert } = useAlert();

  const [name, setName] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user) return;
      const res = await getUserProfile((session.user as any).id);
      if (res.success && res.data) {
        setName(res.data.userName || "");
        setAboutMe(res.data.aboutMe || "");
        setPreview(res.data.imageUrl || null);
      }
    }
    fetchProfile();
  }, [session]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = preview;
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadRes = await uploadUserImage(formData);
        if (uploadRes.success) {
          imageUrl = uploadRes.url || "";
        } else {
          throw new Error(uploadRes.error);
        }
      }

      const res = await updateUserProfile((session?.user as any).id, {
        userName: name,
        aboutMe: aboutMe,
        imageUrl: imageUrl || undefined,
      });

      if (res.success) {
        await update({ name, image: imageUrl });
        setShowConfirmation(true);
      } else {
        showAlert(res.error, "error");
      }
    } catch (err: any) {
      showAlert(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    router.push(`/admin/profile`);
  };

  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Title section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Update your administrative profile details and public avatar.</p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Profile picture editor */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700 shadow-sm">
              <Image 
                src={preview || "/default-avatar.png"} 
                alt="Profile Preview" 
                fill 
                className="object-cover" 
              />
            </div>
            <label htmlFor="avatar-upload" className="absolute bottom-1 right-1 p-2 bg-brand-primary text-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-200">
              <Camera size={16} />
              <input type="file" id="avatar-upload" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">Tap the camera icon to upload a profile picture</p>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-250 dark:border-gray-700 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white transition duration-200" 
                placeholder="Your display name" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">About Your Expertise</label>
            <textarea 
              value={aboutMe} 
              onChange={(e) => setAboutMe(e.target.value)} 
              className="w-full p-4 text-sm bg-gray-50 border border-gray-250 dark:border-gray-700 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white transition duration-200 resize-none" 
              rows={4} 
              placeholder="Tell the community about your culinary journey..." 
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button 
            type="button" 
            onClick={() => router.back()} 
            className="flex-1 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-105 dark:bg-gray-750 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-1 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-brand-secondary transition flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            Save Profile
          </button>
        </div>
      </form>

      {/* Confirmation Popup */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleCloseConfirmation}
        title="Profile Details Saved"
        message="Your administrative profile has been successfully updated. The changes are now live!"
      />
    </div>
  );
}