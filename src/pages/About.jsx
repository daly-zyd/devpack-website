import { motion } from 'framer-motion';
import { Target, Eye, Award, Users, TrendingUp, Shield, Briefcase, Heart, Download } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import ImageGallery from '../components/layout/ImageGallery';
import QualityDiagram from '../components/shared/QualityDiagram';

export default function About() {
  const { language } = useLanguage();
  const t = translations[language];
  const missionValues = [
    {
      icon: Target,
      title: t.about.mission,
      description: t.about.missionDesc,
      gradient: 'from-teal-500 to-blue-600',
    },
    {
      icon: Eye,
      title: t.about.vision,
      description: t.about.visionDesc,
      gradient: 'from-blue-600 to-violet-600',
    },
  ];

  const qualityPolicies = [
    {
      icon: Shield,
      title: t.about.qualityTitle,
      description: t.about.qualityDesc1,
    },
    {
      icon: Users,
      title: t.about.clientTitle,
      description: t.about.clientDesc,
    },
    {
      icon: Briefcase,
      title: t.about.supplierTitle,
      description: t.about.supplierDesc,
    },
    {
      icon: Heart,
      title: t.about.staffTitle,
      description: t.about.staffDesc,
    },
    {
      icon: TrendingUp,
      title: t.about.efficiencyTitle,
      description: t.about.efficiencyDesc,
    },
  ];

  const stats = [
    { value: '25+', label: t.about.stats3 },
    { value: '1000+', label: t.about.stats1 },
    { value: '50+', label: t.about.stats4 },
    { value: '100%', label: 'Made in Tunisia' },
  ];

  function AnimatedStat({ value, label }) {
    const [count, setCount] = useState(null);
    const ref = useRef(null);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let started = false;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          // extract numeric part and suffix
          const m = String(value).match(/^(\d+(?:[\.,]\d+)?)(.*)$/);
          if (!m) {
            setCount(value);
            return;
          }
          const num = Number(m[1].replace(',', '.')) || 0;
          const suffix = m[2] || '';
          const duration = 1500;
          const steps = 60;
          const increment = num / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              clearInterval(timer);
              setCount(`${Math.round(num)}${suffix}`);
            } else {
              setCount(`${Math.round(current)}${suffix}`);
            }
          }, duration / steps);
        }
      }, { threshold: 0.5 });
      observer.observe(el);
      return () => observer.disconnect();
    }, [value]);

    return (
      <div ref={ref} className="relative p-4 sm:p-5 md:p-6 rounded-2xl bg-gray-100 dark:bg-slate-900/50 backdrop-blur-sm border border-gray-200 dark:border-teal-500/20 text-center group hover:border-gray-300 dark:hover:border-teal-500/40 transition-all animate-glow-pulse card-3d">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10">
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent mb-2 sm:mb-3">
            {count ?? value}
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{label}</div>
        </div>
      </div>
    );
  }

  const facilityImages = [
    {
      id: '1',
      src: 'http://www.devpack.com.tn/static/media/boucherie.2774d45f.webp',
      alt: t.about.butcher,
      title: t.about.butcher,
      description: t.about.butcherDesc,
    },
    {
      id: '2',
      src: 'http://www.devpack.com.tn/static/media/datte.796384de.webp',
      alt: t.about.fresh,
      title: t.about.fresh,
      description: t.about.freshDesc,
    },
    {
      id: '3',
      src: 'http://www.devpack.com.tn/static/media/bio.f99d3789.webp',
      alt: t.about.organic,
      title: t.about.organic,
      description: t.about.organicDesc,
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-950 pb-24">
      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/20 to-white dark:from-slate-950 dark:via-blue-950/20 dark:to-slate-950"></div>

        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500/10 to-blue-600/10 rounded-full border border-teal-500/30"
            >
              <span className="text-teal-400 text-sm font-medium">✦ {t.about.title}</span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-gray-900 dark:text-white mb-2 sm:mb-4 animate-text-glow">{t.about.heroTitle}</span>
              <span className="block bg-gradient-to-r from-teal-400 via-blue-500 to-blue-700 bg-clip-text text-transparent">
                {t.about.subtagline}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {t.about.heroDescription}
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-20">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <AnimatedStat value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {missionValues.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-6 sm:p-8 md:p-10 rounded-2xl bg-gray-100 dark:bg-slate-900/50 backdrop-blur-sm border border-gray-200 dark:border-teal-500/20 overflow-hidden group hover:border-gray-300 dark:hover:border-teal-500/40 transition-all card-3d animate-float"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>

                <div className="relative z-10">
                  <div className={`inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-br ${item.gradient} bg-opacity-10 mb-4 sm:mb-6`}>
                    <item.icon className="w-8 sm:w-10 h-8 sm:h-10 text-teal-400" strokeWidth={1.5} />
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{item.title}</h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-32 bg-gray-50 dark:bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,155,149,0.1),transparent_50%)]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-text-glow">
              Notre <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Politique Qualité</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.about.qualityPolicyTeam}
            </p>
          </motion.div>

          {/* Diagramme animé */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <QualityDiagram policies={qualityPolicies} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {qualityPolicies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative p-6 sm:p-8 rounded-2xl bg-gray-100 dark:bg-slate-900/50 backdrop-blur-sm border border-gray-200 dark:border-teal-500/20 hover:border-gray-300 dark:hover:border-teal-500/40 transition-all group animate-float card-3d"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <div className="inline-flex p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-teal-500/10 to-blue-600/10 mb-4 sm:mb-5">
                    <policy.icon className="w-6 sm:w-7 h-6 sm:h-7 text-teal-400" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">{policy.title}</h3>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-400 leading-relaxed">{policy.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-32 bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4 sm:space-y-6"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-500/10 to-blue-600/10 rounded-full border border-teal-500/30">
                <Award className="w-4 sm:w-5 h-4 sm:h-5 text-teal-400 mr-2" />
                <span className="text-teal-400 text-xs sm:text-sm font-medium">Excellence Certifiée</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight animate-text-glow">
                {t.about.trustPartner} <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Confiance</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
                {t.about.trustPartnerText}
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-relaxed">
                {t.about.trustPartnerText2}
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
                {[t.about.badge1, t.about.badge2, t.about.badge3, t.about.badge4].map((badge, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="px-3 sm:px-4 py-2 bg-gray-100 dark:bg-slate-900/50 backdrop-blur-sm border border-gray-200 dark:border-teal-500/30 rounded-lg text-teal-600 dark:text-teal-400 text-xs sm:text-sm font-medium"
                  >
                    {badge}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-teal-500/20">
                <img
                  src="images/partenaire.jpg"
                  alt="DevPack Facilities"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>

              <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-32 bg-gray-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 animate-text-glow">
              Notre <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">{t.about.infrastructureTitle}</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t.about.infrastructureText}
            </p>
          </motion.div>

          <ImageGallery images={facilityImages} columns={3} />
        </div>
      </motion.section>

      <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-32 bg-white dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,155,149,0.1),transparent_70%)]"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 sm:space-y-8 p-6 sm:p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-slate-900/80 dark:to-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-teal-500/20 animate-glow-pulse card-3d"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white animate-text-glow">
              Contactez Notre <span className="bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">{t.about.contactSection}</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Commencer Votre Projet — Contactez-nous dès aujourd'hui pour découvrir nos solutions d'emballage innovantes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 text-left">
              <div className="space-y-1 sm:space-y-2 p-3 sm:p-4 md:p-5 rounded-lg bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">{t.about.phone}</p>
                <p className="text-xs sm:text-sm md:text-base text-gray-900 dark:text-white font-bold">{t.about.phoneValue}</p>
              </div>
              <div className="space-y-1 sm:space-y-2 p-3 sm:p-4 md:p-5 rounded-lg bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">{t.about.email}</p>
                <p className="text-xs sm:text-sm md:text-base text-gray-900 dark:text-white font-bold break-all">{t.about.emailValue}</p>
              </div>
              <div className="space-y-1 sm:space-y-2 p-3 sm:p-4 md:p-5 rounded-lg bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">{t.about.address}</p>
                <p className="text-xs sm:text-sm md:text-base text-gray-900 dark:text-white font-bold">{t.about.addressValue}</p>
              </div>
              <div className="space-y-1 sm:space-y-2 p-3 sm:p-4 md:p-5 rounded-lg bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors">
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">{t.about.hours}</p>
                <p className="text-xs sm:text-sm md:text-base text-gray-900 dark:text-white font-bold">{t.about.hoursValue}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4 pt-4 sm:pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-shadow whitespace-nowrap"
              >
                <span>{t.about.demandQuote}</span>
              </motion.button>
              <motion.button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/pdfs/Brochure DevPack.pdf';
                  link.download = 'Brochure DevPack.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 text-xs sm:text-sm md:text-base bg-gray-200 dark:bg-slate-900/50 text-gray-900 dark:text-white font-semibold rounded-lg sm:rounded-xl border border-gray-300 dark:border-teal-500/30 hover:border-gray-400 dark:hover:border-teal-500/50 transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                <span>{t.about.downloadBrochure}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
