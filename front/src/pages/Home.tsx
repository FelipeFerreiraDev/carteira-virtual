import { Box, Button, Text, VStack } from '@chakra-ui/react';
import HeaderHome from '../components/HeaderHome';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <HeaderHome initialPage={true} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={{ base: 'calc(100vh - 64px)', md: 'calc(100vh - 80px)' }}
      >
        <VStack spacing={4}>
          <Text fontSize="4xl" fontWeight="bold" color="brand.500">
            Bem-vindo à sua carteira digital
          </Text>
          <Link to="/wallets">
            <Button colorScheme="brand" size="lg" width="200px" boxShadow="md">
              Entrar
            </Button>
          </Link>
        </VStack>
      </Box>
    </>
  );
}

export default Home;
