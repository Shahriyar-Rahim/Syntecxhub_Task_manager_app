import { useEffect } from 'react';
import { Outlet } from 'react-router'; // Add this if missing
import io from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar'; // Ensure these are imported
import Footer from './components/Footer';

const socket = io('http://localhost:5000');

function App() {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      socket.on('reminder', (data) => {
        toast.custom((t) => (
          <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
              <p className="text-sm font-medium text-gray-900">⏰ Task Reminder</p>
              <p className="mt-1 text-sm text-gray-500">{data.title}</p>
            </div>
          </div>
        ));
      });
    }
    return () => socket.off('reminder');
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <NavBar />
      <main className="grow">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
}

export default App;