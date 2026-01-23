'use client';

import { useState } from 'react';
import { MessageSquareMoreIcon, MessagesSquareIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import Header from '@/components/shadcn-studio/blocks/hero-section-29/header';
import type { Navigation } from '@/components/shadcn-studio/blocks/hero-navigation-02';
import ContactUs from '@/components/shadcn-studio/blocks/contact-us-page-04/contact-us-page-04';
import Link from 'next/link';

const navigationData: Navigation[] = [
  {
    title: 'What We Do',
    href: '/what-we-do'
  },
  {
    title: 'Our Work',
    href: '/our-work'
  }
];

const contactCards = [
  {
    icon: MessageSquareMoreIcon,
    title: 'Chat to Sales',
    description: 'Speak to our friendly team',
    ctaText: 'sales@gmail.com',
    ctaLink: 'mailto:sales@gmail.com'
  },
  {
    icon: MessagesSquareIcon,
    title: 'Chat to Support',
    description: "We're here to help you",
    ctaText: 'johndoe@gmail.com',
    ctaLink: 'mailto:johndoe@gmail.com'
  },
  {
    icon: MapPinIcon,
    title: 'Visit Us',
    description: 'Visit our office',
    ctaText: 'View on maps',
    ctaLink: 'https://maps.google.com'
  },
  {
    icon: PhoneIcon,
    title: 'Call Us',
    description: 'Mon to Fri from 8am to 5pm',
    ctaText: '+124-2589-7854',
    ctaLink: 'tel:+12425897854'
  }
];

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    services: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleServiceChange = (service: string) => {
    setFormData({
      ...formData,
      services: formData.services.includes(service)
        ? formData.services.filter(s => s !== service)
        : [...formData.services, service]
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement form submission logic
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '', services: [] });
    }, 1000);
  };

  const services = ['Website Design', 'UX Design', 'Content Creation', 'Strategy & Consulting'];

  return (
    <div className='flex min-h-screen flex-col relative'>
      <Header navigationData={navigationData} />
      
      <main className='flex flex-1 flex-col pt-20'>
        {/* Breadcrumb */}
        <div className="px-6 pt-0 pb-4 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <nav className="text-sm text-zinc-600 dark:text-zinc-400">
              <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
              {' > '}
              <span className="text-black dark:text-white">Contact</span>
            </nav>
          </div>
        </div>

        {/* Get In Touch Heading */}
        <section className="pt-20 pb-8 px-6 bg-white dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
                Get In Touch
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Have a question or want to discuss your custom merchandise needs? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Map Section */}
        <section className="pt-8 pb-20 px-6 bg-zinc-50 dark:bg-zinc-900">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black dark:text-white mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name here..."
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your Email here..."
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-black dark:text-white mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type here"
                      className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black dark:text-white mb-3">
                      Services
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      {services.map((service) => (
                        <label
                          key={service}
                          className="flex items-center space-x-2 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service)}
                            onChange={() => handleServiceChange(service)}
                            className="w-4 h-4 border border-zinc-300 dark:border-zinc-700 rounded text-black dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white"
                          />
                          <span className="text-sm text-black dark:text-white">{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Google Map */}
              <div className="w-full h-full min-h-[500px]">
                <iframe
                  src="https://www.google.com/maps?q=2826+La+Mirada+Drive+Vista+California+92081&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '8px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full min-h-[500px] rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <ContactUs contactCards={contactCards} />
      </main>
    </div>
  );
}
