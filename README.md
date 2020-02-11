## Question 2 answers:

### Get fastest flight between airports

`Select * from flights where origin = $1 and dest = $2 order by duration ASC LIMIT 1; `

### Get cheapest flight

```
WITH fl AS (SELECT DISTINCT ON (price, origin, dest)
    origin,
    dest,
    price,
    airline,
    duration,
    distance
    FROM flights where origin = $1 order by price
)
SELECT DISTINCT ON (fl.origin, fl.dest)
    fl.*,
    a."name",
    a.address,
    air."name"
FROM fl
LEFT JOIN airports a ON fl.dest = a."code"
LEFT JOIN airlines air ON fl.airline = air.abbreviation
```
### Get fastest flight

```
Select
    airline,
    AVG(
        (distance / duration)
    ) as speed
FROM flights
GROUP BY airline
ORDER BY speed DESC;
```

### Development

Project uses node 10.x
To start project: run `npm start`
To run migration: `npm run migrate:up`

Project written for AWS infrastructure (DB configuration is missing)
