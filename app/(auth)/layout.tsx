import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <Image
            src="/icons/authpage.jpg"
            alt="Auth image"
            width={500}
            height={900}
            className="rounded-l-xl object-contain"
          />
        </div>
      </div>
    </main>
  );
}
