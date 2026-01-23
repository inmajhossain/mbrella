import Link from "next/link";
import { FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#103C3F] text-white">
      {/* Main Footer Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-0 py-20 max-w-360">
        <div className="flex flex-row md:flex-row flex-wrap lg:flex-nowrap justify-around lg:justify-between lg:items-start gap-5 gap-y-15 lg:gap-30 lg:gap-y-0">
          {/* Social Media */}
          <div>
            <h3 className="mb-8 font-semibold text-white text-lg">
              Social Media
            </h3>
            <div className="space-y-3 font-semibold text-gray-400">
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                <FaFacebook /> Facebook
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                <FaYoutube /> YouTube
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                <FaLinkedin /> LinkedIn
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 hover:text-gray-300 transition"
              >
                <FaInstagram /> Instagram
              </Link>
              <div className="mt-4">
                <iframe
                  src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Ffacebook.com&width=100&layout=button_count&action=like&size=small&share=true&height=46&appId"
                  width="150"
                  height="28"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-8 font-semibold text-white text-lg">
              Categories
            </h3>
            <ul className="space-y-2 font-semibold text-gray-400">
              <li>
                <Link href="/men" className="hover:text-gray-300 transition">
                  Men (1441)
                </Link>
              </li>
              <li>
                <Link href="/women" className="hover:text-gray-300 transition">
                  Women (956)
                </Link>
              </li>
              <li>
                <Link href="/kids" className="hover:text-gray-300 transition">
                  Kids (532)
                </Link>
              </li>
              <li>
                <Link href="/cap" className="hover:text-gray-300 transition">
                  CAP (39)
                </Link>
              </li>
              <li>
                <Link
                  href="/influencer"
                  className="hover:text-gray-300 transition"
                >
                  Mbrella X Influencer (19)
                </Link>
              </li>
              <li>
                <Link
                  href="/u-by-mbrella"
                  className="hover:text-gray-300 transition"
                >
                  U by Mbrella (21)
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="hover:text-gray-300 transition"
                >
                  Product size guide
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h3 className="mb-8 font-semibold text-white text-lg">About Us</h3>
            <ul className="space-y-2 font-semibold text-gray-400">
              <li>
                <Link href="/faqs" className="hover:text-gray-300 transition">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/store-locations"
                  className="hover:text-gray-300 transition"
                >
                  Store Locations
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-gray-300 transition">
                  Career
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-300 transition">
                  Blog / news feed
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-gray-300 transition"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-8 font-semibold text-white text-lg">Policies</h3>
            <ul className="space-y-2 font-semibold text-gray-400">
              <li>
                <Link
                  href="/cookie-policy"
                  className="hover:text-gray-300 transition"
                >
                  Cookie policy
                </Link>
              </li>
              <li>
                <Link
                  href="/delivery-policy"
                  className="hover:text-gray-300 transition"
                >
                  Delivery policy
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-gray-300 transition"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="hover:text-gray-300 transition"
                >
                  Refund policy
                </Link>
              </li>
              <li>
                <Link
                  href="/return-exchange"
                  className="hover:text-gray-300 transition"
                >
                  Return and exchange
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-300 transition">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="text-center lg:text-start">
            <h3 className="mb-8 font-semibold text-white text-lg">Contacts</h3>
            <div className="space-y-2 font-semibold text-gray-400 text-md">
              <p className="">Mbrella - A Lifestyle Clothing Brand</p>
              <p>inmaj670@gmail.com</p>
              <p>Call us: (+880) 1515212670</p>
              <p className="text-md leading-relaxed">
                Address : Road-16, House-2/1, Rupnagar R/A, Mirpur, Dhaka-1216,
                Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <Image
          src="/footerImage/portPost_footer.webp"
          alt="Payment Methods"
          width={1440}
          height={110}
          className="mx-auto lg:-mt-12 w-full h-full"
        />
      </div>

      {/* Bottom Bar */}
      <div className="bg-amber-400 text-slate-800">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-7xl">
          <div className="flex sm:flex-row flex-col justify-between items-center gap-4 text-sm">
            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="/about" className="hover:text-slate-600 transition">
                About us
              </Link>
              <Link href="/contact" className="hover:text-slate-600 transition">
                Contact us
              </Link>
              <Link href="/loyalty" className="hover:text-slate-600 transition">
                Loyalty card
              </Link>
              <Link href="/track" className="hover:text-slate-600 transition">
                Track order
              </Link>
            </div>
            <div className="text-center sm:text-right">
              <p>
                © 2026 Mbrella ltd. By{" "}
                <span className="font-bold text-[#103C3F] text-base/5">
                  Inmaj Hossain Shahin
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
