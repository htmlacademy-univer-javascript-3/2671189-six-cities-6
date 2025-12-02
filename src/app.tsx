import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import MainPage from './components/main-page/main-page';
import LoginPage from './components/login-page/login-page';
import FavoritesPage from './components/favorites-page/favorites-page';
import OfferPage from './components/offer-page/offer-page';
import NotFoundPage from './components/not-found-page/not-found-page';
import PrivateRoute from './components/private-route/private-route';
import { Offer } from './mocks/offers';
import { AppRoute } from './const';
import { store } from './store';
import { fillOffers } from './store/action';

type AppProps = {
  offers: Offer[];
}

function App({ offers }: AppProps): JSX.Element {
  useEffect(() => {
    store.dispatch(fillOffers(offers));
  }, [offers]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage offers={offers} />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginPage />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage offers={offers} />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
