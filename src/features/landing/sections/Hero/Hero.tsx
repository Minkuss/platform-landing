"use client";

import { PointerEventHandler, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { GradientButton } from "../../components/ui/GradientButton/GradientButton";
import { LayoutContainer } from "../../components/ui/LayoutContainer/LayoutContainer";
import { heroWaves } from "../../data/landingData";
import styles from "./Hero.module.scss";

export function Hero() {
  const wavesRef = useRef<HTMLDivElement | null>(null);
  const noiseBackRef = useRef<SVGFETurbulenceElement | null>(null);
  const noiseMiddleRef = useRef<SVGFETurbulenceElement | null>(null);
  const noiseFrontRef = useRef<SVGFETurbulenceElement | null>(null);
  const displaceBackRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const displaceMiddleRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const displaceFrontRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const motionStateRef = useRef({
    hover: 0,
    px: 0,
    py: 0,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopWave = window.matchMedia("(min-width: 1081px)").matches;
    if (reducedMotion || !desktopWave || !wavesRef.current) {
      return;
    }
    const motionState = motionStateRef.current;

    const backNode = wavesRef.current.querySelector<HTMLElement>(`.${styles.waveBack}`);
    const middleNode = wavesRef.current.querySelector<HTMLElement>(`.${styles.waveMiddle}`);
    const frontNode = wavesRef.current.querySelector<HTMLElement>(`.${styles.waveFront}`);

    if (!backNode || !middleNode || !frontNode) {
      return;
    }

    const setBackX = gsap.quickSetter(backNode, "x", "px");
    const setBackY = gsap.quickSetter(backNode, "y", "px");
    const setBackRotate = gsap.quickSetter(backNode, "rotate", "deg");

    const setMiddleX = gsap.quickSetter(middleNode, "x", "px");
    const setMiddleY = gsap.quickSetter(middleNode, "y", "px");
    const setMiddleRotate = gsap.quickSetter(middleNode, "rotate", "deg");

    const setFrontX = gsap.quickSetter(frontNode, "x", "px");
    const setFrontY = gsap.quickSetter(frontNode, "y", "px");
    const setFrontRotate = gsap.quickSetter(frontNode, "rotate", "deg");

    let phase = Math.random() * Math.PI * 2;
    let filterTickAccumulator = 0;

    const update = (_time: number, deltaMs: number) => {
      phase += (deltaMs / 1000) * 0.9;

      const { hover, px, py } = motionState;
      const intensity = 1 + hover * 2.1;

      const sinA = Math.sin(phase * 1.1);
      const sinB = Math.sin(phase * 1.38 + 0.9);
      const sinC = Math.sin(phase * 0.85 + 1.8);

      const pointerX = px * (8 + hover * 14);
      const pointerY = py * (6 + hover * 11);

      setBackX(sinA * 5.8 * intensity + pointerX * 0.4);
      setBackY(sinB * 3.6 * intensity + pointerY * 0.35);
      setBackRotate(sinC * 0.9 * intensity);

      setMiddleX(sinB * 6.6 * intensity + pointerX * 0.52);
      setMiddleY(sinC * 4.2 * intensity + pointerY * 0.45);
      setMiddleRotate(sinA * 1.2 * intensity);

      setFrontX(sinC * 7.4 * intensity + pointerX * 0.7);
      setFrontY(sinA * 4.9 * intensity + pointerY * 0.58);
      setFrontRotate(sinB * 1.45 * intensity);

      filterTickAccumulator += deltaMs;
      if (filterTickAccumulator < 34) {
        return;
      }
      filterTickAccumulator = 0;

      const freqBase = 0.0035 + hover * 0.0023;
      const modulator = (Math.sin(phase * 1.6) + 1) * 0.00033;
      const frequency = `${(freqBase + modulator).toFixed(4)} ${(freqBase * 1.28 + modulator).toFixed(4)}`;

      if (noiseBackRef.current && displaceBackRef.current) {
        noiseBackRef.current.setAttribute("baseFrequency", frequency);
        displaceBackRef.current.setAttribute("scale", `${(3.2 + hover * 12 + Math.sin(phase * 1.2) * 1.8).toFixed(2)}`);
      }

      if (noiseMiddleRef.current && displaceMiddleRef.current) {
        noiseMiddleRef.current.setAttribute("baseFrequency", frequency);
        displaceMiddleRef.current.setAttribute("scale", `${(4.6 + hover * 16 + Math.sin(phase * 1.35 + 0.7) * 2.1).toFixed(2)}`);
      }

      if (noiseFrontRef.current && displaceFrontRef.current) {
        noiseFrontRef.current.setAttribute("baseFrequency", frequency);
        displaceFrontRef.current.setAttribute("scale", `${(5.2 + hover * 19 + Math.sin(phase * 1.45 + 1.2) * 2.3).toFixed(2)}`);
      }
    };

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
      gsap.killTweensOf(motionState);
    };
  }, []);

  const handleWavesPointerEnter = () => {
    gsap.to(motionStateRef.current, {
      hover: 1,
      duration: 0.45,
      ease: "power2.out",
    });
  };

  const handleWavesPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(motionStateRef.current, {
      px: normalizedX,
      py: normalizedY,
      duration: 0.28,
      ease: "power2.out",
    });
  };

  const handleWavesPointerLeave = () => {
    gsap.to(motionStateRef.current, {
      hover: 0,
      px: 0,
      py: 0,
      duration: 0.75,
      ease: "power3.out",
    });
  };

  return (
    <section className={styles.hero}>
      <LayoutContainer>
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={styles.brand}>платформа</p>
            <p className={styles.description}>
                Платформа  – это двухкомпонентная система: с одной стороны – структурированное обучение, с другой – серия конкурсных заданий для отработки навыков от реальных заказчиков.
            </p>
            <GradientButton>Узнать подробнее</GradientButton>
          </div>

          <div
            ref={wavesRef}
            className={styles.waves}
            onPointerEnter={handleWavesPointerEnter}
            onPointerMove={handleWavesPointerMove}
            onPointerLeave={handleWavesPointerLeave}
          >
            <svg className={styles.waveDefs} aria-hidden focusable="false">
              <defs>
                <filter id="heroWaveDistortBack" x="-16%" y="-16%" width="132%" height="132%" colorInterpolationFilters="sRGB">
                  <feTurbulence ref={noiseBackRef} type="fractalNoise" baseFrequency="0.0038 0.0048" numOctaves={2} seed={13} />
                  <feDisplacementMap
                    ref={displaceBackRef}
                    in="SourceGraphic"
                    scale="3.2"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <filter id="heroWaveDistortMiddle" x="-18%" y="-18%" width="136%" height="136%" colorInterpolationFilters="sRGB">
                  <feTurbulence ref={noiseMiddleRef} type="fractalNoise" baseFrequency="0.0042 0.0052" numOctaves={2} seed={27} />
                  <feDisplacementMap
                    ref={displaceMiddleRef}
                    in="SourceGraphic"
                    scale="4.6"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
                <filter id="heroWaveDistortFront" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                  <feTurbulence ref={noiseFrontRef} type="fractalNoise" baseFrequency="0.0048 0.0058" numOctaves={2} seed={41} />
                  <feDisplacementMap
                    ref={displaceFrontRef}
                    in="SourceGraphic"
                    scale="5.2"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </defs>
            </svg>
            <Image src={heroWaves.back} alt="" width={710} height={600} className={styles.waveBack} priority aria-hidden />
            <Image src={heroWaves.middle} alt="" width={730} height={607} className={styles.waveMiddle} priority aria-hidden />
            <Image src={heroWaves.front} alt="" width={730} height={607} className={styles.waveFront} priority aria-hidden />
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
