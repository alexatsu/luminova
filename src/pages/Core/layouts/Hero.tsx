import { Loader } from "@/components/Loader";
import { authEndpoints, endpoints } from "@/utils";
import { imagesStyles } from "@/styles/imageCard";
import { useResizeWidth } from "@/hooks";
import { Box, ImageList, ImageListItem, SxProps, Theme, Typography } from "@mui/material";
import { Button, Sx } from "@mantine/core";
import { AiFillHeart } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "@/main";
import { ImageResources, ImagesProps } from "@/types";

export function Hero() {
  const width = useResizeWidth();
  const navigate = useNavigate();

  const { buttonHeart, buttonHeartActive, container, title } = imagesStyles as {
    buttonHeart: Sx;
    buttonHeartActive: Sx;
    container: SxProps<Theme>;
    title: SxProps<Theme>;
  };

  const token = localStorage.getItem("accessToken");

  const getImages = async (token: string) => {
    const { getImages, getImagesForUser } = endpoints.images;
    if (!token) {
      const fetchForAnyone = await fetch(getImages);
      return await fetchForAnyone.json();
    }
    const fetchForUser = await fetch(getImagesForUser, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken: token }),
    });

    return await fetchForUser.json();
  };

  const { data: imageData, isLoading } = useQuery<ImageResources>({
    queryKey: ["images", token],
    queryFn: () => getImages(token as string),
  });

  const addToFavorites = async (accessToken: string, public_id: string): Promise<void> => {
    const { refresh } = authEndpoints;
    const { addToFavorites } = endpoints.images;
    //TODO: refactor this into composables + update token to accept through headers
    const response = await fetch(addToFavorites, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ public_id: public_id, accessToken: accessToken }),
    });
    const data = await response.json();
    console.log(data, "data");

    if (data.error === "Access token expired") {
      const refResponse = await fetch(refresh, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const refreshData = await refResponse.json();

      if (refreshData.error === "Refresh token missing") {
        navigate("/login");
        localStorage.removeItem("accessToken");
        return;
      }

      const accessToken = refreshData.accessToken;
      localStorage.setItem("accessToken", accessToken);
    }
    if (
      data.error === "Access token missing" ||
      data.error === "Unauthorized" ||
      data.error === "Invalid Access Token"
    ) {
      navigate("/login");
      localStorage.removeItem("accessToken");
    }

    return data;
  };

  const { mutate } = useMutation({
    mutationFn: (payload: { accessToken: string; public_id: string }) => {
      const { accessToken, public_id } = payload;
      return addToFavorites(accessToken, public_id);
    },
    onMutate: async (payload: { accessToken: string; public_id: string }) => {
      const { accessToken, public_id } = payload;
      await queryClient.cancelQueries({ queryKey: ["images"] });
      const previousQuery = queryClient.getQueryData(["images"]);
      queryClient.setQueryData(["images", accessToken], (old?: ImageResources) => {
        return {
          ...old,
          resources: old!.resources.map((image) => {
            if (image.public_id === public_id) {
              return { ...image, favorite: !image.favorite };
            }
            return image;
          }),
        };
      });
      return { previousQuery };
    },
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (err, payload, context) => {
      queryClient.setQueryData(["todos"], context!.previousQuery);
      console.log(err, "error");
    },
  });

  console.log(imageData, "imageData");
  console.log(token, "accessToken");
  const getPublicId = (id: ImagesProps["public_id"]) => console.log(id, "public_id");
  const Images = () => (
    <ImageList variant="standard" cols={width > 568 ? 3 : 1} gap={8}>
      <>
        {imageData?.resources.map(({ public_id, url, filename, favorite }) => (
          <ImageListItem key={public_id} sx={container}>
            <img src={url} alt={filename} loading={"lazy"} style={{ borderRadius: "8px" }} />
            <Button
              sx={favorite ? buttonHeartActive : buttonHeart}
              onClick={() => mutate({ accessToken: token!, public_id })}
            >
              <AiFillHeart size={16} />
            </Button>
            <Typography
              sx={title}
              variant={"h5"}
              className="title"
              onClick={() => getPublicId(public_id)}
            >
              {filename}
            </Typography>
          </ImageListItem>
        ))}
      </>
    </ImageList>
  );
  return <Box>{isLoading ? <Loader/> : <Images />}</Box>;
}
