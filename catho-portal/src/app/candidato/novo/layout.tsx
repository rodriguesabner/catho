import Header from "@/components/Header";

function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
}

export default RootLayout;
