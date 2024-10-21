import { Button, Container, Group, Image, List, Text, ThemeIcon, Title, rem } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import classes from "./Home.module.css";

export default function HomePage() {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            <span className={classes.highlight}>EzJobs</span> <br /> Job Applications Tracker
          </Title>
          <Text c="dimmed" mt="md">
            Description placeholder
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="xl"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>User friendly</b> – Easy to use
            </List.Item>
            <List.Item>
              <b>Free to use</b> – No fees charged
            </List.Item>
            <List.Item>
              <b>Powered by AI</b> – AI resume generator & AI Interview Prep
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="lg" className={classes.control}>
              <Text c="white" fw={700} size="lg">
                Login
              </Text>
            </Button>
            <Button variant="default" radius="xl" size="lg" className={classes.control}>
              <Text c="black" fw={700} size="lg">
                Register
              </Text>
            </Button>
          </Group>
        </div>
        <Image src="/img/home.svg" className={classes.image} />
      </div>
    </Container>
  );
}
