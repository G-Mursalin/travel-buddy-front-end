export const extractPriceRange = (range: string) => {
  const matches = range.match(/\$(\d+(?:,\d+)?(?:\.\d+)?)/g);
  if (!matches) return { min: null, max: null };

  const values = matches.map((match) => parseFloat(match.replace(/[$,]/g, '')));

  return {
    min: values[0],
    max: values.length > 1 ? values[1] : null,
  };
};
