import { Box, Button, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

interface HeaderHomeProps {
  initialPage: boolean;
}

function HeaderHome({ initialPage }: HeaderHomeProps) {
  const navigation = useLocation();

  function useHandleExit() {
    if (navigation.pathname === "/wallets") {
      window.location.href = "/";
    } else {
      window.history.back();
    }
  }

  return (
    <Box
      borderBottomRadius={8}
      backgroundColor="white"
      boxShadow="0 1px 0 0 rgba(0,0,0,.05)"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" ml={2}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 1024 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="512" cy="512" r="512" fill="#0088cc" />
            <path
              d="M512 256C353.9 256 220 389.9 220 548S353.9 840 512 840 804 706.1 804 548 670.1 256 512 256zm0 548c-85.4 0-154-68.6-154-154s68.6-154 154-154 154 68.6 154 154-68.6 154-154 154z"
              fill="#fff"
            />
          </svg>
          <Text fontSize="3xl" fontWeight="bold" ml={2} color="brand.500">
            DigitalWallet
          </Text>
        </Box>
        {initialPage ? (
          <Box display="flex" alignItems="center" m={4}>
            <Link to="/wallets">
              <Button colorScheme="brand" size="lg">
                Carteiras
              </Button>
            </Link>
          </Box>
        ) : (
          <Button
            colorScheme="brand"
            size="lg"
            m={4}
            boxShadow="md"
            onClick={useHandleExit}
          >
            Voltar
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default HeaderHome;
