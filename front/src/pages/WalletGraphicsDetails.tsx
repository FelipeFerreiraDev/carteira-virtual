import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderHome from "../components/HeaderHome";
import axios from "axios";
import Graph from "../components/Graph";
import {
  ICategoryProps,
  ITransactionProps,
  IWalletProps,
} from "../types/interfaces";

function WalletGraphicsDetails() {
  const [loading, setLoading] = useState<boolean>(false);
  const [wallet, setWallet] = useState<IWalletProps>();
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [transactions, setTransactions] = useState<ITransactionProps[]>([]);

  const { id } = useParams();

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
          Visualização em gráficos
        </Text>

        <Box display="flex" ml={4} flexDirection="row" w="90%">
          <Text fontSize="2xl" fontWeight="bold" color="brand.800" mb={4}>
            Saldo atual: R$ {wallet?.balance}
          </Text>
        </Box>
        <Box width="70%" justifyContent="center" alignItems="center">
          <Graph data={transactions} categories={categories} />
        </Box>
      </Box>
    </>
  );
}

export default WalletGraphicsDetails;
