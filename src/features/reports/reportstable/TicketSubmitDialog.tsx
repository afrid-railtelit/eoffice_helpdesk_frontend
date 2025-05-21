import { Textarea } from "@/components/ui/teatarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function TicketSubmitDialog() {
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [remarks, setRemarks] = useState<string>("");
  return (
    <div className="flex flex-col gap-5">
      <Select
        onValueChange={(value) => {
          setSelectedStatus(value);
        }}
      >
        <SelectTrigger
          value={selectedStatus}
          about="Issue type"
          className="lg:w-[20vw]"
        >
          <SelectValue placeholder="Select Issue type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Issue type</SelectLabel>
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="RESOLVED">RESOLVED</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => {
          setSelectedStatus(value);
        }}
      >
        <SelectTrigger
          value={selectedStatus}
          about="Issue description"
          className="lg:w-[20vw]"
        >
          <SelectValue placeholder="Select description" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Issue description</SelectLabel>
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="RESOLVED">RESOLVED</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) => {
          setSelectedStatus(value);
        }}
      >
        <SelectTrigger
          value={selectedStatus}
          about="Issue resolution"
          className="lg:w-[20vw]"
        >
          <SelectValue placeholder="Select Resolution " />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Resolution</SelectLabel>
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="RESOLVED">RESOLVED</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Textarea
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => {
          const value = e?.target?.value;
          setRemarks(value);
        }}
        className="lg:w-[20vw] resize-none"
        about="Remarks"
      />

      <Button>Submit</Button>
    </div>
  );
}
export default TicketSubmitDialog;
