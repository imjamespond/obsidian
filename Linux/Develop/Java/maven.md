mvn test -Dtest=org.apache.calcite.test.CsvTest#testBadDirectory -pl example/csv

mvn compile -Dmaven.test.skip=true

mvn -U clean install **where -U will force update the repo**
