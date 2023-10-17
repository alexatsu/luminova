import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Loader, NoResults } from "@/shared/components";
import { endpoints, handleFetch } from "@/shared/utils";

import sass from "@shared/styles/pages/InteractiveSearch/Users.module.scss";
import { Box, Button, Paper, Text } from "@mantine/core";
import { AiOutlineUser } from "react-icons/ai";

const { search } = endpoints;

export function Users() {
  const { query } = useParams();
  const queryKey = ["searchUsers", query];

  const searchUsers = async (): Promise<
    { name: string; id: string; email: string }[] | undefined
  > => {
    const url = search.users;

    const { users, error } = (await handleFetch(`${url}/?query=${query}`)) as {
      users: { name: string; id: string; email: string }[];
      error: string;
    };

    if (error) {
      console.log(error);
      return;
    }

    return users;
  };

  const { data, status } = useQuery({ queryKey, queryFn: searchUsers });

  if (status === "error") {
    return <div>Error occurred</div>;
  }

  if (status === "loading") {
    return <Loader style={{ margin: " auto " }} />;
  }

  if (data?.length === 0) {
    return <NoResults className={sass.title} query={query} />;
  }

  return (
    <UsersWrapper>
      <h2 className={sass.title}>{query}</h2>
      <Box className={sass.cardWrapper}>
        {data?.map(({ id, name }) => (
          <UserCard key={id} name={name} />
        ))}
      </Box>
    </UsersWrapper>
  );
}

function UsersWrapper({ children }: { children: React.ReactNode }) {
  return <div className={sass.containerWrapper}>{children}</div>;
}

function UserCard({ name }: { name?: string }) {
  return (
    <Paper className={sass.cardPaper}>
      <Box
        style={{ display: "flex", flex: "1 1 33%", justifyContent: "center", alignItems: "center" }}
      >
        <AiOutlineUser
          size={26}
          color="grey"
          cursor={"pointer"}
          style={{ marginRight: "10px", flexShrink: 0 }}
        />
        <Text className={sass.userName}>{name}</Text>
      </Box>

      <Link
        to={`/${name}`}
        style={{ width: "100%", display: "flex", justifyContent: "center", textDecoration: "none" }}
      >
        <Button style={{ backgroundColor: "grey" }}>View profile</Button>
      </Link>
    </Paper>
  );
}
