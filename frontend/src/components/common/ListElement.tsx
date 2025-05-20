import { Link } from "react-router-dom";

const ListElement = ({
  title,
  to,
  collapse,
  symbol
}: {
  title: string;
  to: string;
  collapse?: boolean;
  symbol?: React.ReactNode;
}) => {
  return (
    <li>
      <Link to={to} className="hover:bg-black/50 p-[10px] rounded-lg cursor-pointer text-sm text-gray-400 flex items-center gap-2">
        {symbol}
        <span className={`${collapse ? "hidden" : "block"}`}>{title}</span>
      </Link>
    </li>
  );
};

export default ListElement;