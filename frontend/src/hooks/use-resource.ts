import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type ApiEnvelope, apiClient } from "@/lib/api-client";
import type { PaginationMeta } from "@/types";

export interface ListResult<T> {
	items: T[];
	meta?: PaginationMeta;
}

export interface ListParams {
	page?: number;
	limit?: number;
	search?: string;
	[key: string]: unknown;
}

async function getList<T>(
	url: string,
	params?: ListParams,
): Promise<ListResult<T>> {
	const res = await apiClient.get<ApiEnvelope<T[]>>(url, { params });
	return { items: res.data.data ?? [], meta: res.data.meta };
}

export function useResourceList<T>(
	resource: string,
	params: ListParams = {},
	options: { enabled?: boolean } = {},
) {
	return useQuery({
		queryKey: [resource, params],
		queryFn: () => getList<T>(`/${resource}`, params),
		enabled: options.enabled ?? true,
	});
}

export function useResourceItem<T>(
	resource: string,
	id: string | number | null | undefined,
) {
	return useQuery({
		queryKey: [resource, "item", id],
		enabled: id != null,
		queryFn: async () => {
			const res = await apiClient.get<ApiEnvelope<T>>(`/${resource}/${id}`);
			return res.data.data;
		},
	});
}

export function useCreateResource<TInput, TOutput = unknown>(resource: string) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (input: TInput) => {
			const res = await apiClient.post<ApiEnvelope<TOutput>>(
				`/${resource}`,
				input,
			);
			return res.data.data;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: [resource] }),
	});
}

export function useUpdateResource<TInput, TOutput = unknown>(resource: string) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, data }: { id: string | number; data: TInput }) => {
			const res = await apiClient.put<ApiEnvelope<TOutput>>(
				`/${resource}/${id}`,
				data,
			);
			return res.data.data;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: [resource] }),
	});
}

export function useDeleteResource(resource: string) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id: string | number) => {
			await apiClient.delete(`/${resource}/${id}`);
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: [resource] }),
	});
}
