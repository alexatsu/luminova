import { imagesStyles } from "@/styles/imageCard";
import { endpoints, authEndpoints } from "@/utils";
import { Box } from "@mantine/core";
import { ImageList, ImageListItem, Button, Typography, SxProps, Theme } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AiFillHeart } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { useResizeWidth } from "@/hooks";
import { queryClient } from "@/main";
import { ImageResources } from "@/types";
import { Loader } from "@/components";

const { buttonHeart, buttonHeartActive, container, title } = imagesStyles as {
  buttonHeart: SxProps<Theme> | undefined;
  buttonHeartActive: SxProps<Theme> | undefined;
  container: SxProps<Theme>;
  title: SxProps<Theme>;
};

export function Category() {
  const navigate = useNavigate();
  const width = useResizeWidth();
  const token = localStorage.getItem("accessToken");
  const { category } = useParams();
  console.log(category);

  
  const getImages = async (token: string, category: string) => {
    //TODO: Update to user Categories
    const { categoriesImages, categoriesUserImages } = endpoints.images;
    if (!token) {
      const fetchForAnyone = await fetch(categoriesImages, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: category, next_cursor: "" }),
      });
      return await fetchForAnyone.json();
    }
    const fetchForUser = await fetch(categoriesUserImages, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        next_cursor: "",
        category: category,
      }),
    });
    
    return await fetchForUser.json();
  };

  const useQueryParams = {
    queryKey: ["images", token, category],
    queryFn: () => getImages(token!, category!),
  };
  const { data, isLoading } = useQuery<ImageResources>(useQueryParams);
  console.log(data);


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
      queryClient.setQueryData(["images", accessToken], (old?: ImageResources | undefined) => {
        return {
          ...old,
          resources: old?.resources.map((image) => {
            if (image.public_id === public_id) {
              return { ...image, favorite: !image.favorite };
            }
            return image;
          }),
        } as ImageResources | undefined;
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

  const Images = () => (
    <ImageList variant="standard" cols={width > 568 ? 3 : 1} gap={8}>
      <>
        {data?.resources.map(({ public_id, url, filename, favorite }) => (
          <ImageListItem key={public_id} sx={container} >
            <img src={url} alt={filename} loading={"eager"} style={{ borderRadius: "8px" }} />
            <Button
              sx={favorite ? buttonHeartActive : buttonHeart}
              onClick={() => mutate({ accessToken: token!, public_id })}
            >
              <AiFillHeart size={16} />
            </Button>
            <Typography sx={title} variant={"h5"} className="title">
              {filename}
            </Typography>
          </ImageListItem>
        ))}
      </>
    </ImageList>
  );
  // return (
  //   <>
  //     <Images />
  //   </>
  // );
  return <Box>{isLoading ? <Loader /> : <Images />}</Box>;
}
