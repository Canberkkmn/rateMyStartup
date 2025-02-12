import type { Metadata } from "next";
import { ReduxProvider } from "@/redux/ReduxProvider";
import Header from "@/components/Header";

import "@/styles/globals.scss";

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
      <body>
        <div className="container">
          <Header />
          <ReduxProvider>
            <main>{children}</main>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
