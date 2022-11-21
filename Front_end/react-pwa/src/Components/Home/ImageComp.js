import { createStyles, Container, Title, Text, Button,Image,SimpleGrid,MantineProvider } from '@mantine/core';
// import { Link } from 'react-router-dom';
import image from '../../Images/Pediatrician-cuate.svg'

const useStyles = createStyles((theme) => ({
  root: {
    backgroundColor: '#11284b',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 3,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',

    [theme.fn.smallerThan('md')]: {
      flexDirection: 'column',
    },
  },

  image: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  content: {
    paddingTop: theme.spacing.xl * 2,
    paddingBottom: theme.spacing.xl * 2,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      marginRight: 0,
    },
  },
    image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  title: {
    color: theme.white,
    
    fontWeight: 900,
    lineHeight: 1.05,
    maxWidth: 500,
    fontSize: 48,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      fontSize: 34,
      lineHeight: 1.15,
    },
  },

  description: {
    color: theme.white,
    opacity: 0.75,
    maxWidth: 500,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
    },
  },

  control: {
    paddingLeft: 30,
    paddingRight: 30,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 22,

    [theme.fn.smallerThan('md')]: {
      width: '35%',
    },
  },
}));

export function ImageComp() {
    const msg1 = 'DigiPartogram is a PWA that helps to monitor the current health status of the mother and the fetus. DigiPartogram is an easy to use and highly accessible webapp where you can fetch the data of any active patient and add a new patient as well. '
    const { classes } = useStyles();
  return (
    <MantineProvider
        theme={{ fontFamily: "Poppins, sans-serif" }}
        withGlobalStyles
      >

    <div className={classes.root}>
      

      <Container size="lg" >
        <div className={classes.inner}>
            <SimpleGrid cols={2} breakpoints={[{ maxWidth: 980, cols: 1, spacing: "md" }]}>
          <div className={classes.content}>
         
              
            <Title className={classes.title}>
              <Text
                component="span"
                
                
                >
                DigiPartogram
              </Text>
            </Title>
          

            <Text className={classes.description} mt={30} onMouseEnter={() => window.speechSynthesis.speak(msg1)}
        onMouseLeave={() => window.speechSynthesis.cancel()}>
                DigiPartogram is a PWA that helps to monitor the current health status of the mother and the fetus. 
                DigiPartogram is an easy to use and highly accessible webapp where you can fetch the data of any active patient and add a new patient as well. 
            </Text>
               
            <Button
               variant="outline"
               sx={{  color:'#012f60' }}
               size="md"
              //  className={classes.control}
               mt={40}
               > 
              {/* <Link to="/schemes" style={{ textDecoration: "none", color:"white" }}>Schemes</Link>  */}
            </Button>
          </div>
          <div>
            <Image fit='contain' alt='Disabled people ' height={400} className={classes.image} src={image}/>
          </div>
                </SimpleGrid>

        </div>
      </Container>
              
    </div>
              </MantineProvider>
  );
}