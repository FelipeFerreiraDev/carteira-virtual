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
    ITransactionRecurrentProps,
    IWalletProps,
  } from "../types/interfaces";
  
  function RecurrentTransactions() {
    const [loading, setLoading] = useState<boolean>(false);
    const [transactions, setTransactions] = useState<ITransactionRecurrentProps[]>([]);
    const [wallet, setWallet] = useState<IWalletProps>();
    const { id } = useParams();
    const [observation, setObservation] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<string>("");
    const [categories, setCategories] = useState<ICategoryProps[]>([]);
    const [dateFinish, setDateFinish] = useState<Date>(new Date());
    const {
      isOpen: isOpenTransaction,
      onOpen: onOpenTransaction,
      onClose: onCloseTransaction,
    } = useDisclosure();
    const toast = useToast();
  
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
        .get(`http://localhost:3000/transactions-recurrents/find-all-by-wallet/${id}`)
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
  
    async function handleCreateTransaction() {
      try {
        await axios.post(
          "http://localhost:3000/transactions-recurrents/create-transaction-recurrent",
          {
            amount,
            observation,
            type,
            categoryId,
            walletId: id,
            dateFinish,
          },
        );
  
        axios
          .get(`http://localhost:3000/wallets/find-by-id/${id}`)
          .then((response) => {
            setWallet(response.data);
          });
  
        axios
          .get(`http://localhost:3000/transactions-recurrents/find-all-by-wallet/${id}`)
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
          `http://localhost:3000/transactions-recurrents/delete/${id_transaction}`,
        );
  
        axios
          .get(`http://localhost:3000/wallets/find-by-id/${id}`)
          .then((response) => {
            setWallet(response.data);
          });
  
        axios
          .get(`http://localhost:3000/transactions-recurrents/find-all-by-wallet/${id}`)
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
            Todas as transações recorrentes
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
                Adicionar transação recorrente
              </Button>
            </Box>
          </Box>
          <TableContainer>
            <Table variant="striped" colorScheme="brand">
              <TableCaption>Transações recorrentes cadastradas</TableCaption>
              <Thead>
                <Tr>
                  <Th>Data de finalização</Th>
                  <Th>Observação</Th>
                  <Th>Valor</Th>
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
          <Modal isOpen={isOpenTransaction} onClose={onCloseTransaction}>
            <ModalOverlay />
            <ModalContent borderRadius="md" boxShadow="lg" p={4}>
              <ModalHeader display="flex" alignItems="center">
                <Icon as={FaWallet} w={6} h={6} mr={2} />
                Cadastrar nova transação recorrente
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
                    <FormLabel htmlFor="dateFinish">Data de finalização</FormLabel>
                    <Input
                      type="date"
                      onChange={(event) => setDateFinish(new Date(event.target.value))}
                    />
                  </FormControl>
                  <Text fontSize="sm" color="gray.500">
                    Transações recorrentes sempre são executadas no final de cada dia. <span style={{color: 'red'}}>*</span>
                  </Text>
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
        </Box>
      </>
    );
  }
  
  export default RecurrentTransactions;
  