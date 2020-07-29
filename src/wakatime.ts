import Axios from "axios";
const apiKey = process.env.WAKATIME_KEY || "No_key?_think_peach";

const axios = Axios.create({
  baseURL: "https://wakatime.com/api/v1/",
  headers: {
    Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
  },
});

type LanguageData = {
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
};

export async function generateImage() {
  const { data } = await axios.get("/users/current/stats/last_7_days");
  const width = 20;

  const languages = (data.data.languages as LanguageData[])
    .sort((a, b) => b.total_seconds - a.total_seconds)
    .slice(0, 10);
  const rangeMax = Math.max(...languages.map((i) => i.total_seconds));
  const maxWidth = Math.max(
    ...languages.map((i) => i.name.length + i.text.length)
  );
  const image = languages
    .map((i) => {
      const p = Math.floor((8 * width * i.total_seconds) / rangeMax);
      return (
        i.name.padEnd(maxWidth + 2 - i.text.length, " ") +
        i.text +
        " " +
        (
          String.fromCharCode(9608).repeat(Math.floor(p / 8)) +
          (p % 8 === 0 ? "" : String.fromCharCode(9616 - (p % 8)))
        ).padEnd(width + 1, " ") +
        `${i.percent.toFixed(1)}%`.padStart(5)
      );
    })
    .join("\n");

  return image;
}
