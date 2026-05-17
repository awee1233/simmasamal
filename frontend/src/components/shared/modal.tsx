import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	children: ReactNode;
	size?: "sm" | "md" | "lg";
}

const sizeClass = {
	sm: "max-w-md",
	md: "max-w-xl",
	lg: "max-w-3xl",
};

export function Modal({
	open,
	onOpenChange,
	title,
	description,
	children,
	size = "md",
}: ModalProps) {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
				<Dialog.Content
					className={`fixed left-1/2 top-1/2 z-50 w-full ${sizeClass[size]} -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border bg-card p-6 shadow-lg data-[state=open]:animate-in`}
				>
					<div className="mb-4 flex items-start justify-between gap-4">
						<div>
							<Dialog.Title className="text-lg font-semibold">
								{title}
							</Dialog.Title>
							{description ? (
								<Dialog.Description className="text-sm text-muted-foreground">
									{description}
								</Dialog.Description>
							) : null}
						</div>
						<Dialog.Close
							className="rounded-md p-1 text-muted-foreground hover:bg-accent"
							aria-label="Tutup"
						>
							<X className="h-4 w-4" />
						</Dialog.Close>
					</div>
					<div className="max-h-[70vh] overflow-y-auto">{children}</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
