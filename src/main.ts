import fs from "fs";
import { join } from "path";
import { generateImage } from "./wakatime";
import { generateWriteup } from "./rss";

async function main() {
  let template = fs.readFileSync(join(__dirname, "template.md")).toString();
  template = template.replace("{{language}}", await generateImage());
  template = template.replace("{{writeup_list}}", await generateWriteup());
  fs.writeFileSync("dist/README.MD", template);
}

main();
