import data from './data.csv';

for (const d of data) {
  d.day_of_year = +d.day_of_year;
  d.year = +d.year;
  d.airTemp = Number(d.value);
}

export const main = (container) => {
  const fontSize = 59;

  const json = JSON.stringify(data[0], null, 2);

  container.innerHTML = `
    <pre style="font-size: ${fontSize}px;">${json}</pre>
  `;
};

export { data };
