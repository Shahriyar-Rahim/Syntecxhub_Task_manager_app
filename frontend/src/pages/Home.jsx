import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle, Bell, Layers, Zap } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-700">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6">
              <Zap size={16} /> Now with Real-time Reminders
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
              Master your day, <br />
              <span className="text-blue-600">one task</span> at a time.
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
              The smart task manager designed for high-performance teams and CSE professionals. Organize, track, and get notified in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/register" 
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-xl shadow-blue-200"
              >
                Get Started Free <ArrowRight size={20} />
              </Link>
              <Link 
                to="/login" 
                className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition text-center"
              >
                View Demo
              </Link>
            </div>
          </div>
          
          <div className="relative">
            {/* Decorative element to simulate a dashboard preview */}
            <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl transform rotate-2 hover:rotate-0 transition duration-500">
              <div className="bg-white rounded-2xl overflow-hidden aspect-video flex flex-col p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="space-y-4">
                  <div className="h-8 w-3/4 bg-gray-100 rounded-lg animate-pulse" />
                  <div className="h-20 w-full bg-blue-50 rounded-xl border border-blue-100" />
                  <div className="h-12 w-1/2 bg-gray-50 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">Everything you need</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Focused on speed and simplicity, so you can stop managing and start doing.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <Bell className="text-orange-500" />, 
              title: "Smart Notifications", 
              desc: "Never miss a deadline. Our system pings you the second a task is due via Socket.io." 
            },
            { 
              icon: <Layers className="text-blue-500" />, 
              title: "Category Workflow", 
              desc: "Organize tasks by Work, Personal, or Urgent categories for maximum clarity." 
            },
            { 
              icon: <CheckCircle className="text-green-500" />, 
              title: "MVC Architecture", 
              desc: "Built on a robust MERN stack with MVC structure for lightning-fast performance." 
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <h2 className="text-4xl lg:text-6xl font-black mb-6 relative z-10">Ready to boost your <br />productivity?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto relative z-10">Join thousands of students and developers who use Task.ly to stay on top of their game.</p>
            <Link 
              to="/register" 
              className="inline-block bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition relative z-10 shadow-xl"
            >
              Sign Up For Free
            </Link>
            
            {/* Background Decorative Circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700 rounded-full translate-x-1/3 translate-y-1/3 opacity-30" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;