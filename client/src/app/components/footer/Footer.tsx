import footer from '../footer/Footer.module.scss';
export default function Footer() {
  return (
    <div className={footer.footer_container}>
      <hr className={footer.one_line} />
      <hr className={footer.two_line} />
      <hr className={footer.three_line} />
    </div>
  );
}
