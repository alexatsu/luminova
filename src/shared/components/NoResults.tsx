export function NoResults({ query, className }: { query: string | undefined; className?: string }) {
  return (
    <div>
      <h2 className={className}>{query}</h2>
      <img
        style={{ display: "block", margin: "auto" }}
        alt="no results"
        src="https://unsplash-assets.imgix.net/empty-states/photos.png"
        width="500"
        height="400"
      />
    </div>
  );
}
