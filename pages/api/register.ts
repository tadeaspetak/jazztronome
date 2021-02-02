import Airtable from "airtable";
import { NextApiRequest, NextApiResponse } from "next";

import { Values } from "../registration";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: "keyQSI8LpuQbKuUf2",
  apiVersion: "0.1.0",
  noRetryIfRateLimited: false,
});
const base = Airtable.base("app2HVMLhYXqfSQDS");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const values = req.body as Values;
    try {
      console.log({ values });
      await base("Registration").create([
        {
          fields: {
            Name: values.name,
            Adults: values.adults,
            Children: values.children,
            Email: values.email,
            Phone: values.phone,
            From: values.from,
            To: values.to,
            Getting: values.getting,
            Accommodation: values.accommodation,
            Contribution: values.contribution,
            Notes: values.notes,
          },
        },
      ]);
    } catch (e) {
      console.error("Airtable error.", { e });
      throw "Airtable error";
    }

    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
