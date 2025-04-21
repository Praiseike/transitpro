import Images from "../assets/images";

interface typeScoreSheet {
  icon: string;
  title: string;
  value: number;
}
export function ScoreSheet({ icon, title, value }: typeScoreSheet) {
  return (
    <>
      <div className="flex gap-4 ">
        <div className="w-fit h-fit p-1 rounded bg-light border-light border">
          <img src={icon} alt="" />
        </div>
        <div>
          <h2 className="nunito-sans-500 text-[0.75rem] ">{title}</h2>
          <h1 className="font-semibold md:text-[1.1rem]">{value}</h1>
        </div>
      </div>
    </>
  );
}
