import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Check } from 'lucide-react';

export function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#F5F7FB' }}>
      <div className="w-full max-w-[1000px] min-h-[680px] bg-white flex flex-col md:flex-row overflow-hidden" style={{ borderRadius: '24px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)' }}>
        {/* Left Panel */}
        <div className="w-full md:w-1/2 flex items-center justify-center py-12 md:py-0" style={{ background: '#161540' }}>
          <div className="px-12 text-center">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-8 flex items-center justify-center" style={{ background: '#5B4CF4', borderRadius: '16px' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M8 6L16 14L24 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14L16 22L24 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Title */}
            <h1 className="mb-4" style={{ fontSize: '48px', fontWeight: '700', color: 'white', lineHeight: '1.2' }}>
              FormScan AI
            </h1>

            {/* Subtitle */}
            <p className="mb-12 text-white/80" style={{ fontSize: '18px', lineHeight: '1.5' }}>
              Upload medical forms and extract data instantly with AI
            </p>

            {/* Feature List */}
            <div className="text-left space-y-4">
              {[
                'Upload PDF or image forms',
                'AI extracts all fields',
                'Copy any field instantly',
                'View past uploads anytime'
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-white/90">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#5B4CF4' }}>
                    <Check size={14} />
                  </div>
                  <span style={{ fontSize: '16px' }}>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-16 py-12 md:py-0">
          <div className="w-full max-w-md">
            {/* Badge */}
            <div className="inline-block px-4 py-2 mb-6 rounded-full text-sm" style={{ background: '#F5F7FB', color: '#5B4CF4' }}>
              Create account
            </div>

            {/* Heading */}
            <h2 className="mb-2" style={{ fontSize: '52px', fontWeight: '700', color: '#12133A', lineHeight: '1.1' }}>
              Get started
            </h2>

            {/* Subheading */}
            <p className="mb-8 text-gray-600" style={{ fontSize: '16px' }}>
              Create your account to start extracting data
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 rounded-xl border-gray-200"
                  style={{ background: 'white', border: '1px solid #E5E7EB' }}
                  required
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-xl border-gray-200"
                  style={{ background: 'white', border: '1px solid #E5E7EB' }}
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 rounded-xl border-gray-200"
                  style={{ background: 'white', border: '1px solid #E5E7EB' }}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-xl text-white"
                style={{ background: '#5B4CF4' }}
              >
                Create account
              </Button>

              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-sm text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  style={{ color: '#5B4CF4', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
