import {
  Box,
  Button,
  Text,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Stack,
  FormControl,
  FormLabel,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import HeaderHome from "../components/HeaderHome";
import { FaWallet } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { IWalletProps } from "../types/interfaces";

function Wallets() {
  const [loading, setLoading] = useState<boolean>(false);
  const [wallets, setWallets] = useState<IWalletProps[]>([]);
  const [walletName, setWalletName] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<number>(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/wallets/find-all-wallets`)
      .then((response) => {
        setWallets(response.data);
        setLoading(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  async function handleCreateWallet() {
    try {
      await axios.post("http://localhost:3000/wallets/create-wallet", {
        name: walletName,
        balance: walletBalance,
      });

      axios
        .get(`http://localhost:3000/wallets/find-all-wallets`)
        .then((response) => {
          setWallets(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      onClose();
    } catch (error) {
      console.error("There was an error!", error);
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!loading) {
    return (
      <>
        <HeaderHome initialPage={false} />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={{ base: "calc(100vh - 64px)", md: "calc(100vh - 80px)" }}
        >
          <Spinner size="xl" color="brand.500" />
        </Box>
      </>
    );
  }

  return (
    <>
      <HeaderHome initialPage={false} />
      <Box alignItems="center" justifyContent="center" padding="20px">
        <Box
          alignItems="center"
          justifyContent="space-between"
          mb={8}
          textAlign="center"
        >
          <Text fontSize="4xl" fontWeight="bold" color="brand.500" mb={4}>
            Carteiras registradas
          </Text>
          <Button
            onClick={onOpen}
            colorScheme="brand"
            size="lg"
            width="200px"
            boxShadow="md"
          >
            Criar carteira
          </Button>
        </Box>
        {wallets.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              sm: 2,
              md: 3,
              lg: wallets.length > 3 ? 4 : wallets.length,
            }}
            spacing={4}
            maxW="100%"
            width="100%"
          >
            {wallets.map((wallet, index) => (
              <Card key={wallet.id} width="100%">
                <CardHeader>
                  <Box display="flex" alignItems="center" textAlign="end">
                    <Text color="brand.500" mr={4}>
                      #{index + 1}
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" mr={4}>
                      Carteira
                    </Text>
                    <Text>{wallet.name}</Text>
                  </Box>
                </CardHeader>
                <CardBody>
                  <Text fontSize="xl" fontWeight="bold">
                    Saldo
                  </Text>
                  <Text>R$ {wallet.balance}</Text>
                </CardBody>
                <CardFooter>
                  <Link to={`/wallet/${wallet.id}`} style={{ width: "100%" }}>
                    <Button
                      colorScheme="brand"
                      size="sm"
                      width="100%"
                      height="40px"
                      boxShadow="md"
                    >
                      Detalhes
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Box
            display="flex"
            flexDirection={"column"}
            alignItems="center"
            justifyContent="center"
            height="50%"
          >
            <Text fontSize="xl" fontWeight="bold" color="gray.500">
              Nenhuma carteira registrada
            </Text>
          </Box>
        )}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent borderRadius="md" boxShadow="lg" p={4}>
            <ModalHeader display="flex" alignItems="center">
              <Icon as={FaWallet} w={6} h={6} mr={2} />
              Cadastrar nova carteira
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Nome da carteira</FormLabel>
                  <Input
                    placeholder="Ex: Reserva de emergência"
                    onChange={(event) => setWalletName(event.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Saldo inicial $</FormLabel>
                  <Input
                    type="number"
                    placeholder="Ex: 1000,99"
                    onChange={(event) =>
                      setWalletBalance(Number(event.target.value))
                    }
                  />
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                variant="outline"
                mr={3}
                onClick={onClose}
              >
                Cancelar
              </Button>
              <Button colorScheme="green" onClick={handleCreateWallet}>
                Confirmar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default Wallets;
