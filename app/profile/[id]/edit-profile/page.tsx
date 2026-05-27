"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { getUserProfile, updateUser, uploadUserImage } from "@/app/actions/userActions";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Camera, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAlert } from "@/app/context/AlertContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

export default function EditProfile() {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const nameRef = useRef<HTMLInputElement>(null);
  const aboutMeRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user) return;
      setLoading(true);
      try {
        const userId = (session.user as any).id;
        const res = await getUserProfile(userId);
        if (res.success && res.data) {
          setUser(res.data);
          setPreviewUrl((res.data as any).imageUrl || "/default-avatar.png");
        }
      } catch {
        showAlert("Failed to load user data.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [session, showAlert]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleConfirmUpdate = async () => {
    setLoading(true);
    try {
      let finalImageUrl = user.imageUrl;
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const uploadRes = await uploadUserImage(formData);
        if (uploadRes.success) {
          finalImageUrl = uploadRes.url || "";
        } else {
          throw new Error(uploadRes.error);
        }
      }

      const res = await updateUser(user.id, {
        userName: nameRef.current?.value,
        email: user.email,
        imageUrl: finalImageUrl,
        aboutMe: aboutMeRef.current?.value,
      });

      if (res.success) {
        showAlert("Profile updated successfully!", "success");
        router.push(`/profile/${user.id}/profile`);
      } else {
        showAlert(res.error, "error");
      }
    } catch (err: any) {
      showAlert(err.message, "error");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-brand-primary rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">Loading Profile Editor...</p>
      </div>
    );
  }
  
  if (!user) return <div className="text-center py-20 text-gray-400">User profile not found.</div>;

  return (
    <motion.div 
      className="max-w-3xl mx-auto py-6 px-4" 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      {/* Back button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-xs font-bold text-gray-500 dark:text-gray-400 mb-6 hover:text-brand-primary transition duration-200"
      >
        <ArrowLeft size={16} className="mr-1.5" /> Back to Profile
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Profile</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Personalize your chef details and profile picture.</p>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-6 sm:p-8">
        
        {/* Photo Upload */}
        <div className="flex flex-col items-center mb-8 gap-2">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700 shadow-sm">
              <Image 
                src={previewUrl || "/default-avatar.png"} 
                alt="Profile Preview" 
                fill 
                className="object-cover" 
              />
            </div>
            <label className="absolute bottom-1 right-1 bg-brand-primary p-2 rounded-xl text-white cursor-pointer shadow-md hover:scale-105 transition-transform duration-200">
              <Camera size={16} />
              <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
            </label>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-gray-500">Tap the camera icon to upload a photo</p>
        </div>

        {/* Inputs */}
        <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Display Name</label>
            <input 
              ref={nameRef} 
              defaultValue={user.userName} 
              required 
              className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-250 dark:border-gray-700 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white transition duration-200" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">Email Address (Read-only)</label>
            <div className="w-full px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700/50 text-gray-500 dark:text-gray-450 border border-gray-100 dark:border-gray-800 rounded-xl flex items-center gap-2 cursor-not-allowed">
              <Mail size={16} className="text-gray-400" /> 
              {user.email}
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">About Me</label>
            <textarea 
              ref={aboutMeRef} 
              defaultValue={user.aboutMe || ""} 
              rows={4} 
              className="w-full p-4 text-sm bg-gray-50 border border-gray-250 dark:border-gray-700 dark:bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary dark:text-white transition duration-200 resize-none" 
              placeholder="Tell the community about your culinary journey..." 
            />
          </div>

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
              <Save size={16} />
              Save Profile
            </button>
          </div>
        </form>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmUpdate}
        title="Save Changes?"
        message="Are you sure you want to update your profile details?"
      />
    </motion.div>
  );
}