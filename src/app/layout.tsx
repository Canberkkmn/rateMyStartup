import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/ReduxProvider";
import Header from "@/components/Header";

import "../styles/globals.css";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "RateMyStartup",
  description: "Discover and rate the best startups in the industry.",
  icons: {
    icon: "/S_Favicon.png",
  },
};

export default function RootLayout({ children }: Props): React.ReactElement {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <Header />
          <ReduxProvider>
            <main>{children}</main>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
