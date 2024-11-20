SELECT first_name || ' ' || last_name as name, plays.round,
  ROUND(
    SUM(CASE WHEN play_type = 'GOOD 3PTR' THEN 3 
             WHEN play_type = 'GOOD 2PTR' THEN 2 
             ELSE 0 END) * 100.0 / 
    NULLIF(2 * (SUM(CASE WHEN play_type LIKE 'GOOD 3PTR' OR play_type LIKE 'MISS 3PTR' THEN 1 ELSE 0 END) + 
                      0.44 * SUM(CASE WHEN play_type LIKE 'FREE THROW' THEN 1 ELSE 0 END)), 0),
    2
  ) AS "ts%"
FROM plays 
GROUP BY first_name, last_name, plays.round
HAVING COUNT(*) > 1 AND "ts%" IS NOT NULL
ORDER BY "ts%" DESC
LIMIT 5;