import Header from "@/components/Header";

function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex min-h-screen flex-col w-full pt-1">
            <Header withButton={false} />

            <div>{children}</div>
        </div>
    );
}

export default RootLayout;
