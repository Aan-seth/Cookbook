// import Navbar from "@/components/Navbar";
// import "./globals.css"; // Ensure Tailwind styles are included

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-gray-50">
//         <Navbar />
//         <main className="container mx-auto p-4">{children}</main>
//       </body>
//     </html>
//   );
// }

// app/layout.js
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Cookbook AI',
  description: 'Discover & Share Delicious Recipes',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
