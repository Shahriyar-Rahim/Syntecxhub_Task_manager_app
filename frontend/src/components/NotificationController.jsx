import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

const NotificationController = () => {
  const [permission, setPermission] = useState(Notification.permission);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      toast.error("This browser does not support desktop notifications");
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);

    if (result === 'granted') {
      toast.success("Notifications enabled!");
      // Optional: Play a test sound
      new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
    } else if (result === 'denied') {
      toast.error("Notifications blocked. Please enable them in browser settings.");
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 mb-6">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${permission === 'granted' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
          {permission === 'granted' ? <Bell size={20} /> : <BellOff size={20} />}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-800">
            Push Notifications: {permission.charAt(0).toUpperCase() + permission.slice(1)}
          </p>
          <p className="text-xs text-gray-500">
            {permission === 'granted' 
              ? "You'll receive alerts for your tasks." 
              : "Enable alerts to stay updated on your schedule."}
          </p>
        </div>
      </div>

      {permission !== 'granted' && (
        <button
          onClick={requestPermission}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-md"
        >
          Enable Now
        </button>
      )}
      
      {permission === 'denied' && (
        <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
          <Settings size={12} /> Check Browser Settings
        </div>
      )}
    </div>
  );
};

export default NotificationController;