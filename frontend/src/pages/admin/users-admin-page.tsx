import { ResourceAdminPage } from "@/components/shared/resource-admin-page";
import { Input, Label, Select } from "@/components/ui/form";
import type { Jabatan } from "@/types";

interface User {
	id: number;
	name: string;
	email: string;
	jabatan: Jabatan;
	createdAt: string;
}

interface UserForm {
	name: string;
	email: string;
	password: string;
	jabatan: Jabatan;
}

export function UsersAdminPage() {
	return (
		<ResourceAdminPage<User, UserForm>
			resource="auth/users"
			title="Pengguna"
			searchable={false}
			columns={[
				{ key: "name", header: "Nama" },
				{ key: "email", header: "Email" },
				{ key: "jabatan", header: "Jabatan" },
			]}
			toFormValues={(row) => ({
				name: row?.name ?? "",
				email: row?.email ?? "",
				password: "",
				jabatan: row?.jabatan ?? "Administrator",
			})}
			renderForm={(form) => (
				<div className="grid gap-3">
					<div className="space-y-1.5">
						<Label htmlFor="name">Nama</Label>
						<Input id="name" {...form.register("name", { required: true })} />
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							type="email"
							{...form.register("email", { required: true })}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="password">Kata Sandi</Label>
						<Input
							id="password"
							type="password"
							{...form.register("password")}
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="jabatan">Jabatan</Label>
						<Select
							id="jabatan"
							{...form.register("jabatan", { required: true })}
						>
							<option value="Administrator">Administrator</option>
							<option value="Bendahara DKM">Bendahara DKM</option>
							<option value="Petugas Qurban">Petugas Qurban</option>
						</Select>
					</div>
				</div>
			)}
		/>
	);
}
