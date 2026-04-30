import { useEffect } from 'react';
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

// Initialize socket outside component to prevent multiple connections
const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
  withCredentials: true
});

const NotificationHandler = () => {
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    if (user?._id) {
      // Join a private room for this specific user
      socket.emit('join', user._id);

      // Listen for reminders from the backend
      socket.on('taskReminder', (data) => {
        toast(`⏰ Reminder: ${data.title}`, {
          duration: 5000,
          position: 'top-right',
          icon: '🔔',
          style: {
            borderRadius: '12px',
            background: '#1e293b',
            color: '#fff',
            fontWeight: '600'
          }
        });
      });
    }

    // Cleanup on unmount or user logout
    return () => {
      socket.off('taskReminder');
    };
  }, [user]);

  return null; // This component renders nothing
};

export default NotificationHandler;