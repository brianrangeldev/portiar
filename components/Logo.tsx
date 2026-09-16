import Image from "next/image";
import logo from "@/public/logo.png";

export default function Logo({
  className = "",
  height = 48,
}: {
  className?: string;
  height?: number;
}) {
  // Aspect ratio matches the source file (432x293) so Next.js can derive
  // the width automatically and avoid layout shift.
  const width = Math.round((height * logo.width) / logo.height);

  return (
    <Image
      src={logo}
      alt="PortiAr Climatização"
      height={height}
      width={width}
      className={className}
      priority
    />
  );
}
