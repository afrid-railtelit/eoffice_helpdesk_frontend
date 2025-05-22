;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

function TicketsTableToolBar() {
  const [searchedValue, setSearchedValue] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  return (
    <div className="flex flex-row items-center gap-3">
      <Input
        icon="search"
        value={searchedValue}
        onChange={(e) => {
          const value = e?.target?.value;
          setSearchedValue(value);
        }}
        about="Search By Email id,Name or Mobile number..."
        className="lg:w-[20vw]"
        placeholder="Search By Email id,Name or Mobile number..."
        noErrorMessage={true}
        onClear={() => {
          setSearchedValue("");
        }}
      />
      <Select
        onValueChange={(value) => {
          setSelectedStatus(value);
        }}
      >
        <SelectTrigger
          value={selectedStatus}
          about="Select Status"
          className="w-[180px]"
        >
          <SelectValue placeholder="Select a Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="RESOLVED">RESOLVED</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button title="Search">
        <RiSearchLine />
        Search
      </Button>
      
      <Button variant={"ghost"} title="Clear">
        <X />Clear
      </Button>

    </div>
  );
}

export default TicketsTableToolBar;
