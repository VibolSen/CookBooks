"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { useParams } from "next/navigation"
import { Clock, ChefHat, Timer, Star, Sparkles, Users, Award } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/app/components/ui/badge"
import InteractiveRating from "@/app/components/InteractiveRating"
import RecipeGallery from "@/app/components/recipe-gallery"
import { getRecipeById } from "@/app/actions/recipeActions"

const formatTime = (minutes?: number) => {
 if (!minutes || minutes < 0) return "0m"
 const hours = Math.floor(minutes / 60)
 const remainingMinutes = minutes % 60
 if (hours > 0 && remainingMinutes > 0) return `${hours}h ${remainingMinutes}m`
 return hours > 0 ? `${hours}h` : `${remainingMinutes}m`
}

const DetailsPage: React.FC = () => {
 const params = useParams()
 const id = params.id as string
 const [recipe, setRecipe] = useState<any>(null)
 const [error, setError] = useState<string | null>(null)
 const [loading, setLoading] = useState<boolean>(true)

 const fetchRecipe = useCallback(async () => {
 setLoading(true)
 try {
 const res = await getRecipeById(id)
 if (res.success) {
 setRecipe(res.data)
 } else {
 setError(res.error)
 }
 } catch (err: any) {
 setError(err.message)
 } finally {
 setLoading(false)
 }
 }, [id])

 useEffect(() => {
 if (id) fetchRecipe()
 }, [id, fetchRecipe])

 if (loading) return (
 <div className="min-h-screen flex items-center justify-center">
 <ChefHat className="h-16 w-16 text-orange-500 animate-bounce" />
 </div>
 )

 if (error || !recipe) return (
 <div className="min-h-screen flex items-center justify-center text-center p-10">
 <div>
 <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
 <p className="text-gray-500">{error || "The recipe you are looking for does not exist."}</p>
 </div>
 </div>
 )

 const averageRating = recipe.reviews?.length > 0
 ? recipe.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / recipe.reviews.length
 : 0

 return (
 <div className="min-h-screen bg-gray-50 pb-20">
 <motion.div className="container mx-auto px-4 py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
 <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
 <Image src={recipe.images?.[0]?.url || "/placeholder.svg"} alt={recipe.title} fill className="object-cover" priority />
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
 <div className="absolute bottom-10 left-10 right-10">
 <Badge className="mb-4 bg-orange-500 text-white border-0 px-4 py-1">Featured Recipe</Badge>
 <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{recipe.title}</h1>
 <div className="flex items-center gap-4 text-white/90">
 <div className="flex items-center gap-2">
 <ChefHat size={20} /> <span>By {recipe.user?.userName || "Anonymous"}</span>
 </div>
 <div className="flex items-center gap-2">
 <Star size={20} className="text-yellow-400 fill-current" /> <span>{averageRating.toFixed(1)} Rating</span>
 </div>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
 <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
 <Clock className="text-orange-500 mb-2" />
 <span className="text-sm text-gray-500">Prep Time</span>
 <span className="text-xl font-bold">{formatTime(recipe.prepTime)}</span>
 </div>
 <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
 <Timer className="text-purple-500 mb-2" />
 <span className="text-sm text-gray-500">Cook Time</span>
 <span className="text-xl font-bold">{formatTime(recipe.cookTime)}</span>
 </div>
 <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center">
 <Users className="text-emerald-500 mb-2" />
 <span className="text-sm text-gray-500">Servings</span>
 <span className="text-xl font-bold">4 People</span>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <div className="lg:col-span-2 space-y-8">
 <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm">
 <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Sparkles className="text-orange-500" /> Story behind the dish</h2>
 <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{recipe.description}</p>
 </section>

 <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm">
 <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Award className="text-purple-500" /> Instructions</h2>
 <div className="space-y-6">
 {recipe.instructions?.split("\n").map((step: string, i: number) => (
 <div key={i} className="flex gap-4">
 <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">{i + 1}</div>
 <p className="text-gray-600 dark:text-gray-400 pt-1">{step}</p>
 </div>
 ))}
 </div>
 </section>

 <InteractiveRating recipeId={id} onRatingSubmitted={fetchRecipe} />

 <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm">
 <h2 className="text-2xl font-bold mb-8">What Others Say</h2>
 <div className="space-y-6">
 {recipe.reviews?.map((r: any) => (
 <div key={r.id} className="border-b border-gray-100 pb-6 last:border-0">
 <div className="flex justify-between items-start mb-3">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold uppercase">{r.user?.userName?.[0] || "?"}</div>
 <div>
 <div className="font-bold">{r.user?.userName || "Anonymous"}</div>
 <div className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</div>
 </div>
 </div>
 <div className="flex text-yellow-400">
 {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className={i < r.rating ? "fill-current" : "text-gray-200"} />)}
 </div>
 </div>
 <p className="text-gray-600">{r.comment}</p>
 </div>
 ))}
 {recipe.reviews?.length === 0 && <p className="text-gray-400 italic">No reviews yet. Be the first!</p>}
 </div>
 </section>
 </div>

 <div className="space-y-8">
 <section className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border-t-4 border-orange-500">
 <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><Users size={20} /> Ingredients</h2>
 <ul className="space-y-4">
 {recipe.ingredients?.split("\n").map((ing: string, i: number) => (
 <li key={i} className="flex items-center gap-3 text-gray-600">
 <div className="w-1.5 h-1.5 rounded-full bg-orange-400" /> {ing}
 </li>
 ))}
 </ul>
 </section>

 <RecipeGallery recipe={recipe} />
 </div>
 </div>
 </motion.div>
 </div>
 )
}

export default DetailsPage
