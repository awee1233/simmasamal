import { LogOut, Menu } from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { adminNavGroups, filterNav } from "./nav-config";

export function AdminLayout() {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = useState(false);

	const groups = useMemo(() => {
		if (!user) return [];
		return filterNav(adminNavGroups, user.jabatan);
	}, [user]);

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	return (
		<div className="flex min-h-screen">
			<aside
				className={cn(
					"fixed inset-y-0 left-0 z-40 w-64 transform overflow-y-auto border-r bg-card transition-transform md:relative md:translate-x-0",
					mobileOpen ? "translate-x-0" : "-translate-x-full",
				)}
			>
				<div className="flex items-center gap-2 border-b p-4">
					<div className="h-8 w-8 rounded-full bg-primary/10 text-primary" />
					<div>
						<p className="text-sm font-semibold leading-tight">SIMMASAMAL</p>
						<p className="text-xs text-muted-foreground">Admin Dashboard</p>
					</div>
				</div>
				<nav className="space-y-4 p-3 text-sm">
					{groups.map((group) => (
						<div key={group.label}>
							<p className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
								{group.label}
							</p>
							<ul className="space-y-0.5">
								{group.items.map((item) => (
									<li key={item.to}>
										<NavLink
											to={item.to}
											end={item.to === "/admin"}
											onClick={() => setMobileOpen(false)}
											className={({ isActive }) =>
												cn(
													"block rounded-md px-2 py-1.5 text-sm",
													isActive
														? "bg-primary/10 text-primary font-medium"
														: "text-foreground/80 hover:bg-accent hover:text-foreground",
												)
											}
										>
											{item.label}
										</NavLink>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>
			</aside>

			<div className="flex flex-1 flex-col">
				<header className="flex items-center justify-between gap-2 border-b bg-card px-4 py-3">
					<div className="flex items-center gap-2">
						<Button
							variant="ghost"
							size="icon"
							className="md:hidden"
							onClick={() => setMobileOpen((v) => !v)}
							aria-label="Toggle navigation"
						>
							<Menu className="h-5 w-5" />
						</Button>
						<div>
							<p className="text-sm font-semibold">
								Halo, {user?.name ?? "Pengguna"}
							</p>
							<p className="text-xs text-muted-foreground">
								Peran: {user?.jabatan ?? "-"}
							</p>
						</div>
					</div>
					<Button variant="outline" size="sm" onClick={handleLogout}>
						<LogOut className="h-4 w-4" />
						Keluar
					</Button>
				</header>
				<main className="flex-1 overflow-y-auto bg-muted/30 p-4 md:p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
