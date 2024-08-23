const Header = () => {
  const navItems = [
    { href: '/obbli', label: '오브리' },
    { href: '/lesson', label: '레슨' },
    { href: '/recruit', label: '채용' },
    { href: '/concert', label: '공연' },
    { href: '/board', label: '게시판' },
  ];

  return (
    <header className='fixed left-0 top-0 flex w-full items-center justify-between bg-white p-3 shadow-md'>
      <a href='/' className='text-2xl font-bold text-orange-500'>
        {'Obbli'}
      </a>
      <nav>
        <ul className='flex space-x-4'>
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className='text-lg text-gray-700 hover:text-orange-500'
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div />
    </header>
  );
};

export default Header;
