'use client';

import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navigation from '../components/Navigation';
import { FiMail, FiMessageSquare, FiMapPin } from 'react-icons/fi'; // Feather Icons
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Font Awesome
import { FaSquareXTwitter } from 'react-icons/fa6';
import { Slide } from 'react-toastify'; // Ensure Slide is imported

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(
      <span role="img" aria-label="unicorn">
        Message Sent Successfully.
      </span>,
      {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Slide,
      }
    );
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 ">Contact Me</h2>
          <div className="bg-white rounded-lg shadow-md p-8 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <p className="text-gray-700 mb-6">
                  I&apos;m always interested in hearing about new projects and opportunities. Feel
                  free to reach out through any of these channels:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <FiMail className="w-6 h-6 mr-3" />
                    <a href="mailto:dahal.satya321@gmail.com" className="hover:underline">
                      dahal.satya321@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FiMessageSquare className="w-6 h-6 mr-3" />
                    Let&apos;s chat on LinkedIn
                  </li>
                  <li className="flex items-center text-gray-700">
                    <FiMapPin className="w-6 h-6 mr-3" />
                    Pokhara, Nepal
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Professional Profiles</h3>
                <div className="space-y-4">
                  <a
                    href="https://github.com/satyadahal"
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                  >
                    <div className="flex items-center">
                      <FaGithub className="w-6 h-6 mr-3" />
                      GitHub Profile
                    </div>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/satya-prakash-dahal/"
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                  >
                    <div className="flex items-center">
                      <FaLinkedin className="w-6 h-6 mr-3" />
                      LinkedIn Profile
                    </div>
                  </a>
                  <a
                    href="https://x.com/SatyaPrDahal"
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center">
                      <FaSquareXTwitter className="w-6 h-6 mr-3 " />
                      Twitter Profile
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg h-32"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* ToastContainer to display notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Slide}
      />
    </main>
  );
}
