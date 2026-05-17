import { NavLink, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

const publicLinks = [
	{ to: "/", label: "Beranda" },
	{ to: "/infaq", label: "Infaq" },
	{ to: "/zakat", label: "Zakat" },
	{ to: "/qurban", label: "Qurban" },
];

export function PublicLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b bg-card">
				<div className="container flex items-center justify-between py-3">
					<NavLink to="/" className="flex items-center gap-2">
						<div className="h-9 w-9 rounded-full bg-primary/10 text-primary" />
						<div>
							<p className="text-sm font-semibold leading-tight">SIMMASAMAL</p>
							<p className="text-xs text-muted-foreground">
								Masjid Khairul Amal
							</p>
						</div>
					</NavLink>
					<nav className="hidden items-center gap-1 md:flex">
						{publicLinks.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end={link.to === "/"}
								className={({ isActive }) =>
									cn(
										"rounded-md px-3 py-1.5 text-sm",
										isActive
											? "bg-primary/10 text-primary font-medium"
											: "text-foreground/80 hover:bg-accent",
									)
								}
							>
								{link.label}
							</NavLink>
						))}
						<NavLink
							to="/login"
							className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
						>
							Login
						</NavLink>
					</nav>
				</div>
			</header>
			<main className="flex-1">
				<Outlet />
			</main>
			<footer className="border-t bg-card py-6 text-center text-sm text-muted-foreground">
				© {new Date().getFullYear()} Masjid Khairul Amal · SIMMASAMAL
			</footer>
		</div>
	);
}
