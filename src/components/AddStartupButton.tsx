import Link from "next/link";
import Button from "./atoms/Button";

export default function AddStartupButton() {
  return (
    <Link href="/add-startup">
      <Button variant="secondary">+ Add Startup</Button>
    </Link>
  );
}
