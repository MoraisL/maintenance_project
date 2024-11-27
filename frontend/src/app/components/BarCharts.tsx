"use client"

import { BarChart } from "@tremor/react"

const chartdata = [
  {
    date: "Jan 23",
    RAM: 2890,
    Notebook: 2338,
  },
  {
    date: "Feb 23",
    RAM: 2756,
    Notebook: 2103,
  },
  {
    date: "Mar 23",
    RAM: 3322,
    Notebook: 2194,
  },
  {
    date: "Abr 23",
    RAM: 3470,
    Notebook: 2108,
  },
  {
    date: "Mai 23",
    RAM: 3475,
    Notebook: 1812,
  },
  {
    date: "Jun 23",
    RAM: 3129,
    Notebook: 1726,
  },
]

export const BarChartHero = () => (
  <BarChart
    className="h-80"
    data={chartdata}
    index="date"
    categories={["RAM", "Notebook"]}
    colors={["pink-900", "pink-400"]}
    valueFormatter={(number: number) =>
      `$${Intl.NumberFormat("us").format(number).toString()}`
    }
    onValueChange={(v) => console.log(v)}
  />
)