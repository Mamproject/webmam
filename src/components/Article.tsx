import type { LocalizedString } from "@/i18n/localized-string";
import type { StaticImageData } from "next/image";
import type { ReactNode, FC } from "react";
import Image from "next/image";

interface SmallArticleProps {
  title: ReactNode;
  description: ReactNode;
  pictureSrc: StaticImageData;
  pictureAlt: LocalizedString;
  /** Add priority to image, disables lazy loading */
  priority?: boolean;
}

const SmallArticle: FC<SmallArticleProps> = ({ title, description, pictureSrc, pictureAlt, priority }) => (
  <article className="flex flex-1 flex-col gap-6">
    <span className="text-xl uppercase md:text-4xl">{title}</span>

    <div className="relative h-[20rem] w-full">
      <Image
        src={pictureSrc}
        alt={pictureAlt}
        fill
        className="object-cover"
        priority={priority}
        sizes="(min-width: 768px) 50vw, 100vw"
        placeholder="blur"
      />
    </div>

    {typeof description === "string" ? (
      <p className="text-lg md:text-xl">{description}</p>
    ) : (
      <div className="flex flex-col gap-4 text-lg md:text-xl">{description}</div>
    )}
  </article>
);

const BigArticle: FC<SmallArticleProps & { imageAlign: "right" | "left" }> = ({
  title,
  description,
  pictureSrc,
  pictureAlt,
  imageAlign,
  priority,
}) => {
  const imageAlignClass = imageAlign === "left" ? "order-1" : "order-2";
  const textAlignClass = imageAlign === "left" ? "order-2" : "order-1";

  return (
    <>
      <div className="hidden md:block">
        <article className="flex items-center gap-6">
          <div className={`flex flex-1 flex-col gap-6 ${textAlignClass}`}>
            <span className="text-xl uppercase md:text-2xl">{title}</span>

            {typeof description === "string" ? (
              <p className="text-lg md:text-xl">{description}</p>
            ) : (
              <div className="flex flex-col gap-4 text-lg md:text-xl">{description}</div>
            )}
          </div>

          <div className={`relative h-[26rem] w-full flex-1 xl:h-[20rem] ${imageAlignClass}`}>
            <Image
              src={pictureSrc}
              alt={pictureAlt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={priority}
              placeholder="blur"
            />
          </div>
        </article>
      </div>

      <div className="md:hidden">
        <SmallArticle title={title} description={description} pictureSrc={pictureSrc} pictureAlt={pictureAlt} />
      </div>
    </>
  );
};

export { SmallArticle, BigArticle };
