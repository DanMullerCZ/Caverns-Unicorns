import Link from "next/link";

export default function FourOhFour() {
  return <>
    <h1>404 - Page Not Found</h1>
    <Link href="/" className="w-6 border border-solid border-black">
        BACK TO THE HOMEPAGE
    </Link>
  </>
}