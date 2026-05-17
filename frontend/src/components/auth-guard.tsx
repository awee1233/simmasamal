import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { LoadingState } from "@/components/shared/feedback";
import { useAuthStore } from "@/hooks/use-auth";
import type { Jabatan } from "@/types";

interface AuthGuardProps {
	children: React.ReactNode;
	roles?: Jabatan[];
}

export function AuthGuard({ children, roles }: AuthGuardProps) {
	const status = useAuthStore((s) => s.status);
	const user = useAuthStore((s) => s.user);
	const bootstrap = useAuthStore((s) => s.bootstrap);
	const location = useLocation();

	useEffect(() => {
		if (status === "idle") void bootstrap();
	}, [status, bootstrap]);

	if (status === "idle" || status === "loading") {
		return <LoadingState label="Memeriksa sesi…" />;
	}

	if (status === "anonymous" || !user) {
		return <Navigate to="/login" replace state={{ from: location }} />;
	}

	if (roles && roles.length > 0 && !roles.includes(user.jabatan)) {
		return <Navigate to="/admin" replace />;
	}

	return <>{children}</>;
}
