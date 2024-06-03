import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Box, Select, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { ICategoryProps, ITransactionProps } from "../types/interfaces";
import {
  filterExpense,
  filterLast10Days,
  filterLast10DaysExpense,
  filterLast10DaysRevenue,
  filterRevenue,
  formatDataForPlotly,
} from "../utils/parsesDataGraphcs";

interface GraphProps {
  data: ITransactionProps[];
  categories: ICategoryProps[];
}

function Graph({ data, categories }: GraphProps) {
  const [view, setView] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [plotData, setPlotData] = useState<{ x: string[]; y: number[] }>({
    x: [],
    y: [],
  });

  useEffect(() => {
    let filteredData: ITransactionProps[] = [];

    switch (view) {
      case "last10days":
        filteredData = filterLast10Days(data, filterCategory);
        break;
      case "all":
        if (filterCategory === "all" || !filterCategory) {
          filteredData = data;
        } else {
          filteredData = data.filter(
            (transaction) => transaction.categoryId === filterCategory,
          );
        }
        break;
      case "last10days-expense":
        filteredData = filterLast10DaysExpense(data, filterCategory);
        break;
      case "last10days-revenue":
        filteredData = filterLast10DaysRevenue(data, filterCategory);
        break;
      case "all-expense":
        filteredData = filterExpense(data, filterCategory);
        break;
      case "all-revenue":
        filteredData = filterRevenue(data, filterCategory);
        break;
      default:
        filteredData = data;
    }

    setPlotData(formatDataForPlotly(filteredData));
  }, [view, data, filterCategory]);

  return (
    <Box>
      <Select value={view} onChange={(e) => setView(e.target.value)} mb={4}>
        <option value="all">Todo o período</option>
        <option value="last10days">Últimos 10 dias</option>
        <option value="all-expense">Todo o período - Saídas</option>
        <option value="last10days-expense">Últimos 10 dias - Saídas</option>
        <option value="all-revenue">Todo o período - Entradas</option>
        <option value="last10days-revenue">Últimos 10 dias - Entradas</option>
      </Select>
      <RadioGroup
        mb={4}
        onChange={setFilterCategory}
        value={filterCategory}
        defaultValue="all"
      >
        <Stack direction="row" width="100%" spacing={4} flexWrap="wrap">
          {categories.map((category) => (
            <Radio value={category.id} key={category.id} colorScheme="brand">
              {category.name}
            </Radio>
          ))}
        </Stack>
        <Radio value="all" mt={6}>
          Todas as categorias
        </Radio>
      </RadioGroup>
      <Plot
        data={[
          {
            x: plotData.x,
            y: plotData.y,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{
          title: "Transações realizadas para a carteira",
          xaxis: { title: "Data das entradas" },
          yaxis: { title: "Valores das entradas" },
        }}
        style={{ width: "100%", height: "400px" }}
      />
    </Box>
  );
}

export default Graph;
