export const handleAPIResponse = <T>(res: any): T => {
  const data = res.data;
  if (data.statusCode !== 0) {
    throw new Error(data.statusMessage || 'Something went wrong.');
  }
  return data;
};
