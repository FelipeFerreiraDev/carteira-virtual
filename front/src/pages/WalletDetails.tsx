import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
  TableContainer,
  Box,
  Text,
  Button,
  Spinner,
  useDisclosure,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
  Select,
} from "@chakra-ui/react";
import HeaderHome from "../components/HeaderHome";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { formatData } from "../utils/dataFormat";
import { FaWallet } from "react-icons/fa";
import {
  ICategoryProps,
  ITransactionProps,
  IWalletProps,
} from "../types/interfaces";

import { saveAs } from 'file-saver';

function WalletDetails() {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<ITransactionProps[]>([]);
  const [wallet, setWallet] = useState<IWalletProps>();
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState<string>("");
  const [observation, setObservation] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenTransaction,
    onOpen: onOpenTransaction,
    onClose: onCloseTransaction,
  } = useDisclosure();
  const {
    isOpen: isOpenDate,
    onOpen: onOpenDate,
    onClose: onCloseDate,
  } = useDisclosure();
  const toast = useToast();
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");

  const showToastSuccess = () => {
    toast({
      title: "Cadastro Finalizado",
      description: "Categoria cadastrada com sucesso!",
      status: "success", // "info", "warning", "error"
      duration: 5000,
      isClosable: true,
    });
  };

  const showToastError = () => {
    toast({
      title: "Erro no cadastro",
      description: "Ocorreu um erro ao cadastrar a categoria!",
      status: "error", // "info", "warning", "error"
      duration: 5000,
      isClosable: true,
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/wallets/find-by-id/${id}`)
      .then((response) => {
        setWallet(response.data);
      });
    axios
      .get(`http://localhost:3000/transactions/find-all/${id}`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    axios
      .get("http://localhost:3000/categories/find-all")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    setLoading(true);
  }, []);

  async function handleCreateCategory() {
    try {
      await axios.post("http://localhost:3000/categories/create-category", {
        name: categoryName,
      });

      showToastSuccess();

      axios
        .get("http://localhost:3000/categories/find-all")
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      onClose();
    } catch (error) {
      showToastError();
      console.error("There was an error!", error);
    }
  }

  async function handleCreateTransaction() {
    try {
      await axios.post(
        "http://localhost:3000/transactions/create-transaction",
        {
          observation,
          type,
          amount,
          categoryId,
          walletId: id,
        },
      );

      axios
        .get(`http://localhost:3000/wallets/find-by-id/${id}`)
        .then((response) => {
          setWallet(response.data);
        });

      axios
        .get(`http://localhost:3000/transactions/find-all/${id}`)
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

      setObservation("");
      setType("");
      setAmount(0);
      setCategoryId("");

      onCloseTransaction();
    } catch (error) {
      console.error("There was an error!", error);
    }
  }

  async function handleDeleteTransaction(id_transaction: string) {
    try {
      await axios.delete(
        `http://localhost:3000/transactions/delete/${id_transaction}`,
      );

      axios
        .get(`http://localhost:3000/wallets/find-by-id/${id}`)
        .then((response) => {
          setWallet(response.data);
        });

      axios
        .get(`http://localhost:3000/transactions/find-all/${id}`)
        .then((response) => {
          setTransactions(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } catch (error) {
      console.error("There was an error!", error);
    }
  }

  async function handleExportCsv() {
    try {
      const response = await axios.get(`http://localhost:3000/transactions/export/${id}`, {
        params: {
          dateStart: dateStart,
          dateEnd: dateEnd,
        },
        responseType: 'blob', 
    });
    const blob = new Blob([response.data], { type: 'text/csv' });
    saveAs(blob, 'transactions.csv');
    } catch (error) {
      console.error("There was an error!", error);
    }
  }

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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Text fontSize="4xl" fontWeight="bold" color="brand.500" mb={4}>
          Detalhes da carteira
        </Text>

        <Box display="flex" justifyContent="space-between" width="100%">
          <Box display="flex" ml={4} flexDirection="row" w="100%">
            <Text fontSize="2xl" fontWeight="bold" color="brand.800" mb={4}>
              Saldo atual: R$ {wallet?.balance}
            </Text>
          </Box>

          <Box display="flex" alignItems="center" justifyContent="end" w="100%">
            <Button
              colorScheme="brand"
              size="lg"
              m={4}
              boxShadow="md"
              onClick={onOpenTransaction}
            >
              Adicionar movimentação
            </Button>
            <Button
              colorScheme="brand"
              size="lg"
              m={4}
              boxShadow="md"
              onClick={onOpen}
            >
              Adicionar categoria
            </Button>
          </Box>
        </Box>

          <Box display="flex" justifyContent="end" width="100%">
            <Link to={`/wallet/${id}/recurrent-tasks`}>
              <Button size="lg" m={4}>
                Adicionar transações recorrentes
              </Button>
            </Link>
            {transactions.length > 0 && (
              <Link to={`/wallet/${id}/graphics`}>
                <Button size="lg" m={4}>
                  Ver gráficos
                </Button>
              </Link>
            )}
            <Button size="lg" m={4} backgroundColor="green.500" color="white" _hover={{ backgroundColor: "green.600" }} onClick={onOpenDate}>
              Exportar csv
            </Button>
          </Box>

        <TableContainer>
          <Table variant="striped" colorScheme="brand">
            <TableCaption>Movimentações na carteira</TableCaption>
            <Thead>
              <Tr>
                <Th>Data</Th>
                <Th>Observação</Th>
                <Th>Valor</Th>
                <Th>Categoria</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions.map((transaction) => (
                <Tr
                  key={transaction.id}
                  backgroundColor={
                    transaction.type === "expense" ? "red.100" : "green.100"
                  }
                  _hover={{
                    backgroundColor:
                      transaction.type === "expense" ? "red.200" : "green.200",
                  }}
                >
                  <Th>{formatData(transaction.createdAt)}</Th>
                  <Th>{transaction.observation}</Th>
                  <Th>
                    {transaction.type === "expense"
                      ? `- ${transaction.amount}`
                      : `+ ${transaction.amount}`}
                  </Th>
                  <Th>{transaction.category.name}</Th>
                  <Th>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() =>
                        handleDeleteTransaction(transaction.id)
                      }
                    >
                      Excluir
                    </Button>
                  </Th>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent borderRadius="md" boxShadow="lg" p={4}>
            <ModalHeader display="flex" alignItems="center">
              <Icon as={FaWallet} w={6} h={6} mr={2} />
              Cadastrar nova categoria
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Nome da cateogria</FormLabel>
                  <Input
                    placeholder="Ex: Reserva de emergência"
                    onChange={(event) => setCategoryName(event.target.value)}
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
              <Button colorScheme="green" onClick={handleCreateCategory}>
                Confirmar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenTransaction} onClose={onCloseTransaction}>
          <ModalOverlay />
          <ModalContent borderRadius="md" boxShadow="lg" p={4}>
            <ModalHeader display="flex" alignItems="center">
              <Icon as={FaWallet} w={6} h={6} mr={2} />
              Cadastrar nova movimentação
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Observação</FormLabel>
                  <Input
                    placeholder="Ex: Retirada para pagar conta"
                    onChange={(event) => setObservation(event.target.value)}
                  />
                  <FormLabel htmlFor="type">Tipo de movimentação</FormLabel>
                  <Select
                    id="type"
                    placeholder="Selecione o tipo de movimentação"
                    onChange={(event) => setType(event.target.value)}
                  >
                    <option value="expense">Despesa</option>
                    <option value="revenue">Receita</option>
                  </Select>
                  <FormLabel htmlFor="amount">Valor</FormLabel>
                  <Input
                    type="number"
                    placeholder="Ex: 1000,99"
                    onChange={(event) => setAmount(Number(event.target.value))}
                  />
                  <FormLabel htmlFor="category">Categoria</FormLabel>
                  <Select
                    id="category"
                    placeholder="Selecione a categoria"
                    onChange={(event) => setCategoryId(event.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                variant="outline"
                mr={3}
                onClick={onCloseTransaction}
              >
                Cancelar
              </Button>
              <Button colorScheme="green" onClick={handleCreateTransaction}>
                Confirmar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isOpenDate} onClose={onCloseDate}>
          <ModalOverlay />
          <ModalContent borderRadius="md" boxShadow="lg" p={4}>
            <ModalHeader display="flex" alignItems="center">
              <Icon as={FaWallet} w={6} h={6} mr={2} />
              Selecione o intervalo de datas
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel htmlFor="dateStart">Data de início</FormLabel>
                  <Input
                    type="datetime-local"
                    id="dateStart"
                    onChange={(event) => setDateStart(event.target.value)}
                  />
                  <FormLabel htmlFor="dateEnd">Data de fim</FormLabel>
                  <Input
                    type="datetime-local"
                    id="dateEnd"
                    onChange={(event) => setDateEnd(event.target.value)}
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
              <Button colorScheme="green" onClick={handleExportCsv}>
                Confirmar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default WalletDetails;
