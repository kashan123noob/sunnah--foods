import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useFoods() {
  return useQuery({
    queryKey: [api.foods.list.path],
    queryFn: async () => {
      const res = await fetch(api.foods.list.path);
      if (!res.ok) throw new Error("Failed to fetch foods");
      return api.foods.list.responses[200].parse(await res.json());
    },
  });
}

export function useFood(slug: string) {
  return useQuery({
    queryKey: [api.foods.getBySlug.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.foods.getBySlug.path, { slug });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch food details");
      return api.foods.getBySlug.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}
