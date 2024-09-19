import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Search, X } from "lucide-react";

interface IOrderTableFiltersProps {}

export function OrderTableFilters({}: IOrderTableFiltersProps) {
  return (
    <>
      <form action="" className="flex items-center  gap-2">
        <span className="text-sm font-semibold">Filtros:</span>
        <Input placeholder="ID do pedido" className="h-8 w-auto" />
        <Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
        <Select defaultValue="Todos status">
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos status</SelectItem>
            <SelectItem value="pending">Pendente</SelectItem>
            <SelectItem value="canceled">Cancelado</SelectItem>
            <SelectItem value="processing">Em preparo</SelectItem>
            <SelectItem value="delivering">Em entrega</SelectItem>
            <SelectItem value="delivered">Entregue</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" variant="secondary">
          <Search className="size-4 mr-2" />
          Filtrar resultados
        </Button>
        <Button type="button" variant="outline" size={"sm"}>
          <X className="size-4 mr-2" />
          Remover filtros
        </Button>
      </form>
    </>
  );
}
