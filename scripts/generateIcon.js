const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const ICON_DIR_PATH = "../src/ui/Icon/";
const SVG_DIR_PATH = path.resolve(__dirname, ICON_DIR_PATH, "svgs");
const SVG_REGEX = /\.svg$/;
const OUT_FILE_PATH = path.resolve(__dirname, ICON_DIR_PATH, "iconMap.ts");

const createIconString = (files) => {
  return `
    import dynamic from "next/dynamic";
    import { SVGAttributes } from "react";

    export const SVG_ICON_MAP = {
      ${files.map(
        (fileName, index) =>
          `${index ? "\n" : ""}  '${fileName.replace(
            SVG_REGEX,
            ""
          )}': dynamic<SVGAttributes<SVGElement>>(() => import('./svgs/${fileName}'))`
      )}
    };

    export type SvgIconKey = keyof typeof SVG_ICON_MAP;
  `;
};

const generateIconMap = () => {
  const svgFiles = fs
    .readdirSync(SVG_DIR_PATH)
    .filter((fileName) => !fileName.match(/DS_Store/i));

  fs.writeFileSync(
    OUT_FILE_PATH,
    prettier.format(createIconString(svgFiles), {
      parser: "babel-ts",
    })
  );
};

generateIconMap();

if (process.env.NODE_ENV === "development") {
  fs.watch(SVG_DIR_PATH, generateIconMap);
}
