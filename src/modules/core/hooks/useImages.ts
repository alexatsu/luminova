import { ImageResources } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { endpoints, handleFetch } from "@/utils";
import { queryClient } from "@/main";
import { reuseAuth } from "@/services/auth";
import { useNavigate } from "react-router-dom";

export const useImages = (queryFunc, key) => {
  const navigate = useNavigate();
  const { refreshAccessToken } = reuseAuth();

  const accessToken = localStorage.getItem("accessToken");

  const { data, isLoading } = useQuery<ImageResources>({
    queryKey: key,

    queryFn: queryFunc,

    refetchOnWindowFocus: false,
  });

  const { mutate: updateFavoriteImages } = useMutation({
    mutationFn: async (public_id: string) => {
      const { updateFavorites } = endpoints.images;

      const data = await handleFetch(
        updateFavorites,
        "POST",
        { public_id: public_id, accessToken: accessToken },
        { Authorization: `Bearer ${accessToken}` }
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
      await queryClient.cancelQueries({
        queryKey: key,
      });
      const previousQuery = queryClient.getQueryData(key);

      queryClient.setQueryData(key, (old?: ImageResources) => {
        const images = old?.images.map((image) => {
          if (image.public_id === public_id) {
            return { ...image, favorite: !image.favorite };
          }
          return image;
        });

        return { ...old, images: images } as ImageResources;
      });
      return { previousQuery };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },

    onError: (err, payload, context) => {
      const previousQuery = context?.previousQuery;
      queryClient.setQueryData(key, previousQuery);
    },
  });

  return { data, isLoading, updateFavoriteImages };
};

export type UseImagesReturn = ReturnType<typeof useImages>;
