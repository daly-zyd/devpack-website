import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { useState } from 'react';
import { send } from '@emailjs/browser';

export default function Contact() {
  const { language } = useLanguage();
  const t = translations[language];
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [recipient, setRecipient] = useState('direction');
  const [openRecipientDropdown, setOpenRecipientDropdown] = useState(false);
  const [sent, setSent] = useState(false);

  // Email destinations par département
  const recipients = {
    direction: { label: 'Direction Générale', email: 'direction@devpack.com.tn' },
    commercial: { label: 'Département Commercial', email: 'commercial@devpack.com.tn' },
    support: { label: 'Support Technique', email: 'support@devpack.com.tn' },
    rh: { label: 'Ressources Humaines', email: 'rh@devpack.com.tn' },
  };

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
      to_email: recipients[recipient].email,
    };

    try {
      await send(serviceId, templateId, templateParams, publicKey);
      setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error('EmailJS send error', err);
      setError('Une erreur est survenue. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-white dark:bg-slate-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 animate-text-glow">{t.contact.title}</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 sm:p-8 md:p-10 rounded-2xl bg-gray-100 dark:bg-slate-900/50 border border-gray-200 dark:border-teal-500/20">
            <label className="block mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Destinataire</span>
              <div className="mt-1 relative">
                <button
                  type="button"
                  onClick={() => setOpenRecipientDropdown(!openRecipientDropdown)}
                  className="w-full flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-md border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm hover:border-teal-500 dark:hover:border-teal-400 transition-colors"
                >
                  <span>{recipients[recipient].label}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openRecipientDropdown ? 'rotate-180' : ''}`} />
                </button>

                {openRecipientDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md shadow-lg z-10">
                    {Object.entries(recipients).map(([key, { label }]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setRecipient(key);
                          setOpenRecipientDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 sm:py-3 text-sm font-medium transition-colors ${
                          recipient === key
                            ? 'bg-teal-500 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </label>

            <label className="block mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Nom</span>
              <input name="name" value={form.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white p-3 sm:p-4 text-sm" />
            </label>
            <label className="block mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Email</span>
              <input name="email" value={form.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white p-3 sm:p-4 text-sm" />
            </label>
            <label className="block mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Message</span>
              <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="mt-1 block w-full rounded-md border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white p-3 sm:p-4 text-sm" />
            </label>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <button type="submit" disabled={loading} className="px-6 py-3 text-sm bg-teal-500 text-white rounded-lg disabled:opacity-60 w-full sm:w-auto">{loading ? 'Envoi...' : 'Envoyer'}</button>
              {sent && <div className="text-xs sm:text-sm text-teal-400">Message envoyé</div>}
            </div>
            {error && <div className="text-xs sm:text-sm text-red-400 mt-2 sm:mt-3">{error}</div>}
          </motion.form>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-6 sm:p-8 md:p-10 rounded-2xl bg-white dark:bg-slate-900/60 border border-gray-200 dark:border-teal-500/20">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Nos Coordonnées</h3>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0 * 0.1 }}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-gradient-to-br from-teal-500/10 to-blue-600/10 rounded-lg border border-teal-500/20 flex-shrink-0">
                      <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-teal-400" />
                    </div>
                    <h4 className="text-sm sm:text-base text-gray-900 dark:text-white font-semibold">{t.about.phone}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 pl-8 sm:pl-11 break-words">{t.about.phoneValue}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * 0.1 }}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-gradient-to-br from-teal-500/10 to-blue-600/10 rounded-lg border border-teal-500/20 flex-shrink-0">
                      <Mail className="w-4 sm:w-5 h-4 sm:h-5 text-teal-400" />
                    </div>
                    <h4 className="text-sm sm:text-base text-gray-900 dark:text-white font-semibold">{t.about.email}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 pl-8 sm:pl-11 break-words">{t.about.emailValue}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * 0.1 }}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-gradient-to-br from-teal-500/10 to-blue-600/10 rounded-lg border border-teal-500/20 flex-shrink-0">
                      <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-teal-400" />
                    </div>
                    <h4 className="text-sm sm:text-base text-gray-900 dark:text-white font-semibold">{t.about.address}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 pl-8 sm:pl-11 break-words">{t.about.addressValue}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 * 0.1 }}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                    <div className="p-2 bg-gradient-to-br from-teal-500/10 to-blue-600/10 rounded-lg border border-teal-500/20 flex-shrink-0">
                      <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-teal-400" />
                    </div>
                    <h4 className="text-sm sm:text-base text-gray-900 dark:text-white font-semibold">{t.about.hours}</h4>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 pl-8 sm:pl-11 break-words">{t.about.hoursValue}</p>
                </motion.div>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-slate-800">
                <iframe
                  title="DevPack location"
                  src="https://www.google.com/maps?ll=34.934996,10.747956&z=16&t=m&hl=fr&gl=TN&mapclient=embed&cid=13898490099790554127&output=embed"
                  className="w-full h-48 sm:h-56 md:h-64 rounded-md border-0"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
