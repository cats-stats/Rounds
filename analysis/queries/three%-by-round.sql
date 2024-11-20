SELECT first_name || ' ' || last_name as name, round,
  ROUND(
    SUM(CASE WHEN play_type = 'GOOD 3PTR' THEN 1 ELSE 0 END) * 100.0 / 
    NULLIF(COUNT(CASE WHEN play_type LIKE 'MISS 3PTR' OR play_type = 'GOOD 3PTR' THEN 1 END), 0),
    2
  ) AS "3PT%"
FROM plays 
GROUP BY first_name, last_name, round
HAVING COUNT(*) > 1 AND "3PT%" IS NOT NULL
ORDER BY "3PT%" DESC;