// import { useState } from "react";
import logo from './assets/full-logo.png'
import { Grid, GridItem } from "@chakra-ui/react"
// import { DecorativeBox } from "compositions/lib/decorative-box"

const Calendar = () => {
//   const [prompt, setPrompt] = useState("");

  return (
    <div className="p-4">
        <a href="https://vite.dev" target="_blank">
          <img src={logo} className="logo" alt="Vite logo" />
        </a>
      <h1 className="text-xl font-bold">Calendar</h1>
      {/* <textarea
        className="border p-2 w-full"
        placeholder="Ask me anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      /> */}
      <button className="bg-blue-500 text-white p-2 mt-2">
        MONTH
      </button>
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        <GridItem colSpan={1}>
            <button className="bg-blue-500 text-white p-2 mt-2">
                MONTH
            </button>
        </GridItem>
        <GridItem colSpan={1}>
            Today
        </GridItem>
        <GridItem colSpan={1}>
            <button className="bg-blue-500 text-white p-2 mt-2">
                MONTH
            </button>
        </GridItem>
      </Grid>
    </div>
  );
};

export default Calendar;
