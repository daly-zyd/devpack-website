import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../i18n/translations';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const contactInfo = [
    {
      icon: Phone,
      label: t.about.phone,
      value: t.about.phoneValue,
    },
    {
      icon: Mail,
      label: t.about.email,
      value: t.about.emailValue,
    },
    {
      icon: MapPin,
      label: t.about.address,
      value: t.about.addressValue,
    },
    {
      icon: Clock,
      label: t.about.hours,
      value: t.about.hoursValue,
    },
  ];

  return (
    <footer className="relative bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950 border-t border-gray-200 dark:border-teal-500/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(15,155,149,0.1),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="space-y-4">
            <img
              src="./devpack_logo.png"
              alt="DevPack Logo"
              className="h-10 w-auto"
            />
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Solutions d'emballage innovantes pour l'industrie agroalimentaire. Qualité premium, respect de l'environnement.
            </p>
          </div>

          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2 sm:space-y-3"
            >
              <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                <div className="p-2 bg-gradient-to-br from-teal-500/10 to-blue-600/10 rounded-lg border border-teal-500/20 flex-shrink-0">
                  <item.icon className="w-4 sm:w-5 h-4 sm:h-5 text-teal-400" />
                </div>
                <h4 className="text-sm sm:text-base text-gray-900 dark:text-white font-semibold break-words">{item.label}</h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 pl-8 sm:pl-11 break-words">{item.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-500 text-sm">
              © {new Date().getFullYear()} DevPack. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-500">
              <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Mentions Légales
              </a>
              <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Politique de Confidentialité
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
