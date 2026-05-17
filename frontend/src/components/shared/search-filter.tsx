import { Search } from "lucide-react";
import { Input } from "@/components/ui/form";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
}

export function SearchFilter({
	value,
	onChange,
	placeholder = "Cari…",
	className,
}: SearchFilterProps) {
	return (
		<div className={cn("relative", className)}>
			<Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="pl-8"
			/>
		</div>
	);
}
