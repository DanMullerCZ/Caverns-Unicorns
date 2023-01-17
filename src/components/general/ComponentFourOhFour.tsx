import Link from "next/link";
import Header from "./Header";

export default function ComponentFourOhFour() {
  return (
    <>
      <Header title="404 - Page Not Found" />
      <h1>404 - Page Not Found</h1>
      <Link href="/" className="w-6 border border-solid border-black">
        BACK TO THE HOMEPAGE
      </Link>
    </>
  );
}
