const parseResponse = (
  response: string
): Array<{
  index: number;
  price: string;
  name: string;
  description: string;
}> => {
  const responseArr = response
    .split("\n")
    .filter((item) => item.trim())
    .map((item) => item.trim());
  const giftIdeas = [];

  for (let i = 0; i < responseArr.length; i++) {
    const line = responseArr[i].trim();
    const match = line.split(".");

    if (match) {
      const index = parseInt(match[0]);
      const price = match[1];
      const name = match[2];
      const description = match[3];

      giftIdeas.push({
        index,
        price,
        name,
        description,
      });
    }
  }

  return giftIdeas;
};

export default parseResponse;
