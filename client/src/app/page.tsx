import localFont from 'next/font/local';
import home from './home.module.scss';
import Link from 'next/link';
const lackLine = localFont({
  src: './styles/fonts/Lack-Regular.woff2',
});
export default function Home() {
  return (
    <div className={home.container}>
      <div className={home.container_block}>
        <h1 className="title">HomeAssistant</h1>
        <div className="">
          <Link href="/login">Вход</Link>
          <Link href="/reg" className="">
            Регистрация
          </Link>
        </div>
      </div>
    </div>
  );
}
