const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sky-950 text-white flex flex-wrap items-center justify-center px-2 sm:px-4 py-3 sm:py-0 min-h-16">
      <p className="text-center text-sm sm:text-base">
        Copyright &copy; {currentYear} - All rights reserved!
      </p>
    </footer>
  );
};

export default Footer;
