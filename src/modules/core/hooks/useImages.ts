import { ImageResources } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { endpoints, handleFetch } from "@/utils";
import { queryClient } from "@/main";
import { reuseAuth } from "@/services/auth";
import { useNavigate } from "react-router-dom";

export const useImages = (category: string | undefined) => {
  const navigate = useNavigate();
  const { refreshAccessToken } = reuseAuth();

  const accessToken = localStorage.getItem("accessToken");
  const queryKey = ["images", category, endpoints.images, accessToken];

  const { data, isLoading } = useQuery<ImageResources>({
    queryKey: queryKey,

    queryFn: async (): Promise<ImageResources> => {
      const { forNonUser, forUser } = endpoints.images;

      if (!accessToken) {
        const fetchForAnyone = await handleFetch(
          forNonUser,
          "POST",
          {},
          { category: category, next_cursor: "" }
        );
        return fetchForAnyone;
      }

      const fetchForUser = await handleFetch(
        forUser,
        "POST",
        {},
        { accessToken: accessToken, category: category, next_cursor: "" }
      );
      return fetchForUser;
    },

    refetchOnWindowFocus: false,
  });

  const { mutate: updateFavoriteImages } = useMutation({
    mutationFn: async (public_id: string) => {
      const { addToFavorites } = endpoints.images;

      const data = await handleFetch(
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
        const previousResources = old?.images.resources.map((image) => {
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
