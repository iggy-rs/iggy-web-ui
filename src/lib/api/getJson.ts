export const getJson = async (res: Response): Promise<unknown | null> => {
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    return json as unknown;
  } catch (err) {
    return null;
  }
};
