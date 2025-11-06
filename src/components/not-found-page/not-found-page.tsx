
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRoute.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="container">
          <section style={{ textAlign: 'center', padding: '50px 0' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to={AppRoute.Main}>Go back to main page</Link>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;
