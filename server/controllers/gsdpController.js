const parseCsv = require("../utils/parsedCsvData");
const path = require("path");

const getDataByYear = async (req, res) => {
  const year = req.params.year;
  const csvFilePath = path.join(__dirname, "../data/gsdpData.csv");

  // Binding all the Cloumn Names from csv data
  const gsdpCurrentPricesColumn = `Gross State Domestic Product (GSDP)at Current Prices - ${year}`;
  const growthCurrentPercenatgeColumn = `Percentage Growth over Previous year at Current Prices - ${year}`;
  const gsdpConstantPricesColumn = `Gross State Domestic Product (GSDP)at Constant Prices - ${year}`;
  const growthConstantPercentageColumn = `Percentage Growth over Previous year at Constant Prices - ${year}`;

  try {
    const data = await parseCsv(csvFilePath);

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No data found in CSV." });
    }

    // Mapping all the data from the csv in the Json Format
    const response = data
      .map((record) => ({
        state: record["State/UT"],
        CurrentPrices: record[gsdpCurrentPricesColumn] || null,
        CurrentPercentage: record[growthCurrentPercenatgeColumn] || null,
        ConstantPrices : record[gsdpConstantPricesColumn] || null,
        ConstantPercentage : record[growthConstantPercentageColumn] || null
      }))

    res.json(response);
  } catch (err) {
    console.error("Error processing GSDP CSV:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getDataByYear };
