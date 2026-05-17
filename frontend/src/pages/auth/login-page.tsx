import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input, Label } from "@/components/ui/form";
import { useAuth } from "@/hooks/use-auth";

interface LoginFormValues {
	email: string;
	password: string;
}

export function LoginPage() {
	const { login, user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const [error, setError] = useState<string | null>(null);
	const from =
		(location.state as { from?: Location })?.from?.pathname ?? "/admin";
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<LoginFormValues>();

	if (user) {
		return <Navigate to="/admin" replace />;
	}

	const onSubmit = async (values: LoginFormValues) => {
		setError(null);
		try {
			await login(values.email, values.password);
			navigate(from, { replace: true });
		} catch (err) {
			const message =
				(err as { response?: { data?: { message?: string } } })?.response?.data
					?.message ?? "Login gagal";
			setError(message);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>Masuk SIMMASAMAL</CardTitle>
					<CardDescription>
						Portal pengelolaan Masjid Khairul Amal.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div className="space-y-1.5">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								autoComplete="username"
								{...register("email", { required: true })}
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="password">Kata Sandi</Label>
							<Input
								id="password"
								type="password"
								autoComplete="current-password"
								{...register("password", { required: true })}
							/>
						</div>
						{error ? (
							<p className="text-sm text-destructive" role="alert">
								{error}
							</p>
						) : null}
						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? "Memproses…" : "Masuk"}
						</Button>
					</form>
					<p className="mt-4 text-center text-sm text-muted-foreground">
						Kembali ke{" "}
						<Link to="/" className="text-primary hover:underline">
							halaman publik
						</Link>
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
