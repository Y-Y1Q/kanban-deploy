import { Button, Container, Image, SimpleGrid, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import classes from "./NotFound.module.css";

export default function NotFound404() {
  const navigate = useNavigate(); // Initialize navigate function

  const handleRedirect = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <Container className={classes.root}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <Image src="/img/404.svg" className={classes.mobileImage} />
        <div>
          <Title className={classes.title}>Something is not right...</Title>
          <Text c="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL.
          </Text>
          <Button
            variant="outline"
            size="md"
            mt="xl"
            className={classes.control}
            onClick={handleRedirect}
          >
            Get back to home page
          </Button>
        </div>
        <Image src="/img/404.svg" className={classes.desktopImage} />
      </SimpleGrid>
    </Container>
  );
}
