import { Route, Routes } from 'react-router-dom';
import { auth } from './config/firebase/firebaseConfig';
import Layout from './pages/layout/Layout';
import React from 'react';
import Authentification from './pages/authentification/Authentification';
import Home from './pages/home/Home';
import routes from './config/routes';
import ProfilPage from './pages/profilPage/ProfilPage';
import { useEffect } from 'react';
import TweetPage from './pages/tweet-page/TweetPage';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { setUserData } from './feature/user.slice';
import axios from 'axios';
import { setPostsData } from './feature/posts.slice';
import { setUserProfilData } from './feature/userProfil.slice';
import Research from './pages/research/Research';

function App() {
  ///Redux Toolkit////////////////////////////////////////////
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUserData(user));
      }
    });
    axios
      .get(
        'https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Tweets.json'
      )
      .then((res) => dispatch(setPostsData(res.data)))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://twitter-clone-43761-default-rtdb.europe-west1.firebasedatabase.app/Users/${user.displayName}/Profil.json`
        )
        .then((res) => dispatch(setUserProfilData(res.data)))
        .catch((err) => console.log(err));
    }
  }, [user]);

  ///////////////////////////////////////////////////////////////

  return (
    <>
      <Routes>
        <Route path={routes.AUTH} element={<Authentification />} />
        <Route
          path={routes.HOME}
          element={
            <Layout user={user}>
              <Home user={user} />
            </Layout>
          }
        />
        <Route
          path={routes.RESEARCH}
          element={
            <Layout user={user}>
              <Research user={user} />
            </Layout>
          }
        />

        <Route
          path={routes.PROFIL_PAGE}
          element={
            <Layout user={user}>
              <ProfilPage user={user} />
            </Layout>
          }
        />
        <Route
          path={routes.TWEET}
          element={
            <Layout>
              <TweetPage user={user} />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
