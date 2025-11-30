import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-blue-50 to-violet-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-600 to-violet-600 mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 via-blue-600 to-violet-600 mx-auto mb-6 rounded-full"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Page Non Trouvée
        </h2>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-200 dark:border-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Page précédente
          </button>
        </div>
        
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto opacity-20">
          <div className="h-2 bg-teal-500 rounded animate-pulse"></div>
          <div className="h-2 bg-blue-600 rounded animate-pulse delay-100"></div>
          <div className="h-2 bg-violet-600 rounded animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
}
