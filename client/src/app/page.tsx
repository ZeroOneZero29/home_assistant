import localFont from 'next/font/local';
import home from './home.module.scss';
const lackLine = localFont({
  src: './styles/fonts/Lack-Regular.woff2',
});
export default function Home() {
  return (
    <div className={home.container}>
      <hr className={home.line} />
      <div className={home.container_block}>
        <h1 className="title">HomeAssistant</h1>
        <div className="">
          <button className="TestSass">Вход</button>
          <button className="">Регистрация</button>
        </div>
      </div>
    </div>
  );
}
