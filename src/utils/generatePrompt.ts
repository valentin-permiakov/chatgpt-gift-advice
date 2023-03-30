const generatePrompt = (
  priceMin: number,
  priceMax: number,
  gender: string,
  age: number,
  relation?: string,
  holiday?: string,
  hobbies?: string
) => {
  return `Suggest 3 ${holiday} gift ideas between ${priceMin} dollars and ${priceMax} dollars for a ${age} years old ${gender}${
    relation ? ` who is my ${relation}` : ""
  }${hobbies ? ` and is into ${hobbies}` : ""}. Answer in the following format:
  1. Price: [price], [name]: [description] `;
};

export default generatePrompt;
