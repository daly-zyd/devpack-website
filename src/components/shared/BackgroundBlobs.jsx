import React from 'react';

export default function BackgroundBlobs({ className = '' }) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none -z-20 ${className}`}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      {/* Blobs principaux avec animation pulse */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      {/* Blobs secondaires avec mouvement float */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-cyan-400/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      
      {/* Petits blobs avec rotation */}
      <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-teal-300/25 rounded-full blur-2xl animate-spin-slow" />
      <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-blue-400/20 rounded-full blur-2xl animate-spin-slow" style={{ animationDelay: '3s', animationDirection: 'reverse' }} />
    </div>
  );
}
