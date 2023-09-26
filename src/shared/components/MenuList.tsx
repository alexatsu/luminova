import { Button, Menu, Text, useMantineTheme } from "@mantine/core";

export function MenuList() {
  const theme = useMantineTheme();
  return (
    <div>
      <Menu
        transitionProps={{ transition: "pop-top-right" }}
        position="top-end"
        width={220}
        withinPortal
      >
        <Menu.Target>
          <Button>Create new</Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            rightSection={
              <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                Ctrl + P
              </Text>
            }
          >
            Project
          </Menu.Item>
          <Menu.Item
            rightSection={
              <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                Ctrl + T
              </Text>
            }
          >
            Task
          </Menu.Item>
          <Menu.Item
            rightSection={
              <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                Ctrl + U
              </Text>
            }
          >
            Team
          </Menu.Item>
          <Menu.Item
            rightSection={
              <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                Ctrl + E
              </Text>
            }
          >
            Event
          </Menu.Item>
          <Menu.Item
            rightSection={
              <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                Ctrl + E
              </Text>
            }
          >
            Event
          </Menu.Item>
          <Menu.Item
            rightSection={
              <Text size="xs" transform="uppercase" weight={700} color="dimmed">
                Ctrl + E
              </Text>
            }
          >
            Event
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
