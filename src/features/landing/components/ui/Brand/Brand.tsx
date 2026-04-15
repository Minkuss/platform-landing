import Image from "next/image";
import { assetPath } from "../../../utils/assetPath";
import styles from "./Brand.module.scss";

type BrandProps = {
  text?: string;
  className?: string;
  logoWidth?: number;
  logoHeight?: number;
};

export function Brand({
  text = "ПЛАТФОРМА",
  className,
  logoWidth = 58,
  logoHeight = 36,
}: BrandProps) {
  const logoSrc = assetPath("/assets/landing/logo.png");

  return (
    <div className={`${styles.brand}${className ? ` ${className}` : ""}`}>
      <Image src={logoSrc} alt="Логотип Платформа" width={logoWidth} height={logoHeight} className={styles.logo} />
      <span className={styles.text}>{text}</span>
    </div>
  );
}
