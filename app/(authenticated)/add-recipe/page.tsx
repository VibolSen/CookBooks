"use client";
import { useState, type ChangeEvent, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import RecipeModal from "@/app/components/RecipeModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createRecipe } from "@/app/actions/recipeActions";
import { ChefHat, FileText, ImageIcon, Plus, Save, AlertCircle, CheckCircle, ArrowLeft, Camera, List, BookOpen } from "lucide-react";

export default function AddRecipe() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Auth guard: redirect unauthenticated users to login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const [recipeName, setRecipeName] = useState("");
  const [overview, setOverview] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [description, setDescription] = useState("");
  const [note] = useState("");
  const [categoryOccasion, setCategoryOccasion] = useState<{ categoryId: string | null; occasionId: string | null; categoryName?: string; occasionName?: string }>({ categoryId: null, occasionId: null });
  const [imageFiles, setImageFiles] = useState<(File | null)[]>([null]);
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([null]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("basics");
  const [formProgress, setFormProgress] = useState(0);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const required = [recipeName, overview, prepTime, cookTime, ingredients, instructions, description];
    const filled = required.filter(f => f.trim() !== "").length;
    setFormProgress(Math.min(Math.round((filled / required.length) * 100), 100));
  }, [recipeName, overview, prepTime, cookTime, ingredients, instructions, description]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const newFiles = [...imageFiles]; const newPreviews = [...imagePreviews];
      newFiles[index] = file; newPreviews[index] = URL.createObjectURL(file);
      setImageFiles(newFiles); setImagePreviews(newPreviews);
    }
  };

  const handleCategorySelect = (category: { id: string; name: string }, occasion: { id: string; name: string }) => {
    setCategoryOccasion({ categoryId: category.id, occasionId: occasion.id, categoryName: category.name, occasionName: occasion.name });
    setShowCategoryModal(false);
  };

  const actuallySubmit = useCallback(async () => {
    if (!session?.user) return;
    setIsSubmitting(true); setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("title", recipeName); formData.append("overview", overview);
      formData.append("description", description); formData.append("ingredients", ingredients);
      formData.append("instructions", instructions); formData.append("note", note);
      formData.append("prepTime", prepTime); formData.append("cookTime", cookTime);
      formData.append("categoryId", categoryOccasion.categoryId!); formData.append("occasionId", categoryOccasion.occasionId!);
      formData.append("userId", (session.user as any).id);
      imageFiles.forEach(file => { if (file) formData.append("images", file); });
      const res = await createRecipe(formData);
      if (res.success) { setShowSuccessModal(true); } else { setUploadError(res.error); }
    } catch (err: any) { setUploadError(err.message); }
    finally { setIsSubmitting(false); }
  }, [session, recipeName, overview, description, ingredients, instructions, note, prepTime, cookTime, categoryOccasion, imageFiles]);

  useEffect(() => {
    if (categoryOccasion.categoryId && categoryOccasion.occasionId && !isSubmitting && !showSuccessModal) { actuallySubmit(); }
  }, [categoryOccasion, actuallySubmit, isSubmitting, showSuccessModal]);

  const sections = [
    { id: "basics", label: "Basics", icon: <ChefHat className="h-4 w-4" /> },
    { id: "details", label: "Details", icon: <FileText className="h-4 w-4" /> },
    { id: "ingredients", label: "Ingredients", icon: <List className="h-4 w-4" /> },
    { id: "instructions", label: "Instructions", icon: <BookOpen className="h-4 w-4" /> },
    { id: "images", label: "Images", icon: <ImageIcon className="h-4 w-4" /> },
  ];

  // Show loading spinner while auth status is being determined
  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900">
        <div className="text-center">
          <ChefHat className="h-16 w-16 text-orange-500 animate-bounce mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => router.back()} className="flex items-center text-gray-600 dark:text-gray-300 mb-6 hover:text-orange-500">
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </button>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-4">Create New Recipe</h1>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2.5 rounded-full max-w-md mx-auto mb-8">
            <div className="bg-orange-500 h-2.5 rounded-full transition-all" style={{ width: `${formProgress}%` }} />
          </div>
        </div>
        <div className="flex space-x-2 md:space-x-4 justify-center mb-8 overflow-x-auto pb-4">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActiveSection(s.id)} className={`px-4 py-2 rounded-xl flex items-center gap-2 ${activeSection === s.id ? "bg-orange-500 text-white" : "bg-white/80 dark:bg-gray-800/80"}`}>
              {s.icon} <span>{s.label}</span>
            </button>
          ))}
        </div>
        {uploadError && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl flex items-center gap-3"><AlertCircle /> {uploadError}</div>}
        <div className="bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-xl p-8">
          <form onSubmit={(e) => { e.preventDefault(); setShowCategoryModal(true); }}>
            <AnimatePresence mode="wait">
              {activeSection === "basics" && (
                <motion.div key="basics" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold">The Basics</h2>
                  <div><label className="block text-lg font-medium mb-2">Recipe Name *</label><input value={recipeName} onChange={e => setRecipeName(e.target.value)} required className="w-full p-4 rounded-xl border dark:bg-gray-700" placeholder="Yummy Pasta" /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div><label className="block text-lg font-medium mb-2">Prep Time (min) *</label><input type="number" value={prepTime} onChange={e => setPrepTime(e.target.value)} required className="w-full p-4 rounded-xl border dark:bg-gray-700" /></div>
                    <div><label className="block text-lg font-medium mb-2">Cook Time (min) *</label><input type="number" value={cookTime} onChange={e => setCookTime(e.target.value)} required className="w-full p-4 rounded-xl border dark:bg-gray-700" /></div>
                  </div>
                  <button type="button" onClick={() => setActiveSection("details")} className="ml-auto block px-6 py-3 bg-orange-500 text-white rounded-xl">Next</button>
                </motion.div>
              )}
              {activeSection === "details" && (
                <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold">Detailed Description</h2>
                  <div><label className="block text-lg font-medium mb-2">Short Overview *</label><textarea value={overview} onChange={e => setOverview(e.target.value)} required className="w-full p-4 rounded-xl border dark:bg-gray-700 h-32" /></div>
                  <div><label className="block text-lg font-medium mb-2">Full Description *</label><textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full p-4 rounded-xl border dark:bg-gray-700 h-48" /></div>
                  <div className="flex justify-between"><button type="button" onClick={() => setActiveSection("basics")} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl">Back</button><button type="button" onClick={() => setActiveSection("ingredients")} className="px-6 py-3 bg-orange-500 text-white rounded-xl">Next</button></div>
                </motion.div>
              )}
              {activeSection === "ingredients" && (
                <motion.div key="ingredients" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold">Ingredients List</h2>
                  <textarea value={ingredients} onChange={e => setIngredients(e.target.value)} required className="w-full p-4 rounded-xl border dark:bg-gray-700 h-64 font-mono" placeholder={"1 cup sugar\n2 eggs..."} />
                  <div className="flex justify-between"><button type="button" onClick={() => setActiveSection("details")} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl">Back</button><button type="button" onClick={() => setActiveSection("instructions")} className="px-6 py-3 bg-orange-500 text-white rounded-xl">Next</button></div>
                </motion.div>
              )}
              {activeSection === "instructions" && (
                <motion.div key="instructions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold">Method</h2>
                  <textarea value={instructions} onChange={e => setInstructions(e.target.value)} required className="w-full p-4 rounded-xl border dark:bg-gray-700 h-64 font-mono" placeholder={"1. Boil water..."} />
                  <div className="flex justify-between"><button type="button" onClick={() => setActiveSection("ingredients")} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl">Back</button><button type="button" onClick={() => setActiveSection("images")} className="px-6 py-3 bg-orange-500 text-white rounded-xl">Next</button></div>
                </motion.div>
              )}
              {activeSection === "images" && (
                <motion.div key="images" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="text-2xl font-bold">Photos</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {imagePreviews.map((p, i) => (
                      <div key={i} className="aspect-square relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                        {p ? <Image src={p} alt="preview" fill className="object-cover" /> : <div className="flex items-center justify-center h-full"><Camera /></div>}
                        <input type="file" accept="image/*" onChange={e => handleImageChange(e, i)} className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    ))}
                    <button type="button" onClick={() => setImageFiles([...imageFiles, null])} className="aspect-square flex items-center justify-center border-2 border-dashed rounded-xl"><Plus /></button>
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={() => setActiveSection("instructions")} className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl">Back</button>
                    <button type="submit" disabled={isSubmitting} className="px-8 py-3 bg-orange-500 text-white rounded-xl flex items-center gap-2">{isSubmitting ? "Saving..." : <><Save size={18} /> Finish</>}</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
      <RecipeModal isOpen={showCategoryModal} onClose={() => setShowCategoryModal(false)} onCategorySelect={handleCategorySelect} />
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white dark:bg-gray-800 p-8 rounded-3xl text-center max-w-sm shadow-2xl">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Recipe Shared!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Your culinary masterpiece is now live.</p>
              <button onClick={() => router.push("/")} className="w-full py-3 bg-orange-500 text-white rounded-xl">Awesome!</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
