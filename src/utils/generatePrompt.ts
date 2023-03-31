const generatePrompt = (
  priceMin: number,
  priceMax: number,
  gender: string,
  age: number,
  relation?: string,
  holiday?: string,
  hobbies?: string
): string => {
  let prompt = `Can you suggest three gift ideas for a ${age}-year-old ${gender} with a budget of $${priceMin}-${priceMax}`;

  if (relation) {
    prompt += ` who is your ${relation}`;
  }

  if (holiday) {
    prompt += ` for ${holiday}`;
  }

  if (hobbies) {
    prompt += ` and is interested in ${hobbies}`;
  }

  prompt += `? Please provide three gift ideas, each starting with the price, then the name, and finally a once sentense description. Separate gift number, price and name with a dot.`;

  return prompt;
};

export default generatePrompt;
