import { useEffect, useState } from "react";

function Footer() {
  const [date, setDate] = useState<Date>(new Date());
  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    setTimeout(() => {
      new Date();
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="fixed bottom-0 px-10 w-full bg-background py-2   border-t shadow drop-shadow flex items-center justify-between">
      <p className="w-fit text-foreground/70 text-xs">
        Designed & Developed by{" "}
        <span className="text-primary cursor-pointer">
          HMIS Development Team
        </span>
      </p>
      <p>Maintained by RailTel Corporation of India Ltd.</p>

      <p className="w-fit text-foreground/70 text-xs">
        {" "}
        {date?.toDateString()} | {date?.toLocaleTimeString()}
      </p>
    </div>
  );
}

export default Footer;
