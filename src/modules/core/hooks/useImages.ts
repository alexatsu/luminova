import { ImageResources } from "@/shared/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { endpoints, handleFetch } from "@/shared/utils";
import { queryClient } from "@/main";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks";

export const useImages = <T>(
  queryFunc: () => Promise<T | undefined>,
  key: (string | undefined)[]
) => {
  const navigate = useNavigate();
  const { refreshAccessToken } = useAuth();

  const accessToken = localStorage.getItem("accessToken");
  const queryKey = [key, queryFunc];

  const { data, status, error } = useQuery({
    queryKey: queryKey,
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
        localStorage.removeItem("userName");
        return;
      }

      return data;
    },

    onMutate: async (public_id: string) => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousQuery = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old?: ImageResources) => {
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
      queryClient.invalidateQueries({ queryKey: queryKey });
    },

    onError: (err, payload, context) => {
      const previousQuery = context?.previousQuery;
      queryClient.setQueryData(queryKey, previousQuery);
    },
  });

  return { data, error, status, updateFavoriteImages };
};

export type UseImagesReturn = ReturnType<typeof useImages>;
