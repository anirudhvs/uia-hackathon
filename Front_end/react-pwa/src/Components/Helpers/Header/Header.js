import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  Button,
  Title,
  Modal,
  SimpleGrid,
  Image
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import image  from "../../../Images/Privacy policy-rafiki.svg";
import { Link } from "react-router-dom";
import { AuthenticationForm } from "../LoginPage/loginPage";
import  { ImageComp }  from "../../../Components/Home/ImageComp"
// import { AuthenticationTitle } from "../Login/Login";
const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  image: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: "#1c7ed6",
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colors.gray[3],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface HeaderResponsiveProps {
  links: { link: string, label: string }[];
}
const datas = {
  links: [
    { link: "/", label: "Home" },
  
    { link: "/addPatient", label: "Add Patient" },
    { link: "/about", label: "About us" },
  ],
};

export function HeaderResponsive({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(datas.links[0].link);
  const [open, setOpen] = useState(false); // register modal
  const { classes, cx } = useStyles();

  const items = datas.links.map((link) => (
    // <Anchor
    //   key= {link.label}
    //   component={Link}
    //   to={link.link}
    //   style={{ textDecoration: "none" }}
    //   className={cx(classes.link)}
    //   onClick={() => {
    //     close();
    //   }}
    // >
    //   {link.label}
    // </Anchor>

    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link)}
      onClick={(event) => {
        // event.preventDefault();
        setActive(link.link);
        close();
      }}
    >
      {link.label}
    </a>
  ));
  //   <Anchor
  //   component={Link}
  //   to={link.link}
  //   style={{ textDecoration: "none" }}
  //   className={cx(classes.link)}
  //   // onClick={() => {
  //   //     // event.preventDefault();
  //   //     setActive(link.link);
  //   //     close();
  //   // }}
  // >
  //   {link.label}
  // </Anchor>
  // ));

  return (
    <Header height={HEADER_HEIGHT} mb={12} className={classes.root}>
      <Container className={classes.header}>
        <Title order={1} c="#1c7ed6">
          DigiPartogram
        </Title>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
        <Modal opened={open} onClose={() => setOpen(false)} size="auto">
          <SimpleGrid
            cols={2}
            breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}
          >
            <div>
              <AuthenticationForm />
            </div>
            <div>
              <Image
                className={classes.image}
                height={500}
                fit="contain"
                src={image}
                alt="Login Illustration"
              />
            </div>
          </SimpleGrid>
        </Modal>
        <Button onClick={() => setOpen(true)}>Login</Button>
      </Container>
      <ImageComp/>
    </Header>
  );
}


 
    
