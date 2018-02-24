# Activity Calc component

Used in Activity Search to display computed values for ```activCalcAll``` and ```activCalcFilter```

> store: search.sortStrings are used for each metric.

example data for this component:
```json
"activCalcAll": {
  "activCalcFilter": {
      "_id": "<stravaId>",
      "count": 5,
      "date": {
          "range": [
              "2017-08-01T10:14:00Z",
              "2017-08-12T06:30:01Z"
          ]
      },
      "distance": {
          "range": [
              10721.4,
              166372
          ],
          "Avg": 47472.92,
          "Sum": 237364.6
      },
      "movingTime": {
          "range": [
              1800,
              35005
          ],
          "Avg": 9504.4,
          "Sum": 47522
      },
      "elevation": {
          "range": [
              0,
              3742.6
          ],
          "Avg": 902.5200000000001,
          "Sum": 4512.6
      },
      "ftp": {
          "range": [
              275,
              275
          ],
          "Avg": 275,
          "Sum": 1375
      },
      "tssScore": {
          "range": [
              24.627438016528924,
              317.7490512396695
          ],
          "Avg": 92.36385932047752,
          "Sum": 461.81929660238757
      },
      "sufferScore": {
          "range": [
              21,
              426
          ],
          "Avg": 112.8,
          "Sum": 564
      },
      "kilojoules": {
          "range": [
              315.5,
              4580.4
          ],
          "Avg": 1279.5,
          "Sum": 6397.5
      },
      "calories": {
          "range": [
              351.8,
              5107.2
          ],
          "Avg": 1426.6399999999999,
          "Sum": 7133.2
      },
      "averageHeartrate": {
          "range": [
              122.2,
              160.4
          ],
          "Avg": 144.74,
          "Sum": 723.7
      },
      "averageWatts": {
          "range": [
              116.4,
              197.4
          ],
          "Avg": 148.1,
          "Sum": 740.5
      },
      "weightedAverageWatts": {
          "range": [
              150,
              208
          ],
          "Avg": 171.6,
          "Sum": 858
      },
      "maxSpeed": {
          "range": [
              6.8,
              21.2
          ],
          "Avg": 14.059999999999999,
          "Sum": 70.3
      },
      "maxHeartrate": {
          "range": [
              161,
              171
          ],
          "Avg": 165.8,
          "Sum": 829
      },
      "maxWatts": {
          "range": [
              290,
              1465
          ],
          "Avg": 743,
          "Sum": 3715
      }
  },
}
```
