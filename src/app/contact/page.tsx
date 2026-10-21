'use client';

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../components/Navigation';
import { FiMail, FiMapPin, FiChevronRight } from 'react-icons/fi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Slide } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

const toastOptions = {
  position: 'bottom-right' as const,
  autoClose: 3000,
  theme: 'light' as const,
  transition: Slide,
};

const links = [
  { href: 'mailto:dahal.satya321@gmail.com', label: 'Email', detail: 'dahal.satya321@gmail.com', Icon: FiMail, external: false },
  { href: 'https://github.com/satyadahal', label: 'GitHub', detail: 'satyadahal', Icon: FaGithub, external: true },
  { href: 'https://www.linkedin.com/in/satya-prakash-dahal/', label: 'LinkedIn', detail: 'satya-prakash-dahal', Icon: FaLinkedin, external: true },
  { href: 'https://x.com/SatyaPrDahal', label: 'X', detail: '@SatyaPrDahal', Icon: FaXTwitter, external: true },
];

const inputClass =
  'mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-[17px] placeholder:text-secondary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-50';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error('Please complete the reCAPTCHA to send your message.', toastOptions);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://email-endpoint.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          'g-recaptcha-response': captchaToken,
        }),
      });

      const text = await response.text();

      if (response.ok) {
        toast.success('Message sent. Thanks, I\'ll be in touch.', toastOptions);
        setFormData({ name: '', email: '', message: '' });
        setCaptchaToken(null);
      } else {
        toast.error(text || 'Something went wrong. Please try again.', toastOptions);
      }
    } catch (error) {
      console.error('Caught error:', error);
      toast.error('Network error. Please try again later.', toastOptions);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Navigation />

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <h1 className="rise text-[clamp(2.25rem,6vw,3.5rem)] font-bold leading-tight tracking-[-0.03em]">
          Contact.
        </h1>
        <p className="rise mt-2 max-w-xl text-xl text-secondary" style={{ animationDelay: '0.1s' }}>
          I&apos;m always interested in hearing about new projects and opportunities.
        </p>

        <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <section aria-labelledby="channels">
            <h2 id="channels" className="mb-4 text-2xl font-semibold tracking-tight">
              Find me online
            </h2>
            <ul className="card group-list overflow-hidden">
              {links.map(({ href, label, detail, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-fill"
                  >
                    <Icon className="shrink-0 text-2xl" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{label}</span>
                      <span className="block truncate text-sm text-secondary">{detail}</span>
                    </span>
                    <FiChevronRight className="shrink-0 text-xl text-secondary" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-sm text-secondary">
              <FiMapPin aria-hidden="true" /> Pokhara, Nepal
            </p>
          </section>

          <section aria-labelledby="message">
            <h2 id="message" className="mb-4 text-2xl font-semibold tracking-tight">
              Send a message
            </h2>
            <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="message-text" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message-text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className={`${inputClass} h-36 resize-y`}
                />
              </div>

              <ReCAPTCHA
                sitekey="6LcWMlArAAAAADD4-ERBiMNTOZR7TmBa3npUUvk6"
                onChange={(token) => setCaptchaToken(token)}
              />

              <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full sm:w-auto">
                {isSubmitting ? 'Sending…' : 'Send message'}
              </button>
            </form>
          </section>
        </div>
      </div>

      <ToastContainer {...toastOptions} pauseOnFocusLoss draggable closeOnClick />
    </main>
  );
}
