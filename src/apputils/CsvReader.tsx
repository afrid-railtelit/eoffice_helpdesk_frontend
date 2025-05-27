/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { UserDataType } from "@/types/userDataTypes";
import { X } from "lucide-react";
import Papa from "papaparse";
import React, { useRef, useState } from "react";
import { RiUserAddLine } from "react-icons/ri";

interface CsvReaderInterface {
  fileHeaders: { value: string; pattern?: RegExp; required: boolean }[];
  onClose: () => void;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setFileData: any;
  labelString: string;
  callBack: () => void;
  userData?: UserDataType[];
  filePath:string
}

function CsvReader({
  fileHeaders,
  setSelectedFile,
  onClose,
  setFileData,
  labelString,
  callBack,
  userData,
  filePath
}: CsvReaderInterface) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedFile, setFile] = useState<File>();
  const [data, setData] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  function handleCSVUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setFile(file);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data as any[];

        if (data.length > 0) {
          for (let i = 0; i < data?.length; i++) {
            for (let index = 0; index < fileHeaders?.length; index++) {
              if (
                !data[i][fileHeaders[index].value] &&
                fileHeaders[index].required
              ) {
                console.log(fileHeaders[index])
                setErrorMessage(
                  "File headers do not match the required format. Please download the template and re-upload."
                );
                (fileInputRef as any).current.value = "";
                return;
              } else if (fileHeaders[index].pattern) {
                if (
                  !fileHeaders[index].pattern?.test(
                    data[i][fileHeaders[index].value]
                  )
                ) {
                  (fileInputRef as any).current.value = "";
                  setErrorMessage(
                    `Row ${i + 2} : Invalid value for ${
                      fileHeaders[index].value
                    }`
                  );

                  return;
                }
              } else {
                if (userData && userData?.length > 0) {
                  const usersEmails = userData?.map(
                    (item: UserDataType) => item?.emailId
                  );
                  if (usersEmails.includes(data[i]["Email id"])) {
                    (fileInputRef as any).current.value = "";
                    setErrorMessage(`Row ${i + 2} : Email id already exists`);

                    return;
                  }
                }

                setErrorMessage("");
                setData(data);
                setFileData(data);
              }
            }
          }
        } else {
          (fileInputRef as any).current.value = "";
          setErrorMessage("No data found in the uploaded file");
        }
      },
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleCSVUpload}
        className="lg:w-[20vw] border px-2 py-1 rounded"
      />
      <p className=" text-foreground/60 w-[19vw] ml-1 -mt-2">
        Upload CSV with headers:{" "}
        <span className="font-semibold text-foreground">
          {fileHeaders.map((h) => h.value).join(", ")}
        </span>
      </p>
      <p>
        Download sample file from here :{" "}
        <a download={true} href={filePath} className="text-primary">
          Download
        </a>
      </p>
      <p className="text-destructive -mt-2 text-sm max-w-[20vw]">
        {errorMessage}
      </p>
      {data?.length > 0 && !errorMessage && (
        <div className="flex text-constructive -mt-2 font-medium ">
          ✅ {data.length} row{data.length > 1 ? "s" : ""} successfully
          validated.
        </div>
      )}
      {selectedFile && (
        <div className="flex -ml-2 items-center gap-3">
          <Button
            type="button"
            onClick={onClose}
            className="w-1/2"
            variant={"ghost"}
          >
            <X />
            Close
          </Button>
          <Button
            onClick={callBack}
            disabled={data?.length === 0 || !data}
            className="w-1/2"
          >
            <RiUserAddLine />
            {data?.length > 1 ? `${labelString}s` : labelString}
          </Button>
        </div>
      )}
    </div>
  );
}
export default CsvReader;
