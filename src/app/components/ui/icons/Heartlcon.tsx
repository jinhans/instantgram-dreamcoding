import { AiOutlineHeart } from "react-icons/ai";

type Props = {
  className?: string;
};
export default function Heartlcon({ className }: Props) {
  return <AiOutlineHeart className={className || "w-7 h-7"} />;
}
