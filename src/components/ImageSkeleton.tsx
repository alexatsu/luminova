import { ImageListItem, Skeleton } from "@mui/material";
import { useMemo } from "react";
interface ImageSkeletonProps {
  count: number;
}

export default function ImageSkeleton({ count }: ImageSkeletonProps) {
  const skeletonArr = useMemo(
    () =>
      Array(count)
        .fill(null)
        .map(item => (
          <Skeleton>
            <ImageListItem key={Math.random() * 100}>
              <div
                style={{
                  width: 500 + "px",
                  height: 750 + "px",
                }}
              ></div>
            </ImageListItem>
          </Skeleton>
        )),
    []
  );
  return <>{skeletonArr.map(item => item)}</>;
}
