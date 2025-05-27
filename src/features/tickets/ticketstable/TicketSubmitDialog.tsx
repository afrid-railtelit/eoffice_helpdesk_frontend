import { Textarea } from "@/components/ui/teatarea";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/apputils/AppContext";
import { useGetIssuesData } from "@/hooks/employeeHooks";
import AppSpinner from "@/apputils/AppSpinner";
import AppDialog from "@/apputils/AppDialog";
import { issueDataType } from "@/types/employeeDataTypes";
import { MdVerified } from "react-icons/md";
import { Send } from "lucide-react";
import { useUpdateTikcetDetails } from "@/hooks/userHooks";
import { useGetEmailId } from "@/hooks/appHooks";
import { ticketRemarkDataType } from "@/types/ticketDataType";

interface TicketSubmitDialogInterface {
  onClose: () => void;
  issueData: issueDataType;
  ticketId: string;
  remarksData: ticketRemarkDataType[];
  ticketNumber: string;
  ticketStatus: string;
}

function TicketSubmitDialog({
  onClose,
  issueData,
  ticketId,
  remarksData,
  ticketNumber,
  ticketStatus,
}: TicketSubmitDialogInterface) {
  const [remarks, setRemarks] = useState<string>("");
  const { issuesData } = useAppContext();
  const { getIssuesData, isPending: gettingIssuesData } = useGetIssuesData();
  const { isPending, updateTicket } = useUpdateTikcetDetails();
  const emailId = useGetEmailId();
  const { dispatch } = useAppContext();

  useEffect(() => {
    if (issuesData?.length === 0) getIssuesData();
  }, []);

  function handleSubmitRemarks() {
    updateTicket(
      {
        remarks,
        ticketId,
        emailId,
        resolve: false,
      },
      {
        onSuccess(data) {
          if (data?.data === "SUCCESS") {
            dispatch({
              type: "setRefresh",
              payload: "",
            });
            onClose();
          }
        },
      }
    );
  }
  function handleMarkAsResolved() {
    updateTicket(
      {
        remarks,
        ticketId,
        emailId,
        resolve: true,
      },
      {
        onSuccess(data) {
          if (data?.data === "SUCCESS") {
            dispatch({
              type: "setRefresh",
              payload: "",
            });
            onClose();
          }
        },
      }
    );
  }

  return (
    <div>
      {" "}
      <AppSpinner isPending={gettingIssuesData || isPending} />
      <AppDialog
        title={`Ticket :  ${ticketNumber}`}
        onClose={() => {
          onClose();
        }}
      >
        <div className="flex  gap-6 h-fit">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Select value={issueData?.issueCode} disabled>
                <SelectTrigger
                  about="Issue type"
                  className="lg:w-[20vw]"
                  value={issueData?.issueCode}
                >
                  <SelectValue placeholder="Select Issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={issueData?.issueCode}>
                    {issueData?.issueCode}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select disabled value={issueData?.issueDescription}>
                <SelectTrigger
                  about="Issue description"
                  className="lg:w-[20vw]"
                  value={issueData?.issueDescription}
                >
                  <SelectValue placeholder="Select description" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={issueData?.issueDescription}>
                    {issueData?.issueDescription}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="Issue resolution"
              value={issueData?.issueResolution}
              className="lg:w-full min-h-32 resize-none pt-3"
              about="Issue resolution"
            />
            {ticketStatus !== "RESOLVED" && (
              <Textarea
                placeholder="Remarks"
                value={remarks}
                onChange={(e) => {
                  const value = e?.target?.value;
                  setRemarks(value);
                }}
                className="lg:w-full min-h-32 resize-none"
                about="Remarks"
              />
            )}

            {ticketStatus !== "RESOLVED" && (
              <div className="flex justify-between">
                <Button onClick={handleSubmitRemarks} disabled={!remarks}>
                  <Send />
                  Submit
                </Button>
                <Button onClick={handleMarkAsResolved} variant={"constructive"}>
                  <MdVerified /> Mark as resolved
                </Button>
              </div>
            )}
          </div>
          {remarksData?.length > 0 && (
            <div className="border-l pl-4 w-[20vw] gap-2 -mt-4 max-h-[45vh] overflow-auto pb-6">
              <div className="text-2xl font-semibold text-nowrap">
                Remarks history
              </div>
              <div className="flex flex-col gap-2">
                {remarksData?.map((item, index) => {
                  return (
                    <div key={index} className="flex flex-col gap-1">
                      <div>
                        <div className="text-foreground/60">
                          From:{" "}
                          <span className="text-foreground font-semibold">
                            {item?.createdBy}
                          </span>
                        </div>
                      </div>
                      <div className="border w-fit px-3 py-2 rounded text-foreground/80">
                        {item?.remark}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </AppDialog>
    </div>
  );
}
export default TicketSubmitDialog;
