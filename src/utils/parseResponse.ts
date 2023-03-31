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
    const match = line.match(/^(\d+)\.\s+(\S+)\s+(.*)\.\s+(.*)$/);

    if (match) {
      const index = parseInt(match[1]);
      const price = match[2];
      const name = match[3];
      const description = match[4];

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
