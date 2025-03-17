import auth from '../auth/auth.module.scss';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';
export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <body className={auth.container_main}>
      <Header />
      {children}
      <Footer />
    </body>
  );
}
