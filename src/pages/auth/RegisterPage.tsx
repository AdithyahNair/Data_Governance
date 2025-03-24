import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";
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
    <div className="min-h-screen flex flex-row overflow-hidden">
      {/* Left side - Registration form */}
      <div className="w-1/2 p-8 flex flex-col justify-center bg-white">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <a href="/" className="text-xl font-bold tracking-tighter">
              Prism by BlockConvey
            </a>
          </div>

          <h1 className="text-2xl font-bold mb-6 tracking-tight">
            Create an account
          </h1>

          {/* Google Sign Up */}
          <Button
            variant="outline"
            className="w-full justify-center font-normal border border-gray-200 py-6 hover:bg-gray-50 transition-all duration-200"
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

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Email/Password Form */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-white border-gray-200 py-6 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
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
                className="bg-white border-gray-200 py-6 focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all duration-200"
              />
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 mt-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="updates"
                  checked={acceptUpdates}
                  onCheckedChange={(checked) =>
                    setAcceptUpdates(checked as boolean)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="updates"
                  className="text-sm text-gray-600 leading-tight"
                >
                  I want to receive updates, special offers, and promotional
                  emails. I understand that I can opt out at any time.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) =>
                    setAcceptTerms(checked as boolean)
                  }
                  className="mt-1"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-tight"
                >
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and acknowledge the{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button
              className="w-full bg-gray-400 hover:bg-gray-500 text-white py-6 rounded-md transition-all duration-300"
              onClick={handleRegister}
            >
              Create account
            </Button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Right side - AI Regulation News Headlines */}
      <div className="w-1/2 bg-gradient-to-br from-purple-900 via-indigo-900 to-violet-900 flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-purple-800/50 via-indigo-800/50 to-violet-800/50 backdrop-blur-xl border border-white/10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-96 h-96 rounded-full bg-pink-500/20 blur-3xl"
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
              className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-3xl"
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

          {/* Content Container */}
          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-white rounded-full p-2">
                <Zap size={24} className="text-violet-700" />
              </div>
              <span className="text-white font-bold text-xl tracking-wide">
                PRISM
              </span>
            </div>

            {/* Title Section */}
            <div className="mb-12">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg text-sm font-medium text-white mb-4 border border-white/20">
                AI REGULATION RADAR
              </div>
              <h2 className="text-5xl font-bold mb-4 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                  Shaping the Future of AI Governance
                </span>
              </h2>
              <p className="text-white/80 text-lg">
                Stay ahead with critical developments in AI regulation, ethics,
                and policy frameworks worldwide.
              </p>
            </div>

            {/* Headlines Carousel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <motion.div
                  className={`bg-gradient-to-br ${headlines[currentIndex].color} p-8 rounded-2xl shadow-xl border border-white/20 backdrop-blur-md`}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(109, 40, 217, 0.4)",
                  }}
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs font-bold text-white">
                      {headlines[currentIndex].category}
                    </div>
                    <div className="px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md text-xs text-white">
                      {headlines[currentIndex].tag}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">
                    {headlines[currentIndex].title}
                  </h3>

                  <p className="text-white/90 text-base leading-relaxed mb-6">
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
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
              <motion.button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight size={20} />
              </motion.button>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 text-white/60 text-sm flex items-center justify-between">
              <span>
                Data sources: Global AI Policy Institute, UN Tech Council
              </span>
              <span>Next briefing: March 24, 2025</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
