import { Logo } from "./Logo";

export function Nav() {
    return (
      <nav className="flex justify-between items-center py-5 px-6">
          <Logo />
          <ul className="flex gap-4">
              <li className="hover:underline transition-colors"><a href="#">Resources</a></li>
              <li className="hover:underline transition-colors"><a href="#">Contact</a></li>
              <li className="hover:underline transition-colors"><a href="#">Support</a></li>
          </ul>
          <button className=" border border-dark hover:bg-dark hover:text-white transition-colors rounded-xl px-5 py-1"><a href="#">Sign In</a></button>
      </nav>
    )
  }
  