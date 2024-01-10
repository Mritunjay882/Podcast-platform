import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUpPage from './Pages/SignUpPage';
import Profile from "./Pages/Profile";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from "./slices/userSlice";
import PrivateRoutes from './components/common/privateRoutes';
import PodcastPage from './Pages/Podcasts';
import PodcastDetails from './Pages/PoadcastDetails'; 
import CreateAnEpisodePage from './Pages/CreateAnEpisode';
import CreateAPodcastPage from './Pages/CreatAPodcast';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
          }
        );

        return () => {
          unsubscribeSnapshot();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreateAPodcastPage/>}/>
            <Route path="/podcasts" element={<PodcastPage/>}/>
            <Route path="/podcast/:id" element={<PodcastDetails/>}/>
            <Route path="/podcast/:id/create-episode" element={<CreateAnEpisodePage />} />
          
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;