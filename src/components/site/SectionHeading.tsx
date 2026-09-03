interface Props {
  eyebrow?: string;
  title: string;
  /** 标题中需要用品牌红高亮的片段 */
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, highlight, description, align = "left" }: Props) {
  const parts =
    highlight && title.includes(highlight) ? title.split(highlight) : ([title] as string[]);

  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
        {parts.length > 1 ? (
          <>
            {parts[0]}
            <span className="text-gradient-primary">{highlight}</span>
            {parts[1]}
          </>
        ) : (
          title
        )}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
