"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { getUserProfile, updateUser, uploadUserImage } from "@/app/actions/userActions";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAlert } from "@/app/context/AlertContext";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12 } }
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

  if (loading && !user) return <div className="min-h-screen flex items-center justify-center"><div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <div className="text-center py-20">User not found</div>;

  return (
    <motion.div className="min-h-screen bg-gradient-to-br from-violet-50 via-pink-50 to-indigo-50 dark:from-gray-900 py-12 px-6" variants={containerVariants} initial="hidden" animate="visible">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center text-gray-600 dark:text-gray-300 mb-8 hover:text-violet-600 transition">
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Edit Profile</h1>
          <p className="text-gray-500 mt-2">Personalize your chef profile</p>
        </div>

        <motion.div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8" variants={itemVariants}>
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-violet-100 shadow-lg mb-4">
                <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              </div>
              <label className="absolute bottom-4 right-0 bg-violet-600 p-2 rounded-full text-white cursor-pointer shadow-lg hover:scale-110 transition">
                <Camera size={18} />
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>
            <p className="text-sm text-gray-500">Tap the camera to change photo</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Display Name</label>
              <input ref={nameRef} defaultValue={user.userName} required className="w-full p-4 rounded-xl border border-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email (Read-only)</label>
              <div className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-500 border border-gray-100 flex items-center gap-2">
                <Mail size={18} /> {user.email}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">About Me</label>
              <textarea ref={aboutMeRef} defaultValue={user.aboutMe} rows={4} className="w-full p-4 rounded-xl border border-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-violet-500 outline-none transition resize-none" placeholder="Share your cooking story..." />
            </div>

            <button type="submit" disabled={loading} className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </motion.div>
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