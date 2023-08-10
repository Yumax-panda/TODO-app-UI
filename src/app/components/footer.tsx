import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import settings from "../../settings.json";

const Footer = () => {
  return (
    <footer className='absolute bottom-0'>
      <div className='max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto'>
        {/* Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 items-center gap-5 text-center'>
          <div>
            <Link
              className='flex-none text-xl font-semibold text-black dark:text-white'
              href='/'
              aria-label='TODO-app'
            >
              TODO-app
            </Link>
          </div>
          {/* End Col */}

          <ul className='text-center'>
            <li className="inline-block relative pr-8 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-gray-600">
              <Link
                className='inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200'
                href='/about'
              >
                About
              </Link>
            </li>
            <li className="inline-block relative pr-8 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-gray-600">
              <Link
                className='inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200'
                href='/terms'
              >
                Terms of Service
              </Link>
            </li>
            <li className="inline-block relative pr-8 last:pr-0 last-of-type:before:hidden before:absolute before:top-1/2 before:right-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-gray-600">
              <Link
                className='inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200'
                href='/contact'
              >
                Contact Us
              </Link>
            </li>
          </ul>
          {/* End Col */}

          {/* Social Brands*/}
          <div className='md:text-right space-x-2'>
            <Link
              className='inline-flex justify-center items-center w-8 h-8 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-offset-slate-900'
              href={settings.officialUrls.GitHub}
            >
              <FontAwesomeIcon icon={faGithub} height={16} width={16} />
            </Link>

            <Link
              className='inline-flex justify-center items-center w-8 h-8 text-center text-gray-500 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition dark:text-gray-500 dark:hover:text-gray-200 dark:hover:bg-gray-800 dark:focus:ring-offset-slate-900'
              href={settings.officialUrls.Discord}
            >
              <FontAwesomeIcon icon={faDiscord} height={16} width={16} />
            </Link>
          </div>
          {/* End Social Brands */}
        </div>
        {/* End Grid */}
      </div>
    </footer>
  );
};

export default Footer;
