import { Link } from "react-router";
import { BookOpen } from "lucide-react";
import { useTheme } from "@/components/theme/theme-provider";

const Footer = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <footer
      className={`${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } py-10 transition-colors duration-200 border-t ${
        isDark ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
              <span className="text-xl font-bold">LibraryHub</span>
            </div>
            <p
              className={`text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Your digital library management system
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Browse Books", path: "/books" },
                { label: "Search", path: "/" },
                { label: "My Account", path: "/" },
                { label: "Help", path: "/" },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`transition-colors ${
                      isDark
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div
              className={`text-sm space-y-1 ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <p>123 Library St</p>
              <p>City, State 12345</p>
              <p>info@libraryhub.com</p>
            </div>
          </div>
        </div>

        <div
          className={`flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <p
            className={`text-sm ${isDark ? "text-gray-500" : "text-gray-600"}`}
          >
            © {new Date().getFullYear()} LibraryHub. All rights reserved.Design
            And Developed by{" "}
            <a
              target="_blank"
              href="https://github.com/sufiansar"
              className="text-green-600 font-bold hover:underline"
            >
              Sufian
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
