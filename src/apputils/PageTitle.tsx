import { useAppContext } from "./AppContext";

function PageTitle() {
  const { selectedPage } = useAppContext();

  return (
    <div className="flex flex-col ">
      <h3>{selectedPage?.title}</h3>
      <p className="text-foreground/70 text-[10px] ">{selectedPage?.desc}</p>
    </div>
  );
}

export default PageTitle;
