import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  ArrowRight,
  ArrowLeft,
  Bell,
  Bookmark,
  Share2,
  Zap,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptUpdates, setAcceptUpdates] = useState(false);
  const navigate = useNavigate();
  const { signInWithGoogle, signUpWithEmail } = useAuth();

  // News headlines
  const headlines = [
    {
      title: "Apple's 'sexist' credit card investigated by US regulator",
      subtitle:
        "Investigation highlights need for algorithmic fairness in financial services",
      color: "from-pink-400 to-purple-500",
      category: "FINANCIAL REGULATIONS",
      tag: "Policy",
    },
    {
      title:
        "CFPB Issues Guidance on Credit Denials by Lenders Using Artificial Intelligence",
      subtitle:
        "Consumers must receive accurate and specific reasons for credit denials",
      color: "from-blue-400 to-indigo-500",
      category: "GOVERNMENT OVERSIGHT",
      tag: "Compliance",
    },
    {
      title:
        "Italian Authority Fines OpenAI $15.6 Million for Alleged GDPR Violations",
      subtitle:
        "Landmark case sets precedent for AI companies operating in Europe",
      color: "from-green-400 to-teal-500",
      category: "PRIVACY COMPLIANCE",
      tag: "Legal",
    },
    {
      title: "How best to regulate Artificial Intelligence",
      subtitle:
        "Insights from governing complex markets can inform AI regulation using partitions, transparency, control points and accountability",
      color: "from-purple-400 to-indigo-500",
      category: "REGULATORY FRAMEWORKS",
      tag: "Research",
    },
    {
      title: "Empowering AI Innovators to Build Trust",
      subtitle:
        "Precision and compliance are the cornerstones of responsible AI development, ensuring transparency, control, and accountability. - Arun Prasad",
      color: "from-blue-500 to-green-500",
      category: "FOUNDER MESSAGE",
      tag: "Opinion",
    },
  ];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentIndex((prev) => (prev + 1) % headlines.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [headlines.length, isHovering]);

  const handleRegister = async () => {
    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }
    try {
      await signUpWithEmail(email, password);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const handleGoogleRegister = async () => {
    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      console.error("Google registration failed:", error);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % headlines.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + headlines.length) % headlines.length);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side with form */}
      <div className="w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-8">Create an account</h2>

          {/* Google Sign Up */}
          <Button
            variant="outline"
            className="w-full mb-4 py-5 border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            onClick={handleGoogleRegister}
          >
            <svg
              className="w-5 h-5 mr-3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="#4285F4"
              />
            </svg>
            Sign up with Google
          </Button>

          <p className="text-xs text-gray-500 mt-2">
            By clicking "Sign up with Google" I agree to the{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </a>
            , acknowledge{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            , and consent to receive updates, special offers, and promotional
            emails. I understand that I can opt out at any time.
          </p>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white border-gray-200 py-4"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white border-gray-200 py-4"
              />
            </div>

            {/* Checkbox for promotional emails */}
            <div className="flex items-start space-x-2 mt-6">
              <Checkbox
                id="updates"
                checked={acceptUpdates}
                onCheckedChange={(checked) =>
                  setAcceptUpdates(checked as boolean)
                }
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="updates"
                  className="text-sm font-medium leading-none text-gray-700"
                >
                  I want to receive updates, special offers, and promotional
                  emails. I understand that I can opt out at any time.
                </label>
              </div>
            </div>

            {/* Checkbox for terms */}
            <div className="flex items-start space-x-2 mt-4">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none text-gray-700"
                >
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and acknowledge{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            {/* Sign up button */}
            <Button
              className="w-full bg-gray-400 hover:bg-gray-500 text-white py-4 mt-4"
              onClick={handleRegister}
            >
              Sign up
            </Button>
          </div>

          {/* Login link */}
          <div className="text-center mt-8 text-gray-600">
            Already registered?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </div>
        </div>
      </div>

      {/* Right side with AI Regulation News Headlines */}
      <div className="w-1/2 flex items-center justify-center">
        <motion.div
          className="w-[90vh] h-[90vh] max-h-screen rounded-3xl shadow-xl overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900 border-0 relative"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-64 h-64 rounded-full bg-pink-500/20 blur-3xl"
              animate={{
                x: [0, 100, 50, 0],
                y: [0, 50, 100, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
              animate={{
                x: [0, -80, -40, 0],
                y: [0, -60, -120, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>

          {/* Top header section */}
          <div className="absolute top-0 left-0 right-0 p-6 z-20">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-white rounded-full p-2">
                  <Zap size={20} className="text-violet-700" />
                </div>
                <span className="text-white font-bold text-lg tracking-wide">
                  PRISM
                </span>
              </div>
            </div>
          </div>

          {/* Top title section */}
          <div className="absolute top-20 left-6 z-10 max-w-sm">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-medium text-white mb-3 border border-white/20">
                AI REGULATION RADAR
              </div>
              <h2 className="text-4xl font-bold text-white mb-3 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                  Shaping the Future of AI Governance
                </span>
              </h2>
              <p className="text-white/80 text-sm mb-5">
                Stay ahead with critical developments in AI regulation, ethics,
                and policy frameworks worldwide.
              </p>
              <motion.button
                className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg text-white text-sm font-medium flex items-center space-x-2 group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)",
                }}
              >
                <span>Checkout our Website</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          {/* Centered Headlines Display */}
          <div
            className="absolute inset-0 flex items-center z-10"
            style={{ marginLeft: "55px" }}
          >
            <div className="w-full max-w-md mx-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ duration: 0.6 }}
                  className="w-[68vh]"
                  style={{ marginTop: "220px" }}
                >
                  <motion.div
                    className={`bg-gradient-to-br ${headlines[currentIndex].color} p-6 rounded-2xl shadow-xl border border-white/20 backdrop-blur-md w-full`}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 0 30px rgba(109, 40, 217, 0.4)",
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs font-bold text-white">
                          {headlines[currentIndex].category}
                        </div>
                        <div className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md text-xs text-white">
                          {headlines[currentIndex].tag}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">
                      {headlines[currentIndex].title}
                    </h3>

                    <p className="text-white/90 text-sm mb-4 leading-relaxed">
                      {headlines[currentIndex].subtitle}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        {headlines.map((_, idx) => (
                          <motion.div
                            key={idx}
                            className={`w-2 h-2 rounded-full ${
                              idx === currentIndex ? "bg-white" : "bg-white/40"
                            }`}
                            animate={
                              idx === currentIndex ? { scale: [1, 1.2, 1] } : {}
                            }
                            transition={{ duration: 1, repeat: Infinity }}
                          />
                        ))}
                      </div>
                      <motion.button
                        className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-lg text-white text-xs font-medium flex items-center space-x-2"
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.3)",
                        }}
                      >
                        <span>Read full analysis</span>
                        <motion.span
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-3 z-20">
            <motion.button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowRight size={18} />
            </motion.button>
          </div>

          {/* Bottom status bar */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/30 backdrop-blur-md flex items-center justify-center text-white/60 text-xs z-10">
            <span className="mx-2">•</span>
            <span>
              Data sources: Global AI Policy Institute, UN Tech Council, EU
              Commission
            </span>
            <span className="mx-2">•</span>
            <span>Next briefing: March 24, 2025</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
