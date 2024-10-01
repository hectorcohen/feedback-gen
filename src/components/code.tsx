import classNames from "classnames";
import hljs from "highlight.js/lib/core";
import hljsHtml from "highlight.js/lib/languages/vbscript-html";
import range from "lodash/range";
import { useMemo } from "react";



hljs.registerLanguage('html', hljsHtml);

export default function Code({
  children,
  language,
  highlightedLines,
}: CodeProps) {
  const lineNumbers = getLineNumbers(children);
  const _highlightedLines = parseLineRanges(highlightedLines);
  return (
    <div className="my-2 rounded-md bg-white border text-sm leading-loose">
      <div className="relative">
        <BackgroundLayer
          className="py-4"
          lineNumbers={lineNumbers}
          highlightedLines={_highlightedLines}
        />
        <CodeLayer className="absolute top-0 w-full py-4" language={language}>
          {children}
        </CodeLayer>
        {_highlightedLines && (
          <FadeOutLayer
            className="absolute top-0 w-full py-4"
            lineNumbers={lineNumbers}
            highlightedLines={_highlightedLines}
          />
        )}
      </div>
    </div>
  );
}

export type CodeProps = {
  children: string;
  language: Language;
  highlightedLines?: string;
};

export type Language = "html";

function getLineNumbers(code: string): number[] {
  return code.split("\n").map((_, index) => index + 1);
}

function parseLineRanges(
  lineRangesRaw: string | undefined
): Set<number> | null {
  if (!lineRangesRaw) {
    return null;
  }

  return new Set(lineRangesRaw.split(",").flatMap(parseLineRange));
}

function parseLineRange(lineRangeRaw: string): number[] {
  let [begin, end] = lineRangeRaw.trim().split("-");
  if (!end) end = begin;

  return range(Number(begin), Number(end) + 1);
}

function CodeLayer({ className, children, language }: CodeLayerProps) {
  const html = useMemo(
    () => hljs?.highlight(children, { language }).value,
    [children, language]
  );

  return (
    <pre className={classNames("px-6", className)}>
      <code
        className="block overflow-x-auto text-slate-700"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </pre>
  );
}

type CodeLayerProps = {
  className: string;
  children: string;
  language: Language;
};

function BackgroundLayer({
  className,
  lineNumbers,
  highlightedLines,
}: BackgroundLayerProps) {
  return (
    <AuxiliaryLayer
      className={className}
      highlightedLineClassName="border-l-4 mr-1 text-green-500 before:content-['_+'] border-green-400 bg-withe"
      lineNumbers={lineNumbers}
      highlightedLines={highlightedLines}
    />
  );
}

type BackgroundLayerProps = {
  className: string;
  lineNumbers: number[];
  highlightedLines: Set<number> | null;
};

function FadeOutLayer({
  className,
  lineNumbers,
  highlightedLines,
}: FadeOutLayerProps) {
  return (
    <AuxiliaryLayer
      className={className}
      nonHighlightedClassName="bg-green-200"
      lineNumbers={lineNumbers}
      highlightedLines={highlightedLines}
    />
  );
}

type FadeOutLayerProps = {
  className: string;
  lineNumbers: number[];
  highlightedLines: Set<number>;
};

function AuxiliaryLayer({
  className,
  highlightedLineClassName = "",
  nonHighlightedClassName = "",
  lineNumbers,
  highlightedLines,
}: AuxiliaryLayerProps) {
  return (
    <pre
      className={classNames("pointer-events-none select-none", className)}
      aria-hidden={true}
    >
      {lineNumbers.map((ln) => {
        const highlighted = !!highlightedLines && highlightedLines.has(ln);
        return (
          <LinePlaceholder
            key={ln}
            className={classNames({
              [highlightedLineClassName]: highlighted,
              [nonHighlightedClassName]: !highlighted,
            })}
          />
        );
      })}
    </pre>
  );
}

type AuxiliaryLayerProps = {
  className: string;
  highlightedLineClassName?: string;
  nonHighlightedClassName?: string;
  lineNumbers: number[];
  highlightedLines: Set<number> | null;
};

function LinePlaceholder({ className }: LinePlaceholderProps) {
  return (
    <>
      <span className={classNames("inline-block w-full", className)}> </span>
      {"\n"}
    </>
  );
}

type LinePlaceholderProps = {
  className: string;
};
