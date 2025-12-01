import { motion } from 'framer-motion';
import { Search, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../i18n/translations';
import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';

export default function Products() {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('Tous');
  const [openDropdown, setOpenDropdown] = useState(null);

  // Reconstructed product list inspired from legacy site
  const products = useMemo(
    () => [
      {
        id: 'standard',
        title: 'Standard',
        category: 'Barquettes',
        image: './images/products/standard.jpg',
        desc: "Barquettes standard en polystyrène expansé, plusieurs tailles et profondeurs.",
      },
      {
        id: 'boucherie',
        title: 'Boucherie / Charcuterie',
        category: 'Boucherie',
        image: './images/products/boucherie.webp',
        desc: "Barquettes spéciales pour viande et charcuterie, rigidité et protection optimales.",
      },
      {
        id: 'primeur',
        title: 'Primeur',
        category: 'Primeur',
        image: './images/products/bio.webp',
        desc: "Solutions d'emballage pour fruits et légumes frais, aération adaptée.",
      },
      {
        id: 'bio',
        title: 'Bio',
        category: 'Primeur',
        image: './images/products/bio.webp',
        desc: "Gamme bio — emballages destinés aux produits labellisés bio.",
      },
      {
        id: 'oeufs',
        title: 'Oeufs (BOX Oeufs)',
        category: 'Oeufs',
        image: './images/products/meat.webp',
        desc: "Box et inserts pour oeufs — protection et empilage sécurisé.",
      },
      {
        id: 'datte',
        title: 'Emballage Dattes',
        category: 'Spécialités',
        image: './images/products/datte.webp',
        desc: "Barquettes et formats dédiés à la commercialisation des dattes.",
      },
      {
        id: 'datte_500',
        title: 'Dattes 500g',
        category: 'Spécialités',
        image: './images/products/datte_500.webp',
        desc: "Format 500g adapté au commerce moderne et export.",
      },
      {
        id: 'barquette-dp',
        title: 'Barquette DP',
        category: 'Barquettes',
        image: './images/products/boucherie.webp',
        desc: "Barquette auto-absorbante en XPS, mono-matériau, légère et stable.",
      },
      {
        id: 'couvercle-films',
        title: 'Couvercles & Films',
        category: 'Accessoires',
        image: './images/products/standard.jpg',
        desc: "Couvercles et films adaptés aux barquettes pour scellage et présentation.",
      },
      {
        id: 'personnalise',
        title: 'Emballage Personnalisé',
        category: 'Personnalisé',
        image: './images/products/standard.jpg',
        desc: "Conception et production d'emballages sur-mesure selon cahier des charges.",
      },
    ],
    []
  );

  const categories = useMemo(() => ['Tous', ...Array.from(new Set(products.map((p) => p.category)))], [products]);

  const filtered = products.filter((p) => (category === 'Tous' ? true : p.category === category)).filter((p) => p.title.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="w-full bg-white dark:bg-slate-950 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 animate-text-glow">{t.products?.title || 'Nos Produits'}</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">{t.products?.subtitle || 'Découvrez notre gamme d\'emballages adaptée à vos métiers.'}</p>
        </motion.div>

        <div className="flex flex-col gap-4 mb-8">
          {/* Search bar */}
          <div className="w-full">
            <div className="relative">
              <input 
                value={q} 
                onChange={(e) => setQ(e.target.value)} 
                placeholder="Rechercher un produit..." 
                className="w-full rounded-lg border border-gray-200 dark:border-slate-700 p-3 sm:p-4 pl-10 sm:pl-12 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm sm:text-base focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 transition-colors" 
              />
              <Search className="absolute left-3 sm:left-4 top-3 sm:top-4 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Category dropdown */}
          <div className="flex gap-3 flex-col sm:flex-row sm:items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Catégorie:</label>
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'category' ? null : 'category')}
                className="w-full sm:w-48 flex items-center justify-between px-4 py-2.5 sm:py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm sm:text-base hover:border-teal-500 dark:hover:border-teal-400 transition-colors"
              >
                <span className="font-medium">{category}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'category' ? 'rotate-180' : ''}`} />
              </button>
              
              {openDropdown === 'category' && (
                <div className="absolute top-full left-0 w-full sm:w-48 mt-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCategory(c);
                        setOpenDropdown(null);
                      }}
                      className={`w-full text-left px-4 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-colors ${
                        category === c
                          ? 'bg-teal-500 text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((p) => (
            <motion.article key={p.id} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-teal-500/20 shadow-sm">
              <div className="h-40 sm:h-44 bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                <img src={p.image} alt={p.title} loading="lazy" className="object-cover w-full h-40 sm:h-44" onError={(e) => { e.currentTarget.src = './images/placeholder.png'; }} />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{p.title}</h3>
                  <span className="text-xs sm:text-sm bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-gray-700 dark:text-gray-300 whitespace-nowrap">{p.category}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2 sm:mt-3 line-clamp-2">{p.desc}</p>
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                  <button onClick={() => navigate('/contact', { state: { product: p.title } })} className="px-4 py-2 text-xs sm:text-sm bg-teal-500 text-white rounded-lg"> Demander un devis</button>
                  <button onClick={() => {}} className="text-xs sm:text-sm text-teal-600 dark:text-teal-400 flex items-center gap-2">Voir détails <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" /></button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="rounded-2xl p-6 sm:p-8 md:p-10 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900/80 dark:to-slate-800/80 border border-gray-200 dark:border-teal-500/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">{t.home?.finalCta || 'Prêt à travailler ensemble ?'}</h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">{t.home?.readyText || 'Contactez-nous pour étudier votre projet et recevoir une offre sur-mesure.'}</p>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Commencer Votre Projet — Contactez-nous dès aujourd'hui pour découvrir nos solutions d'emballage innovantes.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
              <button onClick={() => navigate('/contact')} className="px-6 py-3 text-sm bg-teal-500 text-white rounded-lg whitespace-nowrap">{t.home?.contactCta || 'Contactez-nous'}</button>
              <a href="/pdfs/Brochure DevPack.pdf" className="px-6 py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-white text-center">{t.home?.downloadBrochure || 'Télécharger la brochure'}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
