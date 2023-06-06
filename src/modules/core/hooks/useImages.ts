import { ImageResources, ImagesProps } from "@/types";
import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import { endpoints, handleFetch } from "@/utils";
import { queryClient } from "@/main";
import { authHandler } from "@/services";
import { useNavigate } from "react-router-dom";

export const useImages = (queryKey: QueryKey, fetchImages: () => Promise<ImageResources>) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const { refreshAccessToken } = authHandler();

  const { data, isLoading } = useQuery<ImageResources>({
    queryKey: queryKey,
    queryFn: fetchImages,
  });

  const { mutate: updateFavoriteImages } = useMutation({
    mutationFn: async (public_id: string) => {
      const { addToFavorites } = endpoints.images;

      const data: ImagesProps[] = await handleFetch(
        addToFavorites,
        "POST",
        { Authorization: `Bearer ${accessToken}` },
        { public_id: public_id, accessToken: accessToken }
      );

      const { error } = data as unknown as { error: string };

      if (error === "Access token expired") {
        refreshAccessToken(navigate);
      }

      if (
        error === "Access token missing" ||
        error === "Unauthorized" ||
        error === "Invalid Access Token"
      ) {
        navigate("/login");
        localStorage.removeItem("accessToken");
        return;
      }

      return data;
    },

    onMutate: async (public_id: string) => {
      await queryClient.cancelQueries({ queryKey: queryKey });
      const previousQuery = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old?: ImageResources) => {
        const previousResources = old?.resources.map((image) => {
          if (image.public_id === public_id) {
            return { ...image, favorite: !image.favorite };
          }
          return image;
        });

        return { ...old, resources: previousResources } as ImageResources;
      });
      return { previousQuery };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },

    onError: (err, payload, context) => {
      const previousQuery = context?.previousQuery;
      queryClient.setQueryData(queryKey, previousQuery);
    },
  });

  return { data, isLoading, updateFavoriteImages };
};
export type UseImagesReturn = ReturnType<typeof useImages>;
