/**
 * ============================================
 * RKAF SECURE COMMAND NETWORK - RECRUITMENT PAGE
 * ============================================
 * Join the Royal Kalmar Air Force
 */

import { useState } from 'react';
import { Plane, Shield, CheckCircle, ChevronRight, Star, Award, Users, Target, AlertTriangle } from 'lucide-react';
import { useRKAFStore } from '@/store/RKAFStore';
import { RANKS } from '@/types';

const careerPaths = [
  {
    title: 'Pilot',
    description: 'Become an elite fighter pilot and take to the skies in defense of Kalmar.',
    requirements: ['Excellent physical condition', 'Perfect vision (corrected or uncorrected)', 'Bachelor\'s degree', 'Officer training completion'],
    training: '18-24 months',
    icon: Plane,
  },
  {
    title: 'Air Traffic Controller',
    description: 'Manage airspace and ensure safe operations for all RKAF aircraft.',
    requirements: ['Strong communication skills', 'Ability to work under pressure', 'Technical aptitude', 'Security clearance eligible'],
    training: '12-18 months',
    icon: Target,
  },
  {
    title: 'Aircraft Technician',
    description: 'Maintain and repair cutting-edge military aircraft and systems.',
    requirements: ['Technical background', 'Problem-solving skills', 'Attention to detail', 'Physical dexterity'],
    training: '6-12 months',
    icon: Shield,
  },
  {
    title: 'Intelligence Analyst',
    description: 'Analyze data and provide critical intelligence to support operations.',
    requirements: ['Analytical mindset', 'Foreign language skills (preferred)', 'Security clearance eligible', 'Bachelor\'s degree'],
    training: '12-18 months',
    icon: Star,
  },
];

const benefits = [
  'Competitive salary and allowances',
  'Comprehensive healthcare coverage',
  'Housing allowance or base housing',
  'Retirement pension plan',
  'Education and training opportunities',
  'Travel and deployment experience',
  'Leadership development',
  'Career advancement pathways',
];

export function RecruitmentPage() {
  const { register } = useRKAFStore();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    serviceId: '',
    rank: 'Aircraftman',
    email: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setSubmitting(true);

    const result = register({
      username: formData.username,
      password: formData.password,
      fullName: formData.fullName,
      serviceId: formData.serviceId,
      rank: formData.rank,
      email: formData.email,
    });

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message);
    }

    setSubmitting(false);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
        <div className="max-w-2xl mx-auto px-4 lg:px-8">
          <div className="p-12 border border-green-500/30 bg-green-500/5 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h1 className="font-display text-3xl font-bold text-[#F4F6FA] mb-4">
              APPLICATION SUBMITTED
            </h1>
            <p className="text-[#A9B3C2] mb-8">
              Your application has been received and is pending review by RKAF Command. 
              You will be notified once your application has been processed.
            </p>
            <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/20">
              <p className="font-mono text-xs text-[#6B7280]">
                APPLICATION STATUS: PENDING APPROVAL
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="w-8 h-8 text-[#BFA15A]" />
            <span className="font-mono text-sm text-[#BFA15A] tracking-wider">JOIN THE FORCE</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F4F6FA] mb-4">
            RKAF RECRUITMENT
          </h1>
          <div className="w-32 h-1 bg-[#BFA15A]" />
        </div>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-display text-3xl font-bold text-[#F4F6FA] mb-6">
              SERVE WITH HONOR
            </h2>
            <p className="text-[#A9B3C2] leading-relaxed mb-6">
              The Royal Kalmar Air Force is always seeking dedicated individuals who are 
              committed to defending our nation and upholding the highest standards of 
              military excellence. Whether you aspire to be a fighter pilot, a technical 
              specialist, or an intelligence analyst, RKAF offers a challenging and 
              rewarding career path.
            </p>
            <p className="text-[#A9B3C2] leading-relaxed mb-8">
              Join an elite force that operates some of the most advanced aircraft and 
              systems in the world. Work alongside skilled professionals in a supportive 
              environment that values teamwork, integrity, and continuous improvement.
            </p>
            <div className="flex items-center gap-4 p-4 bg-[#111827]/50 border border-[#BFA15A]/20">
              <Award className="w-8 h-8 text-[#BFA15A]" />
              <div>
                <p className="font-mono text-sm text-[#F4F6FA]">Excellence in Aviation</p>
                <p className="font-mono text-xs text-[#6B7280]">Since 1926</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-video border border-[#BFA15A]/30 bg-[#111827]/50 flex items-center justify-center">
              <div className="text-center">
                <Plane className="w-24 h-24 text-[#BFA15A] mx-auto mb-4" />
                <p className="font-display text-xl text-[#F4F6FA]">ROYAL KALMAR AIR FORCE</p>
                <p className="font-mono text-sm text-[#6B7280]">Defending the Skies</p>
              </div>
            </div>
            {/* Decorative corners */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#BFA15A]" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#BFA15A]" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#BFA15A]" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#BFA15A]" />
          </div>
        </div>

        {/* Career Paths */}
        <div className="mb-16">
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-8">
            CAREER PATHS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {careerPaths.map((career, index) => (
              <div 
                key={index}
                className="p-6 border border-[#BFA15A]/20 bg-[#111827]/30 hover:border-[#BFA15A]/50 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 border border-[#BFA15A]/30 flex items-center justify-center flex-shrink-0">
                    <career.icon className="w-7 h-7 text-[#BFA15A]" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#F4F6FA] mb-1">
                      {career.title}
                    </h3>
                    <p className="text-sm text-[#A9B3C2]">{career.description}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-mono text-xs text-[#6B7280]">REQUIREMENTS</span>
                    <ul className="mt-1 space-y-1">
                      {career.requirements.map((req, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-[#A9B3C2]">
                          <ChevronRight className="w-4 h-4 text-[#BFA15A]" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-[#0a0f1a]">
                    <Shield className="w-4 h-4 text-[#BFA15A]" />
                    <span className="font-mono text-xs text-[#A9B3C2]">
                      Training Duration: {career.training}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16 p-8 border border-[#BFA15A]/30 bg-[#111827]/50">
          <h2 className="font-display text-2xl font-bold text-[#F4F6FA] mb-8">
            BENEFITS & COMPENSATION
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                <CheckCircle className="w-5 h-5 text-[#BFA15A] flex-shrink-0" />
                <span className="text-sm text-[#A9B3C2]">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-2xl mx-auto">
          <div className="p-8 border border-[#BFA15A]/30 bg-[#111827]/50">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-[#BFA15A]" />
              <h2 className="font-display text-xl font-bold text-[#F4F6FA]">
                SUBMIT APPLICATION
              </h2>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] font-mono text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                    placeholder="Choose username"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">
                    SERVICE ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.serviceId}
                    onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                    placeholder="If applicable"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                    placeholder="Min 8 characters"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs text-[#6B7280] mb-2">
                    CONFIRM PASSWORD
                  </label>
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                    placeholder="Confirm password"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-[#6B7280] mb-2">
                  CURRENT/PREVIOUS RANK (If applicable)
                </label>
                <select
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0a0f1a] border border-[#BFA15A]/30 text-[#F4F6FA] focus:outline-none focus:border-[#BFA15A]"
                >
                  {RANKS.map((rank) => (
                    <option key={rank} value={rank}>{rank}</option>
                  ))}
                </select>
              </div>

              <div className="p-4 bg-[#0a0f1a] border border-[#BFA15A]/10">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#BFA15A] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6B7280]">
                    By submitting this application, you confirm that all information provided 
                    is accurate and complete. All applications are subject to background checks 
                    and security clearance procedures. False information will result in immediate 
                    disqualification.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#BFA15A] text-[#0a0f1a] font-mono text-sm tracking-wider uppercase font-bold hover:bg-[#d4b76a] transition-colors disabled:opacity-50"
              >
                {submitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
