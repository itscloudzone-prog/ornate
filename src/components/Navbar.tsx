export function Navbar() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <nav
      aria-label="Homepage versions"
      className="fixed top-[calc(16px+env(safe-area-inset-top,0px))] left-1/2 -translate-x-1/2 z-50 flex gap-1 p-[5px] border border-[#D6DCE2]/20 bg-[#101419]/90 backdrop-blur-[14px]"
    >
      <a
        href={baseUrl}
        aria-current="page"
        className="inline-flex min-w-[100px] min-h-11 items-center justify-center px-5 py-2.5 text-xs font-medium tracking-[0.14em] whitespace-nowrap bg-[#D6DCE2] text-[#101419]"
      >
        HOME 1
      </a>
      <a
        href={`${baseUrl}home2/index.html`}
        className="inline-flex min-w-[100px] min-h-11 items-center justify-center px-5 py-2.5 text-xs font-medium tracking-[0.14em] whitespace-nowrap text-[#D6DCE2] hover:bg-[#202730] hover:text-white transition-colors"
      >
        HOME 2
      </a>
    </nav>
  );
}
