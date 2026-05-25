"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { getUserProfile, updateUserProfile, uploadUserImage } from "@/app/actions/userActions"
import Image from "next/image"
import ConfirmationModal from "@/app/components/ConfirmationModal"

import { User, Camera, Save, Edit3 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAlert } from "@/app/context/AlertContext"

export default function EditProfilePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const { showAlert } = useAlert()

  const [name, setName] = useState("")
  const [aboutMe, setAboutMe] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user) return
      const res = await getUserProfile((session.user as any).id)
      if (res.success && res.data) {
        setName(res.data.userName || "")
        setAboutMe(res.data.aboutMe || "")
        setPreview(res.data.imageUrl || null)
      }
    }
    fetchProfile()
  }, [session])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = preview
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadRes = await uploadUserImage(formData)
        if (uploadRes.success) {
          imageUrl = uploadRes.url || "";
        } else {
          throw new Error(uploadRes.error);
        }
      }

      const res = await updateUserProfile((session?.user as any).id, {
        userName: name,
        aboutMe: aboutMe,
        imageUrl: imageUrl || undefined
      })

      if (res.success) {
        await update({ name, image: imageUrl })
        setShowConfirmation(true)
      } else {
        showAlert(res.error, "error")
      }
    } catch (err: any) {
      showAlert(err.message, "error")
    } finally {
      setLoading(false)
    }
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    router.push(`/admin/profile`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
             <Edit3 className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black text-gray-800 dark:text-gray-100">Tailor Your Profile</h1>
          <p className="text-gray-500 mt-2">Update your digital presence as an administrator</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-700 p-10 space-y-8">
           <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                 <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-indigo-100 shadow-inner">
                    <Image src={preview || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                 </div>
                 <label htmlFor="avatar-upload" className="absolute bottom-2 right-2 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg cursor-pointer hover:scale-110 transition">
                    <Camera size={20} />
                    <input type="file" id="avatar-upload" className="hidden" onChange={handleImageChange} accept="image/*" />
                 </label>
              </div>
           </div>

           <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 px-1">Full Name</label>
                <div className="relative">
                   <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input value={name} onChange={e => setName(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-0 ring-1 ring-gray-200 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="Your display name" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 px-1">About Your Expertise</label>
                <textarea value={aboutMe} onChange={e => setAboutMe(e.target.value)} className="w-full p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl border-0 ring-1 ring-gray-200 dark:ring-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none transition" rows={4} placeholder="Tell the community about your culinary journey..." />
              </div>
           </div>

           <div className="flex gap-4 pt-4">
              <button type="button" onClick={() => router.back()} className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 font-bold rounded-2xl text-gray-600 dark:text-gray-300">Cancel</button>
              <button type="submit" disabled={loading} className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2">
                 {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={20} />}
                 Save Profile
              </button>
           </div>
        </form>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleCloseConfirmation}
        title="✨ Profile Masterpiece Saved"
        message="Your administrative profile has been successfully updated. The changes are now live!"
      />
    </div>
  )
}