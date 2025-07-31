import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import backgroundImage from './assets/images/background.jpg';

function App() {
  return (
    <div 
      className="min-h-screen w-full fixed inset-0" 
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-5 py-5">
        <div className="bg-white/10 backdrop-blur-l rounded-3xl shadow-2xl w-full overflow-hidden border border-white/20 max-w-md">
          <div className="py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-white mb-2">Register</h1>
              <p className="text-white/90">Enter your information to access your account</p>
            </div>
            
            <div>
              <div className="flex -mx-3">
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="firstName" className="text-xs font-semibold px-1 text-white">First name</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-white/70 text-lg"></i>
                    </div>
                    <input 
                      type="text" 
                      id="firstName"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm outline-none focus:border-indigo-400 focus:bg-white/20 text-white placeholder-white/60" 
                      placeholder="John"
                    />
                  </div>
                </div>
                <div className="w-1/2 px-3 mb-5">
                  <label htmlFor="lastName" className="text-xs font-semibold px-1 text-white">Last name</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-white/70 text-lg"></i>
                    </div>
                    <input 
                      type="text" 
                      id="lastName"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm outline-none focus:border-indigo-400 focus:bg-white/20 text-white placeholder-white/60" 
                      placeholder="Smith"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <label htmlFor="email" className="text-xs font-semibold px-1 text-white">Email</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-email-outline text-white/70 text-lg"></i>
                    </div>
                    <input 
                      type="email" 
                      id="email"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm outline-none focus:border-indigo-400 focus:bg-white/20 text-white placeholder-white/60" 
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-12">
                  <label htmlFor="password" className="text-xs font-semibold px-1 text-white">Password</label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-lock-outline text-white/70 text-lg"></i>
                    </div>
                    <input 
                      type="password" 
                      id="password"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm outline-none focus:border-indigo-400 focus:bg-white/20 text-white placeholder-white/60" 
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex -mx-3">
                <div className="w-full px-3 mb-5">
                  <button className="block w-full max-w-xs mx-auto bg-indigo-500/80 hover:bg-indigo-600/90 focus:bg-indigo-600/90 text-white rounded-lg px-3 py-3 font-semibold backdrop-blur-sm border border-white/20 transition-all duration-200 hover:shadow-lg">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App