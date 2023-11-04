import Link from 'next/link';

interface INavMobileItemProps {
  href: string;
  children: React.ReactNode;
  target?: '_blank' | '_self';
}

export const NavMobileItem = ({
  href,
  children,
  target
}: INavMobileItemProps) => {
  return (
    <Link
      href={href}
      target={target}
      className="m-3 flex items-center rounded-lg"
    >
      <div className="ml-4 text-base font-medium text-black hover:text-[#868686]">
        {children}
      </div>
    </Link>
  );
};
