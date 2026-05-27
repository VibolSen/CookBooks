"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      const session = await getSession();
      if (session?.user) {
        const role = (session.user as any).role;
        if (role === "Admin") {
          router.push(`/admin/dashboard`);
        } else {
          router.push("/");
        }
      }
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("We couldn't sign you in right now.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleLogin() {
    signIn("google");
  }

  return (
    <motion.div
      className="flex items-center justify-center px-4 py-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl w-full max-w-screen-md flex flex-col md:flex-row overflow-hidden border border-gray-100 dark:border-gray-700"
        variants={itemVariants}
      >
        {/* Left side - Form */}
        <div className="flex-1 p-6 md:p-8">
          <motion.div variants={itemVariants} className="mb-4">
            <Link href="/" className="inline-block text-brand-black dark:text-white font-black text-xl mb-2">
              CookBook<span className="text-brand-primary">.</span>
            </Link>
            <h1 className="text-2xl font-bold mb-1 text-brand-black dark:text-white">
              Welcome back
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xs">
              Enter your details to sign in to your account.
            </p>
          </motion.div>

          {errorMessage && (
            <motion.div
              variants={itemVariants}
              className="text-red-600 text-xs text-center mb-4 bg-red-50 dark:bg-red-900/20 py-2 px-4 rounded-xl border border-red-100 dark:border-red-800"
            >
              {errorMessage}
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-3"
            variants={itemVariants}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-xl focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 dark:text-white transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-2.5 bg-gray-50 dark:bg-gray-900 border border-transparent rounded-xl focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 dark:text-white transition-all text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-xs pt-1">
              <label className="flex items-center text-gray-600 dark:text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded text-brand-primary focus:ring-brand-primary w-3.5 h-3.5 border-gray-300"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-brand-primary hover:text-brand-secondary hover:underline transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 mt-2 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-secondary focus:outline-none focus:ring-4 focus:ring-brand-primary/20 transition-all duration-300 disabled:opacity-50 flex items-center justify-center hover:-translate-y-0.5 hover:shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center">
                  <span>Sign In</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              )}
            </motion.button>
          </motion.form>

          <motion.div className="mt-4" variants={itemVariants}>
            <div className="relative mb-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-semibold">
                <span className="px-3 bg-white dark:bg-gray-800 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>

            <motion.button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center w-full py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-white font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-sm"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <FcGoogle className="w-5 h-5 mr-3" />
              Sign in with Google
            </motion.button>
          </motion.div>

          <motion.p
            className="mt-4 text-center text-gray-600 dark:text-gray-400 text-sm"
            variants={itemVariants}
          >
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-brand-primary hover:text-brand-secondary font-bold hover:underline transition-colors"
            >
              Register now
            </Link>
          </motion.p>
        </div>

        {/* Right side - Image Cover */}
        <div className="hidden md:block md:w-5/12 relative">
          <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply z-10"></div>
          <Image
            src="/login.png"
            alt="Authentication Cover"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
