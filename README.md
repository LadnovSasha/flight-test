## Question 2 answers:

Get fastest flight between airports:
`Select * from flights where origin = $1 and dest = $2 order by duration ASC LIMIT 1; `

Get cheapest flight:

```
WITH fl AS (SELECT DISTINCT ON (price, origin, dest)
    origin,
    dest,
    price,
    airline,
    duration,
    distance
    FROM flights where origin = 'AA' order by price
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

