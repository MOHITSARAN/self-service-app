var express = require("express");
var router = express.Router();
const { BigQuery } = require("@google-cloud/bigquery");

var Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "172.17.128.82",
    database: "tvmdb",
    password: "Tvm#2@2@",
    port: 5432,
});

const connBigQ = {
    keyFilename: "./config/GoogleBigQueryKey.json",
    projectId: "gcp-01-first",
};

// Helper Function

const chartHelper = async contentID => {
    const contents = {
        contentID_0: {
            chartOptions: {
                type: "line",
                caption: "Average Time To Detect",
                subCaption: "Last 1 year",
                xAxisName: "Month",
                yAxisName: "Number of Days",
                numberSuffix: "",
            },
            chartQuery:
                "SELECT * FROM `gcp-01-first.demo_dashboard_ds.average_time_to_detect` LIMIT 1000;",
        },
        contentID_1: {
            chartOptions: {
                type: "line",
                caption: "Average Time To Open",
                subCaption: "Last 1 year",
                xAxisName: "Month",
                yAxisName: "Number of Days",
                numberSuffix: "",
            },
            chartQuery:
                "SELECT * FROM `gcp-01-first.demo_dashboard_ds.average_total_time_open` LIMIT 1000;",
        },
        contentID_2: {
            chartOptions: {
                type: "doughnut2d",
                caption: "Incident Category",
                subCaption: "Last 1 year",
                xAxisName: "Category",
                yAxisName: "Percentage",
                numberSuffix: "",
            },
            chartQuery:
                "SELECT * FROM `gcp-01-first.demo_dashboard_ds.incident_category` LIMIT 1000;",
        },
        contentID_3: {
            chartOptions: {
                type: "pie2d",
                caption: "Incident Threat Category",
                subCaption: "Last 1 year",
                xAxisName: "Category",
                yAxisName: "Percentage",
                numberSuffix: "",
            },
            chartQuery:
                "SELECT * FROM `gcp-01-first.demo_dashboard_ds.incident_threat_category` LIMIT 1000;",
        },
        contentID_4: {
            chartOptions: {
                type: "column2d",
                caption: "Source Of Confirmed Incidents",
                subCaption: "Last 1 year",
                xAxisName: "Source",
                yAxisName: "Number of Incidents",
                numberSuffix: "",
            },
            chartQuery:
                "SELECT * FROM `gcp-01-first.demo_dashboard_ds.source_of_confirmed_incidents` LIMIT 1000;",
        },
    };

    return contents[contentID];
};

//@route GET api/message
//@desc Returns my name
//@access public route
router.get("/message", (req, res, next) => {
    res.json("Hello Santanu");
});

//@route GET api/getQueryResult
//@desc Query from Postgres
//@access public route
router.get("/getQueryResult", (req, res) =>
    pool.query(
        "SELECT EXTRACT(YEAR from first_published) as yearData, EXTRACT(MONTH from first_published) as monthData, COUNT(security_review_id) FROM security_review_data GROUP BY yearData, monthData ORDER BY yearData ASC , monthData ASC;",
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    )
);

//@route GET api/getBigQuery
//@desc Query from Google Big Query
//@access public route
router.get("/getBigQuery", async (req, res) => {
    bigQueryConnection = new BigQuery(connBigQ);

    originalQuery =
        "SELECT * FROM `gcp-01-first.demo_dashboard_ds.demo_table` LIMIT 1000";
    averageTimeToDetect =
        "SELECT * FROM `gcp-01-first.demo_dashboard_ds.average_time_to_detect` LIMIT 1000;";
    incidentCategory =
        "SELECT * FROM `gcp-01-first.demo_dashboard_ds.incident_category` LIMIT 1000;";

    const queryOption = {
        query: averageTimeToDetect,
        location: "US",
    };

    try {
        const [job] = await bigQueryConnection.createQueryJob(queryOption);
        const [rows] = await job.getQueryResults();
        res.status(200).json(rows);
    } catch (err) {
        console.error("Oh No ! Something Broke :", err);
    }
});

//@route POST api/getDataFromBQ
//@desc Query from Google Big Query for Chart
//@access public route
router.post("/getDataFromBQ", async (req, res) => {
    bigQueryConnection = new BigQuery(connBigQ);

    // Getting the contentID from request body
    const { contentID } = req.body;
    // Getting the chart options and query from chartHelper function. Later to be replaced by API
    let { chartOptions, chartQuery } = await chartHelper(contentID);

    const queryOption = {
        query: chartQuery,
        location: "US",
    };

    try {
        const [job] = await bigQueryConnection.createQueryJob(queryOption);
        const [rows] = await job.getQueryResults();

        // Adding ChartData to the chart options
        chartOptions.chartData = rows;
        res.status(200).json(chartOptions);
    } catch (err) {
        console.error("Oh No ! Something Broke :", err);
    }
});

module.exports = router;
