"use client";

import Image from "next/image";
import { useState, FormEvent } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    country: "",
    service: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const services = [
    "Private Label Development",
    "Global Import / Export",
    "International Market Entry",
    "Distribution Channel Building",
    "Category Management & Sourcing",
  ];

  const countries = [
    { name: "Australia", flag: "🇦🇺" },
    { name: "Brazil", flag: "🇧🇷" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "China", flag: "🇨🇳" },
    { name: "France", flag: "🇫🇷" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "India", flag: "🇮🇳" },
    { name: "Italy", flag: "🇮🇹" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "Mexico", flag: "🇲🇽" },
    { name: "Netherlands", flag: "🇳🇱" },
    { name: "Saudi Arabia", flag: "🇸🇦" },
    { name: "Singapore", flag: "🇸🇬" },
    { name: "South Africa", flag: "🇿🇦" },
    { name: "Spain", flag: "🇪🇸" },
    { name: "Switzerland", flag: "🇨🇭" },
    { name: "United Arab Emirates", flag: "🇦🇪" },
    { name: "United Kingdom", flag: "🇬🇧" },
    { name: "United States", flag: "🇺🇸" }
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.country.trim()) newErrors.country = "Country is required";
    if (!formData.service) newErrors.service = "Please select a service";
    if (!formData.message.trim()) newErrors.message = "Project requirements are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1500));
    alert("Inquiry submitted successfully!");
    setFormData({ fullName: "", companyName: "", email: "", country: "", service: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <main className="premium-bg min-h-screen flex items-center justify-center px-6 selection:bg-[#bf953f] selection:text-black">
      <div className="w-full max-w-5xl py-2 relative z-10">

        {/* ===== HERO ===== */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block relative mb-6 group">
            <div className="absolute -inset-4 bg-[var(--gold-start)] opacity-20 blur-xl rounded-full group-hover:opacity-30 transition-opacity duration-500"></div>
            <Image
              src="/logo.png"
              alt="Solved Imperium Ventures"
              width={160}
              height={90}
              className="relative mx-auto"
              priority
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-[0.15em] text-gold-gradient mb-4 uppercase">
            Coming Soon
          </h1>

          <div className="flex justify-center w-full">
            <p className="mt-4 text-lg md:text-xl text-gray-400 font-light tracking-wide max-w-2xl text-center">
              Tailored Solutions for <span className="text-gold-gradient">Global Growth</span>
            </p>
          </div>
        </div>

        {/* ===== FORM CARD ===== */}
        <div className="glass-card rounded-3xl p-8 md:p-12 animate-fade-in-up delay-200 mt-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-3 text-white">
              Get in Touch
            </h2>
            <p className="text-gray-400 font-light">
              We are launching shortly. Join our exclusive waitlist.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6" noValidate>

            {/* Full Name */}
            <div className="space-y-1">
              <input
                name="fullName"
                placeholder="Full Name*"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full ${errors.fullName ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.fullName && <p className="text-red-400 text-xs pl-1">{errors.fullName}</p>}
            </div>

            {/* Company Name */}
            <div className="space-y-1">
              <input
                name="companyName"
                placeholder="Company Name*"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full ${errors.companyName ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.companyName && <p className="text-red-400 text-xs pl-1">{errors.companyName}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <input
                name="email"
                type="email"
                placeholder="Email Address*"
                value={formData.email}
                onChange={handleChange}
                className={`w-full ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-400 text-xs pl-1">{errors.email}</p>}
            </div>

            {/* Country Custom Dropdown */}
            <div className="space-y-1 relative">
              <div className="relative">
                <input
                  name="country"
                  placeholder="Select Country*"
                  value={formData.country}
                  onChange={(e) => {
                    handleChange(e);
                    setIsCountryOpen(true);
                  }}
                  onFocus={() => setIsCountryOpen(true)}
                  // Delay blur to allow clicking on options
                  onBlur={() => setTimeout(() => setIsCountryOpen(false), 200)}
                  className={`w-full ${errors.country ? 'border-red-500 focus:border-red-500' : ''}`}
                  autoComplete="off"
                />
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform ${isCountryOpen ? 'rotate-180' : ''}`}>
                  ▼
                </div>
              </div>

              {/* Dropdown Options */}
              {isCountryOpen && (
                <div className="absolute top-full left-0 w-full mt-2 max-h-60 overflow-y-auto bg-[#0a0a0a] border border-[var(--glass-border)] rounded-lg shadow-2xl z-50">
                  {countries
                    .filter(c => c.name.toLowerCase().includes(formData.country.toLowerCase()))
                    .map(c => (
                      <div
                        key={c.name}
                        onClick={() => {
                          setFormData(prev => ({ ...prev, country: c.name }));
                          setIsCountryOpen(false);
                          if (errors.country) setErrors(prev => { const n = { ...prev }; delete n.country; return n; });
                        }}
                        className="px-4 py-3 hover:bg-[var(--glass-bg)] cursor-pointer flex items-center gap-3 transition-colors border-b border-[var(--glass-border)] last:border-0"
                      >
                        <span className="text-xl">{c.flag}</span>
                        <span className="text-gray-200">{c.name}</span>
                      </div>
                    ))}
                  {countries.filter(c => c.name.toLowerCase().includes(formData.country.toLowerCase())).length === 0 && (
                    <div className="px-4 py-3 text-gray-500 text-sm">No matches found</div>
                  )}
                </div>
              )}
              {errors.country && <p className="text-red-400 text-xs pl-1">{errors.country}</p>}
            </div>

            {/* Service Selection */}
            <div className="md:col-span-2 space-y-1">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full ${errors.service ? 'border-red-500 focus:border-red-500' : ''}`}
              >
                <option value="">Service Interested In</option>
                {services.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.service && <p className="text-red-400 text-xs pl-1">{errors.service}</p>}
            </div>

            {/* Project Requirements */}
            <div className="md:col-span-2 space-y-1">
              <textarea
                name="message"
                className={`w-full ${errors.message ? 'border-red-500 focus:border-red-500' : ''}`}
                rows={4}
                placeholder="Project Requirements*"
                value={formData.message}
                onChange={handleChange}
              />
              {errors.message && <p className="text-red-400 text-xs pl-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              className="btn-gold md:col-span-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Submit Inquiry"}
            </button>
          </form>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="mt-36 pb-5">
          <p className="text-center text-xs text-gray-600 uppercase tracking-widest animate-fade-in-up delay-300 ">
            © {new Date().getFullYear()} Solved Imperium Ventures
          </p>
        </div>
      </div>
    </main>
  );
}
